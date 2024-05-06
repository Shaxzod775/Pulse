import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { Icons } from "../../../../../Assets/Icons/icons";
import { monthsInGenitiveForm } from "../../../../../Constants/dateLocales";
import { weekDaysTextFull } from "../../../../../Constants/testData";
import { ButtonStyled, TypographyStyled } from "../../../CabinetStyles";

const AttendanceMonthCell = ({ text, cellType = "neutral" }) => {
  // cellTypes=["neutral", "inactive", "success", "error"]
  const colors = {
    neutral: { main: "#B5CBDD", bg: "#F4F9FD", text: "#fff" },
    inactive: { main: "#bbb", bg: "#fafafa", text: "#fff" },
    success: { main: "#4CE894", bg: "#D0FFEB", text: "#fff" },
    error: { main: "#FF6D6D", bg: "#FFDBDB", text: "#fff" },
  };
  const iconComponents = {
    error: Icons.ClipboardRemove,
    success: Icons.ClipboardCheck,
    default: Icons.Button,
  };

  const IconComponent = iconComponents[cellType] || iconComponents.default;
  return (
    <>
      <Box
        className="flex flex-col items-center justify-center"
        rowGap="4px"
        minHeight="80px"
        maxHeight="80px"
        width="100%"
        backgroundColor={colors[cellType].bg}
        borderRadius="20px"
      >
        <IconComponent color={colors[cellType].main} />
        <Box
          className="flex items-center justify-center"
          minWidth="50%"
          padding="2px 7px"
          borderRadius="41px"
          backgroundColor={colors[cellType].main}
          zIndex="2"
        >
          <TypographyStyled fontSize="0.625rem" color={colors[cellType].text}>
            {text}
          </TypographyStyled>
        </Box>
      </Box>
    </>
  );
};

const AttendanceCalendar = (props) => {
  const [year, setYear] = useState(new Date().getFullYear()); // Current year
  const [month, setMonth] = useState(
    props.defaultMonth || new Date().getMonth()
  ); // Current month

  const monthInGenitiveForm = monthsInGenitiveForm[month];
  const monthLocaleLong = new Date(year, month).toLocaleString("ru", {
    month: "long",
  });

  const firstDay = new Date(year, month, 1).getDay();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const nextMonthFirstDay = new Date(year, month + 1, 1).getDay();
  const prevMonthDisplayDays = Array.from(
    { length: (firstDay + 6) % 7 },
    (_, i) => prevMonthDays - i
  );
  const lastDayOfCurrentMonth = new Date(year, month + 1, 0).getDay();
  const nextMonthDisplayDaysNeeded = (7 - lastDayOfCurrentMonth) % 7;
  const nextMonthDisplayDays = Array.from(
    { length: nextMonthDisplayDaysNeeded },
    (_, i) => i + 1
  );

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = [...Array(daysInMonth).keys()].map((i) => i + 1);

  const incrementMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const decrementMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  return (
    <>
      <Box
        className="flex flex-col"
        rowGap="24px"
        width="100%"
        padding="10px"
        border="1px solid #E5E7EB"
        borderRadius="20px"
      >
        <Box className="flex justify-between">
          <Box display="flex" columnGap="14px">
            <Box className="flex items-center" columnGap="10px">
              <TypographyStyled display="flex" colorFromTheme="purpleBlue">
                <Icons.UserCheckRounded />
              </TypographyStyled>

              <TypographyStyled
                fontSize="1.125rem"
                fontWeight="600"
                color="#1C0D64"
              >
                Посещаемость
              </TypographyStyled>
            </Box>
          </Box>
          <Box className="flex items-center" columnGap="12px">
            <ButtonStyled
              sx={{ borderRadius: "50px", padding: "8px 20px" }}
              color="purpleBlue"
            >
              <Box className="flex items-center" columnGap="10px">
                <Icons.CalendarContained />
                <Typography
                  fontSize="1.125rem"
                  fontWeight="600"
                  textTransform="capitalize"
                >
                  {monthLocaleLong} {year}
                </Typography>
              </Box>
            </ButtonStyled>
            <Box className="flex items-center" columnGap="4px">
              <ButtonStyled
                variant="contained"
                color="purpleBlue"
                sx={{
                  borderRadius: "50%",
                  padding: "5px",
                }}
                onClick={decrementMonth}
              >
                <Icons.ArrowDBold
                  width="26px"
                  height="26px"
                  style={{ transform: "rotate(90deg)" }}
                />
              </ButtonStyled>
              <ButtonStyled
                variant="contained"
                color="purpleBlue"
                sx={{
                  borderRadius: "50%",
                  padding: "5px",
                }}
                onClick={incrementMonth}
              >
                <Icons.ArrowDBold
                  width="26px"
                  height="26px"
                  style={{
                    transform: "rotate(270deg)",
                  }}
                />
              </ButtonStyled>
            </Box>
          </Box>
        </Box>
        <Box className="flex flex-col" rowGap="10px" minHeight="564px">
          <Box display="flex" columnGap="12px">
            {weekDaysTextFull.map((weekDay) => (
              <Box
                className="flex items-center justify-center"
                width="100%"
                padding="3px 12px"
                borderRadius="35px"
                backgroundColor="#F4F9FD"
              >
                <TypographyStyled colorFromTheme="grey" fontSize="0.75rem">
                  {weekDay}
                </TypographyStyled>
              </Box>
            ))}
          </Box>
          <Box
            display="grid"
            gridTemplateColumns="repeat(7, 1fr)"
            rowGap="10px"
            columnGap="12px"
          >
            {prevMonthDisplayDays.map((day, index) => (
              <AttendanceMonthCell
                key={index}
                text={`${day} ${monthsInGenitiveForm[(month + 11) % 12]}`}
                cellType="inactive"
              />
            ))}
            {daysArray.map((day, index) => (
              <AttendanceMonthCell
                key={index}
                text={`${day} ${monthInGenitiveForm}`}
                // cellType="neutral"
                // TEMP INFO !!!
                cellType={
                  day % 7 === 6 || day % 7 === 3
                    ? "success"
                    : day % 7 === 1
                    ? "error"
                    : "neutral"
                }
              />
            ))}
            {nextMonthDisplayDays.map((day, index) => (
              <AttendanceMonthCell
                key={index}
                text={`${day} ${monthsInGenitiveForm[(month + 1) % 12]}`}
                cellType="inactive"
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AttendanceCalendar;
