import { Box, MenuItem, Typography } from "@mui/material";
import { format } from "date-fns";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Icons } from "../../../../Assets/Icons/icons";
import { weekDaysText } from "../../../../Constants/dateLocales";
import { getRussianWord } from "../../../../helpers/helpers";
import { deleteGroup } from "../../../../Slices/groupsSlice";
import { ButtonStyled, CustomCheckbox, MenuStyled } from "../../CabinetStyles";

const GroupsList = ({
  keyId,
  id,
  name,
  startDate,
  endDate,
  course,
  classDays,
  roomNumber,
  teacher,
  selectedGroupIds,
  handleSelectGroup,
}) => {
  const dispatch = useDispatch();
  const [anchorThreeDots, setAnchorThreeDots] = useState(null);
  const threeDotsMenuOpen = Boolean(anchorThreeDots);

  const calculateLessonCount = (startDate, endDate, classDaysPerWeek) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const differenceInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    const lessonsPerWeek = classDaysPerWeek.length;

    const totalLessons = Math.floor(differenceInDays / 7) * lessonsPerWeek;

    const remainingDays = differenceInDays % 7;
    for (let i = 0; i < remainingDays; i++) {
      const currentDay = (start.getDay() + i) % 7;
      if (classDaysPerWeek.includes(currentDay)) {
        totalLessons++;
      }
    }

    return totalLessons;
  };

  const handleDeleteGroup = () => {
    dispatch(deleteGroup(id));
  };

  const handleCloseThreeDotsMenu = () => {
    setAnchorThreeDots(null);
  };

  const handleOpenThreeDotsMenu = (event) => {
    setAnchorThreeDots(event.currentTarget);
  };

  return (
    <Box
      className="flex flex-row items-center text-center justify-between"
      sx={{
        height: "75px",
        backgroundColor: `${keyId % 2 !== 0 ? "#F9F9F9" : "white"}`,
        marginLeft: "25px",
        marginRight: "45px",
        fontWeight: "500",
        fontSize: "13px",
        textAlign: "center",
        color: "#7D8594",
        opacity: "0.7",
      }}
    >
      <Box
        className="flex flex-row"
        marginLeft="45px"
        position="relative"
        id={id}
      >
        <CustomCheckbox
          checked={selectedGroupIds.includes(id)}
          onChange={() => handleSelectGroup(id)}
        />
        <Typography>{name}</Typography>
      </Box>
      <Box
        className="flex flex-row items-center justify-between" flexGrow="4" maxWidth="75%" paddingLeft="25px"
      >
        <Typography display="flex" width="14%" alignItems="flex-start">
          {format(new Date(startDate), "dd.MM.yyyy")}
        </Typography>
        <Typography display="flex" width="18%" alignItems="flex-start">
          {format(new Date(endDate), "dd.MM.yyyy")}
        </Typography>
        <Typography display="flex" width="12%" alignItems="flex-start">
          {classDays.map(
            (weekDay, i) =>
              `${weekDaysText[weekDay]}${i < classDays.length - 1 ? ", " : ""}`
          )}
        </Typography>
        <Typography display="flex" width="19%" alignItems="flex-start">
          {teacher.firstName} {teacher.lastName}
        </Typography>
        <Typography display="flex" width="23%" alignItems="flex-start">
          {course.duration}{" "}
          {getRussianWord(course.duration, "месяц", "месяца", "месяцев")} /{" "}
          {calculateLessonCount(startDate, endDate, classDays)} уроков
        </Typography>
        <Typography display="flex" width="16%" alignItems="flex-start">
          {roomNumber} кабинет
        </Typography>
        <Typography display="flex" width="13%" alignItems="flex-start">
          10 {getRussianWord(10, "ученик", "ученика", "учеников")}
        </Typography>
        <Box display="flex" width="5%">
          <ButtonStyled
            className="flex justify-center items-center"
            variant="contained"
            sx={{
              width: "20px",
              height: "20px",
              backgroundColor: "white",
              color: "#6574D8",
              border: "1px solid #6574D8",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
            onClick={handleOpenThreeDotsMenu}
          >
            <Box className="flex items-center">
              <Icons.ThreeDotsHor />
            </Box>
          </ButtonStyled>
        </Box>
        <MenuStyled
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorThreeDots}
          open={threeDotsMenuOpen}
          onClose={handleCloseThreeDotsMenu}
        >
          <MenuItem onClick={handleCloseThreeDotsMenu} disableRipple>
            <ButtonStyled color="error" onClick={handleDeleteGroup}>
              <Icons.TrashCan />
              <span>Удалить группу</span>
            </ButtonStyled>
          </MenuItem>
          <MenuItem onClick={handleCloseThreeDotsMenu} disableRipple></MenuItem>
        </MenuStyled>
      </Box>
    </Box>
  );
};

export default GroupsList;
