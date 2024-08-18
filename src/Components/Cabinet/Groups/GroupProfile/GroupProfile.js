import {
  Box,
  Button,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Typography,
  styled,
} from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icons } from "../../../../Assets/Icons/icons";
import groupImage from "../../../../Assets/Images/Group.png";
import {
  weekDaysText,
  weekDaysTextFull,
} from "../../../../Constants/dateLocales";
import * as routes from "../../../../Constants/routes";
import api from "../../../../Core/api";
import useInput from "../../../../hooks/useInput";
import {
  ButtonStyled,
  InputBaseStyledV2,
  Main,
  Root,
  Title,
  TypographyStyled,
  customMenuProps,
  selectStylesV2,
  theme,
} from "../../CabinetStyles";
import { CardStyled, InfoWithIcon } from "../../GridItemCardStyles";

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
  const [material, setMaterial] = useState([
    {
      name: "UX/UI - Figma это база",
      file: "figma_база.mp4",
      uploadDate: { time: "13:23", date: "15.02.2024" },
    },
    {
      name: "UX/UI - Figma это база",
      file: "figma_база.mp4",
      uploadDate: { time: "13:23", date: "15.02.2024" },
    },
    {
      name: "UX/UI - Figma это база",
      file: "figma_база.mp4",
      uploadDate: { time: "13:23", date: "15.02.2024" },
    },
    {
      name: "UX/UI - Figma это база",
      file: "figma_база.mp4",
      uploadDate: { time: "13:23", date: "15.02.2024" },
    },
    {
      name: "UX/UI - Figma это база",
      file: "figma_база.mp4",
      uploadDate: { time: "13:23", date: "15.02.2024" },
    },
    {
      name: "UX/UI - Figma это база",
      file: "figma_база.mp4",
      uploadDate: { time: "13:23", date: "15.02.2024" },
    },
    {
      name: "UX/UI - Figma это база",
      file: "figma_база.mp4",
      uploadDate: { time: "13:23", date: "15.02.2024" },
    },
  ]);
  const [discPrice, setDiscPrice] = useState([
    {
      fullname: "Usmonov Shaxzod Dilshodovich",
      phoneNumber: "+998900331533",
      reason: "Выйграл конкурсе",
    },
    {
      fullname: "Anita Choy Chombitovna",
      phoneNumber: "+998900331533",
      reason: "Выйграл конкурсе",
    },
    {
      fullname: "Cameron Williamson Williamson",
      phoneNumber: "+998900331533",
      reason: "Выйграл в конкурсе",
    },
    {
      fullname: "Cameron Williamson Williamson",
      phoneNumber: "+998900331533",
      reason: "Выйграл в конкурсе",
    },
    {
      fullname: "Cameron Williamson Williamson",
      phoneNumber: "+998900331533",
      reason: "Выйграл в конкурсе",
    },
    {
      fullname: "Cameron Williamson Williamson",
      phoneNumber: "+998900331533",
      reason: "Выйграл в конкурсе",
    },
    {
      fullname: "Cameron Williamson Williamson",
      phoneNumber: "+998900331533",
      reason: "Выйграл в конкурсе",
    },
    {
      fullname: "Cameron Williamson Williamson",
      phoneNumber: "+998900331533",
      reason: "Выйграл в конкурсе",
    },
    {
      fullname: "Cameron Williamson Williamson",
      phoneNumber: "+998900331533",
      reason: "Выйграл в конкурсе",
    },
    {
      fullname: "Cameron Williamson Williamson",
      phoneNumber: "+998900331533",
      reason: "Выйграл в конкурсе",
    },
    {
      fullname: "Cameron Williamson Williamson",
      phoneNumber: "+998900331533",
      reason: "Выйграл в конкурсе",
    },
    {
      fullname: "Cameron Williamson Williamson",
      phoneNumber: "+998900331533",
      reason: "Выйграл в конкурсе",
    },
    {
      fullname: "Cameron Williamson Williamson",
      phoneNumber: "+998900331533",
      reason: "Выйграл в конкурсе",
    },
    {
      fullname: "Cameron Williamson Williamson",
      phoneNumber: "+998900331533",
      reason: "Выйграл в конкурсе",
    },
    {
      fullname: "Cameron Williamson Williamson",
      phoneNumber: "+998900331533",
      reason: "Выйграл в конкурсе",
    },
    {
      fullname: "Cameron Williamson Williamson",
      phoneNumber: "+998900331533",
      reason: "Выйграл в конкурсе",
    },
  ]);

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
  });

  const materials = useMemo(() => {
    if (!group) {
      return "Loading...";
    }
    return (
      <Box
        className="flex flex-col"
        rowGap="16px"
        height="auto"
        overflowX="hidden"
        overflowY="scroll"
      >
        <Box
          className="flex flex-col"
          rowGap="10px"
          height="auto"
          sx={{ height: "auto" }}
        >
          <ButtonStyled
            variant="container"
            sx={{
              backgroundColor: "white",
              border: "1px solid #6574D8",
              minWidth: "unset",
              fontSize: "1.125rem",
              lineHeight: "150%",
              paddingX: "24px",
              paddingY: "10px",
              borderRadius: "10px",
              gap: "10px",
              marginLeft: "15px",
              marginRight: "25px",
            }}
          >
            <Icons.Add />
            <Typography fontSize="1rem" fontWeight="500">
              Добавить Материал
            </Typography>
          </ButtonStyled>
          <Box
            sx={{
              maxHeight: "50vh",
              overflowY: "scroll",
              overflowX: "hidden",
              marginRight: "15px",
            }}
          >
            {material.map((item, index) => (
              <Box
                className="flex flex-col justify-between"
                key={index}
                sx={{
                  backgroundColor: "#F9FAFB",
                  rowGap: "7px",
                  paddingY: "20px",
                  paddingX: "18px",
                  marginX: "15px",
                }}
              >
                <Box className="flex flex-row justify-between">
                  <Typography fontWeight="700" fontSize="14px">
                    {item.name}
                  </Typography>
                  <Typography>
                    {item.uploadDate.time} / {item.uploadDate.date}
                  </Typography>
                </Box>
                <Box
                  className="flex flex-row items-center justify-between"
                  sx={{ alignItems: "flex-end" }}
                >
                  <Box className="flex items-center" gap="5px">
                    <Icons.PLayMaterial width="32px" height="32px" />
                    <Typography fontSize="14px">{item.file}</Typography>
                  </Box>
                  <ButtonStyled
                    className="flex items-center"
                    variant="container"
                    sx={{
                      backgroundColor: "#8E99DE",
                      color: "white",
                      minWidth: "unset",
                      fontSize: "1.125rem",
                      lineHeight: "150%",
                      paddingX: "24px",
                      paddingY: "10px",
                      borderRadius: "10px",
                      "&:hover": {
                        color: "#8E99DE",
                      },
                    }}
                  >
                    <Typography fontSize="18px">Скачать Материал</Typography>
                  </ButtonStyled>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }, [group]);

  const discountPrice = useMemo(() => {
    const formatUzbekPhoneNumber = (phoneNumber) => {
      const countryCode = phoneNumber.slice(0, 4);
      const operatorCode = phoneNumber.slice(4, 6);
      const firstPart = phoneNumber.slice(6, 9);
      const secondPart = phoneNumber.slice(9, 11);
      const thirdPart = phoneNumber.slice(11, 13);

      return `${countryCode} (${operatorCode}) ${firstPart}-${secondPart}-${thirdPart}`;
    };

    if (!group) {
      return "Loading...";
    }
    return (
      <Box
        className="flex flex-col justify-center"
        marginTop="15px"
        marginRight="35px"
        owGap="16px"
        maxHeight="75vh"
        height="auto"
        overflow="hidden"
      >
        <Box
          className="flex flex-row justify-between"
          sx={{
            paddingY: "8px",
            paddingRight: "104px",
            paddingLeft: "51px",
            backgroundColor: "#F9F9F9",
            borderRadius: "29px",
            fontWeight: "700",
            fontSize: "14px",
            color: "#7D8594",
          }}
        >
          <Typography>ФИО</Typography>
          <Box
            className="flex flex-row justify-between"
            width="630px"
            gap="80px"
          >
            <Box className="flex" width="130px">
              <Typography className="flex" alignItems="flex-start">
                Телефон
              </Typography>
            </Box>
            <Box className="flex" alignItems="flex-start" width="203px">
              <Typography alignItems="flex-start">Цена со скидкой</Typography>
            </Box>
            <Box className="flex" alignItems="flex-start" width="120px">
              <Typography>Причина</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          className="flex flex-col"
          rowGap="10px"
          height="auto"
          sx={{
            maxHeight: "60vh",
            height: "auto",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {discPrice.map((item, index) => (
            <Box
              className="flex flex-row items-center justify-between"
              id={index}
              sx={{
                backgroundColor: `${index % 2 !== 0 ? "#F9F9F9" : "white"}`,
                paddingY: "27px",
                paddingX: "51px",
                fontSize: "12px",
                color: "#7D8594",
                weight: "500",
              }}
            >
              <Typography>{item.fullname}</Typography>
              <Box
                className="flex flex-row items-center justify-center align-center"
                width="650px"
                position="relative"
                right="35px"
              >
                <Box sx={{ position: "absolute", left: "10px" }}>
                  <Typography>
                    {formatUzbekPhoneNumber(item.phoneNumber)}
                  </Typography>
                </Box>
                <Box sx={{ position: "absolute", left: "225px" }}>
                  <ButtonStyled
                    variant="container"
                    sx={{
                      border: "1px solid #8E99DE",
                      backgroundColor: "white",
                      color: "#8E99DE",
                      fontSize: "1.125rem",
                      lineHeight: "150%",
                      paddingX: "24px",
                      paddingY: "8px",
                      borderRadius: "10px",
                      "&:hover": {
                        color: "#8E99DE",
                      },
                    }}
                  >
                    <Typography>Добавить скидку</Typography>
                  </ButtonStyled>
                </Box>
                <Box
                  sx={{
                    width: "auto",
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "auto",
                    left: "520px",
                  }}
                >
                  <Typography>{item.reason}</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    );
  });

  const groupsContent = useMemo(
    () => <div className="flex flex-wrap gap-lg"></div>,
    []
  );

  const emptyElement = <></>;
  const tabContents = useMemo(
    () => [
      attendanceContent,
      materials,
      discountPrice,
      groupsContent,
      emptyElement,
      emptyElement,
    ],
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
                          UZS
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
                          UZS
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
                    UZS
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
