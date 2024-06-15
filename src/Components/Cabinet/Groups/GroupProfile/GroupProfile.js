import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ButtonStyled,
  InputBaseStyledV2,
  Main,
  Root,
  Title,
  customMenuProps,
  selectStylesV2,
  theme,
} from "../../CabinetStyles";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icons } from "../../../../Assets/Icons/icons";
import {
  Button,
  Card,
  Chip,
  Grid,
  Divider,
  InputBase,
  Paper,
  ThemeProvider,
  Typography,
  keyframes,
  styled,
  IconButton,
  Dialog,
  Box,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import * as routes from "../../../../Constants/routes";
import Dropzone from "react-dropzone";
import { NumericFormat } from "react-number-format";
import { Height, RouteSharp } from "@mui/icons-material";
import { CardStyled, InfoWithIcon } from "../../GridItemCardStyles";
import { TypographyStyled } from "../../CabinetStyles";
import groupImage from "../../../../Assets/Images/Group.png";
import useInput from "../../../../hooks/useInput";
import {
  weekDaysText,
  weekDaysTextFull,
} from "../../../../Constants/dateLocales";
import LoadingComponent from "../../../helpers/LoadingComponent";
import api from "../../../../Core/api";
import { format } from "date-fns";

const headerItemStyles = ({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: "#fff",
  border: "1px solid #E5E7EB",
});

const DialogButton = styled(Button)(({ theme, variant, color }) => ({
  minHeight: "44px",
  minWidth: "150px",
  borderRadius: theme.custom.spacing.xxs,
  border:
    variant === "contained"
      ? `1px solid ${theme.palette[color].main}`
      : variant === "text"
      ? "1px solid transparent"
      : "",
  padding: "10px 30px",
  font: "inherit",
  fontWeight: "400",
  textTransform: "none",
  boxShadow: "none",
  "&:hover": { boxShadow: "none" },
}));

// 0 for not absence, 1 for attendance, any other for default (not set)
// const AttendanceToggler = ({ initialToggle = "2" }) => {
//   const [toggle, setToggle] = useState(initialToggle);
//   const [hover, setHover] = useState(false);
//   const handleSetAttendance = () => {
//     setToggle("1");
//   };
//   const handleSetAbsence = () => {
//     setToggle("0");
//   };
//   const handleSetNeutral = () => {
//     setToggle("2");
//   };
//   const handleMouseEnter = () => {
//     setHover(true);
//   };
//   const handleMouseLeave = () => {
//     setHover(false);
//   };
//   return (
//     <Box
//       className="flex justify-between items-center"
//       minHeight="26px"
//       width="100%"
//       maxWidth="64px"
//       backgroundColor={
//         !hover
//           ? toggle === "1"
//             ? "#97FF95"
//             : toggle === "0"
//             ? "#FFC3C3"
//             : "#f9f9f9"
//           : "#f9f9f9"
//       }
//       border={toggle === "1" && toggle === "0" ? "" : "1px solid #A1A7B2"}
//       borderRadius="40px"
//       sx={{
//         cursor: "pointer",
//       }}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onClick={() => setHover(false)}
//     >
//       {(toggle !== "1" && toggle !== "0") || hover ? (
//         <>
//           <Icons.XCircle
//             className="xCircle"
//             color={theme.typography.color.redError}
//             style={{
//               transition: "all .2s ease-in-out",
//               // opacity: toggle === "0" ? 1 : 0,
//             }}
//             onClick={handleSetAbsence}
//           />
//           <Icons.Circle
//             className="circle"
//             color="#A1A7B2"
//             style={{
//               transition: "all .2s ease-in-out",
//               // opacity: toggle !== "0" && toggle !== "1" ? 1 : 0,
//             }}
//             onClick={handleSetNeutral}
//           />
//           <Icons.CheckCircle
//             className="checkCircle"
//             color={theme.typography.color.greenSuccess}
//             style={{
//               transition: "all .2s ease-in-out",
//               // opacity: toggle === "1" ? 1 : 0,
//             }}
//             onClick={handleSetAttendance}
//           />
//         </>
//       ) : (
//         <></>
//       )}
//     </Box>
//   );
// };
const AttendanceToggler = ({ initialToggle = "2" }) => {
  const [toggle, setToggle] = useState(initialToggle);
  const handleSetAttendance = () => {
    setToggle("1");
  };
  const handleSetAbsence = () => {
    setToggle("0");
  };
  const handleSetNeutral = () => {
    setToggle("2");
  };
  return (
    <Box
      className="flex justify-between items-stretch"
      minHeight="26px"
      width="100%"
      maxWidth="64px"
      backgroundColor={"#f9f9f9"}
      border={"1px solid #A1A7B2"}
      borderRadius="40px"
      sx={{
        cursor: "pointer",
      }}
    >
      {/* {(toggle !== "1" && toggle !== "0") || hover ? ( */}
      <>
        <Box
          className="flex items-center"
          sx={{
            transition: "all .2s ease-in-out",
            opacity: toggle === "0" ? 1 : 0,
            "&:hover": { opacity: toggle !== "0" ? 0.5 : "" },
          }}
          onClick={handleSetAbsence}
        >
          <Icons.XCircle
            className="xCircle"
            color={theme.typography.color.redError}
          />
        </Box>
        <Box
          className="flex items-center"
          sx={{
            transition: "all .2s ease-in-out",
            opacity: toggle !== "0" && toggle !== "1" ? 1 : 0,
            "&:hover": { opacity: toggle === "0" || toggle === "1" ? 0.5 : "" },
          }}
          onClick={handleSetNeutral}
        >
          <Icons.Circle className="circle" color="#A1A7B2" />
        </Box>
        <Box
          className="flex items-center"
          sx={{
            transition: "all .2s ease-in-out",
            opacity: toggle === "1" ? 1 : 0,
            "&:hover": { opacity: toggle !== "1" ? 0.5 : "" },
          }}
          onClick={handleSetAttendance}
        >
          <Icons.CheckCircle
            className="checkCircle"
            color={theme.typography.color.greenSuccess}
          />
        </Box>
      </>
      {/* ) : (
        <></>
      )} */}
    </Box>
  );
};

const GroupProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [group, setGroup] = useState(null);

  const [activeTab, setActiveTab] = useState(0);
  const [selectedGroup, changeSelectedGroup] = useInput("0");
  const tabsToMap = [
    "Посещаемость",
    "Материалы",
    "Цены со скидкой",
    "Экзамены",
    "История",
    "Комментарии",
  ];

  const goBack = () => {
    navigate(-1); // This navigates one step back in history
  };

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await api.get(`groups/getById/${id}`);
        setGroup(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching group:", error);
      }
    };

    fetchGroup();
  }, [id]);

  const attendanceContent = useMemo(() => {
    if (!group) {
      return "Loading...";
    }
    return (
      <Box
        className="flex flex-col"
        rowGap="16px"
        maxHeight="75vh"
        height="auto"
        overflow="hidden"
      >
        <Box className="flex justify-between" paddingX="20px">
          <Box display="flex" columnGap="14px">
            <Box className="flex items-center" columnGap="10px" padding="10px">
              <Icons.UserCheckRounded color="#1C0D64" />
              <TypographyStyled
                fontSize="1.125rem"
                fontWeight="600"
                color="#1C0D64"
              >
                Посещаемость
              </TypographyStyled>
            </Box>
            <Link to={routes.STUDENTS} className="link">
              <ButtonStyled sx={{ padding: "10px" }} color="purpleBlue">
                <Box className="flex items-center" columnGap="10px">
                  <Icons.Group />
                  <Typography fontSize="0.875rem">22</Typography>
                </Box>
              </ButtonStyled>
            </Link>
          </Box>
          <Box className="flex items-center" columnGap="12px">
            <Select
              required
              value={selectedGroup}
              onChange={changeSelectedGroup}
              MenuProps={customMenuProps}
              sx={selectStylesV2({ theme })}
              input={<InputBaseStyledV2 />}
              IconComponent={Icons.ArrowDBold}
            >
              <MenuItem value="0">
                <ListItemText>По А-Я</ListItemText>
              </MenuItem>
              {["По Я-А", "Sort by", "Sort by"].map((group, i) => (
                <MenuItem key={group} value={group}>
                  <ListItemText primary={group} />
                </MenuItem>
              ))}
            </Select>
            <ButtonStyled
              sx={{ borderRadius: "50px", padding: "8px 20px" }}
              color="purpleBlue"
            >
              <Box className="flex items-center" columnGap="10px">
                <Icons.CalendarContained />
                <Typography fontSize="1.125rem" fontWeight="600">
                  2-6 Апреля 2024
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
        <Box
          display="flex"
          marginX="20px"
          padding="8px 34px"
          borderRadius="30px"
          backgroundColor="#f9f9f9"
        >
          <Box flexGrow="1" color="#7D8594" maxWidth="25%">
            <TypographyStyled colorFromTheme="grey" fontSize="0.75rem">
              Имя
            </TypographyStyled>
          </Box>
          <Box display="flex" flexGrow="3" maxWidth="75%">
            {weekDaysTextFull.map((weekDay) => (
              <Box className="flex items-center justify-center" width="100%">
                <TypographyStyled colorFromTheme="grey" fontSize="0.75rem">
                  {weekDay}
                </TypographyStyled>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          className="flex flex-col"
          rowGap="15px"
          marginRight="23px"
          marginBottom="20px"
          sx={{ overflowY: "scroll", overflowX: "hidden" }}
        >
          {[
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
          ].map((index) => (
            <Box
              display="flex"
              marginLeft="20px"
              marginRight="-15px"
              padding="8px 34px"
            >
              <Box
                className="flex items-center"
                columnGap="10px"
                flexGrow="1"
                color="#7D8594"
                maxWidth="25%"
              >
                <Icons.Circle
                  color={
                    parseInt(index) % 3 === 0 || parseInt(index) % 2 === 0
                      ? theme.typography.color.greenSuccess
                      : theme.typography.color.redError
                  }
                  width="8px"
                />
                <TypographyStyled
                  colorFromTheme="grey"
                  fontSize="0.75rem"
                  noWrap
                >
                  Ali Ahmad Muhammad ogli
                </TypographyStyled>
              </Box>
              <Box display="flex" flexGrow="3">
                {weekDaysTextFull.map((weekDay) => (
                  <Box
                    className="flex items-center justify-center"
                    width="100%"
                  >
                    <AttendanceToggler initialToggle="2" />
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }, [group]);

  const groupsContent = useMemo(
    () => <div className="flex flex-wrap gap-lg"></div>,
    []
  );

  const emptyElement = <></>;
  const tabContents = useMemo(
    () => [attendanceContent, groupsContent, emptyElement, emptyElement],
    [attendanceContent]
  );

  if (!group) {
    return "Loading...";
  }
  return (
    <Root sx={{ height: "100%" }}>
      <Main className="full-height">
        <div className="flex items-stretch justify-between">
          <div className="flex items-center gap-md">
            <ButtonStyled
              variant="outlined"
              sx={headerItemStyles}
              color="grey"
              onClick={goBack}
            >
              <Icons.ArrowL />
            </ButtonStyled>
            <div className="flex flex-col">
              <Title>Профиль группы</Title>
              <div className="flex items-center gap-x3s">
                <Link to={routes.CABINET + routes.GROUPS} className="link">
                  <Typography fontSize="0.75rem">Группы</Typography>
                </Link>
                <Icons.ArrowL
                  width="1rem"
                  style={{ transform: "rotate(180deg)" }}
                />
                <Typography fontSize="0.75rem">Профиль группы</Typography>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-sm">
            <DialogButton variant="contained" color="purpleBlue">
              <Typography>Изменить группу</Typography>
            </DialogButton>
          </div>
        </div>
        <Paper
          sx={{
            height: "100%",
            borderRadius: "20px",
            padding: "24px",
            boxShadow: "none",
            overflow: "hidden",
          }}
        >
          <Box className="flex" columnGap="24px" width="100%" height="100%">
            <Box className="flex flex-col" height="fit-content" rowGap="22px">
              <CardStyled
                sx={{
                  minWidth: "360px",
                  maxWidth: "360px",
                  padding: "12px",
                  border: "1px solid #E5E7EB",
                }}
              >
                <Box className="flex flex-col" rowGap="22px">
                  <img
                    src={groupImage}
                    alt="Group"
                    width={"100%"}
                    height={180}
                    style={{
                      borderRadius: "14px",
                      border: "1px solid #E5E7EB",
                    }}
                  />
                  <Box className="flex flex-col" rowGap="24px">
                    <Box className="flex justify-between">
                      <Box className="flex flex-col" rowGap="2px">
                        <TypographyStyled fontSize="1.125rem" fontWeight="600">
                          {group.name}
                        </TypographyStyled>
                        <TypographyStyled
                          fontSize="0.75rem"
                          color="lightGray"
                          fontWeight="400"
                        >
                          {group.course.name}
                        </TypographyStyled>
                      </Box>
                      <Box>
                        <Link
                          to={routes.CABINET + routes.TEACHERS + routes.PROFILE}
                        >
                          <ButtonStyled
                            color="grayLight"
                            variant="contained"
                            sx={{
                              borderRadius: "40px",
                              padding: "4px 10px",
                            }}
                          >
                            <TypographyStyled
                              color="inherit"
                              fontSize="0.75rem"
                            >
                              Koptleulov Arslan
                            </TypographyStyled>
                          </ButtonStyled>
                        </Link>
                      </Box>
                    </Box>
                    <Box className="flex flex-col" rowGap="12px">
                      <Box className="flex justify-between items-center">
                        <InfoWithIcon>
                          <Icons.CalendarContained />
                          <TypographyStyled>Дата начала</TypographyStyled>
                        </InfoWithIcon>
                        <TypographyStyled small>
                          {format(group.startDate, "dd.MM.yyyy")}
                        </TypographyStyled>
                      </Box>
                      <Box className="flex justify-between items-center">
                        <InfoWithIcon>
                          <Icons.ClockDashed />
                          <TypographyStyled>Дата завершения</TypographyStyled>
                        </InfoWithIcon>
                        <TypographyStyled small>
                          {format(group.endDate, "dd.MM.yyyy")}
                        </TypographyStyled>
                      </Box>
                      <Box className="flex justify-between items-center">
                        <InfoWithIcon>
                          <Icons.CalendarDateContained />
                          <TypographyStyled>Дни урока</TypographyStyled>
                        </InfoWithIcon>
                        <Box className="flex items-center" columnGap="10px">
                          <TypographyStyled small>
                            {group.classDays.map(
                              (weekDay, i) =>
                                `${weekDaysText[weekDay]}${
                                  i < group.classDays.length - 1 ? ", " : ""
                                }`
                            )}
                          </TypographyStyled>
                          <Icons.Circle
                            color="#A1A7B2"
                            width="4px"
                          ></Icons.Circle>
                          <TypographyStyled small>
                            {group.courseTime}
                          </TypographyStyled>
                        </Box>
                      </Box>
                      <Box className="flex justify-between items-center">
                        <InfoWithIcon>
                          <Icons.Door />
                          <TypographyStyled>Кабинет</TypographyStyled>
                        </InfoWithIcon>
                        <Box className="flex items-center" columnGap="10px">
                          <TypographyStyled small>
                            {group.roomNumber}
                          </TypographyStyled>
                          {/* <Icons.Circle
                            color="#A1A7B2"
                            width="4px"
                          ></Icons.Circle>
                          <TypographyStyled small>1</TypographyStyled> */}
                        </Box>
                      </Box>
                      <Box className="flex justify-between items-center">
                        <InfoWithIcon>
                          <Icons.Location />
                          <TypographyStyled>Филиал</TypographyStyled>
                        </InfoWithIcon>
                        <TypographyStyled small>
                          IT Park Tashkent
                        </TypographyStyled>
                      </Box>
                      <Box className="flex justify-between items-center">
                        <InfoWithIcon>
                          <Icons.CardSend />
                          <TypographyStyled>Прибыль группы</TypographyStyled>
                        </InfoWithIcon>
                        <TypographyStyled
                          color={theme.typography.color.greenSuccess}
                          small
                        >
                          <NumericFormat
                            value={5000000}
                            displayType="text" // Set to "input" if you want an input field
                            thousandSeparator=" "
                          />{" "}
                          сўм
                        </TypographyStyled>
                      </Box>
                      <Box className="flex justify-between items-center">
                        <InfoWithIcon>
                          <Icons.BillCross />
                          <TypographyStyled>Долг группы</TypographyStyled>
                        </InfoWithIcon>
                        <TypographyStyled
                          color={theme.typography.color.redError}
                          small
                        >
                          <NumericFormat
                            value={-5000000}
                            displayType="text" // Set to "input" if you want an input field
                            thousandSeparator=" "
                          />{" "}
                          сўм
                        </TypographyStyled>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardStyled>
              <ButtonStyled
                variant="contained"
                color="purpleBlueLight"
                sx={{
                  cursor: "default",
                  borderRadius: "50px",
                  padding: "10px",
                }}
              >
                <Box className="flex items-center" columnGap="10px">
                  <Icons.Wallet />
                  <Typography>
                    <NumericFormat
                      value={1212000}
                      displayType="text" // Set to "input" if you want an input field
                      thousandSeparator=" "
                    />{" "}
                    сўм
                  </Typography>
                </Box>
              </ButtonStyled>
            </Box>
            <Paper
              sx={{
                width: "100%",
                height: "100%",
                boxShadow: "none",
                borderRadius: "20px",
                border: "1px solid #E5E7EB",
                overflow: "hidden",
              }}
            >
              <Box className="flex flex-col" rowGap="20px" maxHeight="100%">
                <Box
                  className="flex"
                  columnGap="12px"
                  paddingX="20px"
                  paddingTop="20px"
                >
                  {tabsToMap.map((tab, i) => (
                    <>
                      <ButtonStyled
                        variant={activeTab === i ? "contained" : "text"}
                        color="purpleBlueLight"
                        active={activeTab === i}
                        onClick={() => setActiveTab(i)}
                        key={i}
                        sx={{
                          minWidth: "unset",
                          fontSize: "1.125rem",
                          lineHeight: "150%",
                          padding: "11px 10px",
                          borderRadius: "10px",
                        }}
                      >
                        {tab}
                      </ButtonStyled>
                      {i < tabsToMap.length - 1 && (
                        <div className="flex justify-between items-center">
                          <Icons.DividerDot height="6px" color="#D1D5DB" />
                        </div>
                      )}
                    </>
                  ))}
                </Box>
                {tabContents[activeTab]}
              </Box>
            </Paper>
          </Box>
        </Paper>
      </Main>
    </Root>
  );
};

export default GroupProfile;
