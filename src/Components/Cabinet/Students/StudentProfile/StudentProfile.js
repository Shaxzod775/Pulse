import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ButtonStyled,
  Main,
  Root,
  Title,
  TypographyStyled,
  theme,
} from "../../CabinetStyles";
import { Link, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import * as routes from "../../../../Constants/routes";
import Dropzone from "react-dropzone";
import { NumericFormat } from "react-number-format";
import { Height, RateReview, RouteSharp } from "@mui/icons-material";
import AttendanceCalendar from "./AttendanceCalendar/AttendanceCalendar";

const headerItemStyles = ({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: "#fff",
  border: "1px solid #E5E7EB",
});

const HeaderDiv = styled("div")(({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: "#fff",
  border: "1px solid #E5E7EB",
}));

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

const SquareContainer = styled("div")(
  ({
    theme,
    width,
    height = 200,
    bgColor = theme.palette.purpleBlue.main,
    active,
  }) => ({
    width: width ? `${width}px` : "100%",
    height: `${height}px`,
    backgroundColor: bgColor,
    borderRadius: "10px",
    // border: `${active ? "3px dashed #cccccc" : "1px solid #E5E7EB"}`,
    overflow: "hidden",

    "& img": {
      // Set image to cover the entire container
      width: "100%",
      height: "100%",
      objectFit: "cover", // This resizes the image to fit the container

      // Maintain aspect ratio and prevent overflow
      objectPosition: "center", // Center the image within the container
    },

    // animation: `${rainbowCycle} 6s ${
    //   active ? "infinite" : "1"
    // } alternate ease-in-out`,
    // animationDelay: active ? "0s" : "3s", // Control animation timing
  })
);

const CircleContainer = styled("div")(
  ({ theme, width = 116, height = 116, bgColor = "#F9FAFB" }) => ({
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: bgColor,
    borderRadius: `50%`,
    border: "6px solid #FFF",
    overflow: "hidden",
    cursor: "pointer",

    "& img": {
      // Set image to cover the entire container
      width: "100%",
      height: "100%",
      objectFit: "cover", // This resizes the image to fit the container

      // Maintain aspect ratio and prevent overflow
      objectPosition: "center", // Center the image within the container
    },
  })
);

const InfoLine = styled("div")(({ theme, small }) => ({
  display: "flex",
  alignItems: "center",
  gap: small ? "3px" : "5px",
  fontSize: small ? ".75rem" : "inherit",
  "& svg": {
    minWidth: "20px",
    width: small ? "20px" : "24px",
    height: "auto",
  },
}));

const CardText = styled(Typography)(
  ({
    theme,
    fontFamily = "Poppins, Rubik, sans-serif",
    fontSize = "18px",
  }) => ({
    fontFamily: fontFamily,
    fontSize: fontSize,
    lineHeight: "normal",
  })
);

const ProfileTabHeader = styled("div")(
  ({
    theme,
    active,
    fontWeight = 500,
    fontSize = "1.125rem",
    fontFamily = "inherit",
  }) => ({
    color: active ? "#1C0D64" : "#AEB2BA",
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontWeight: fontWeight,
    lineHeight: "150%",
    position: "relative",
    transition: "all 0.3s ease-in-out",
    cursor: active ? "" : "pointer",
    "&::after": {
      content: `""`,
      position: "absolute",
      left: active ? "0%" : "50%",
      right: active ? "0%" : "50%",
      bottom: "-14px",
      height: "2px",
      backgroundColor: "#6574D8",
      transition: "all .3s ease-in-out",
    },
    "&:hover": { opacity: active ? "" : ".5" },
  })
);

const InfoItem = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  lineHeight: "150%",
  fontFamily: "Poppins, Rubik, sans-serif",
  "& > h5": {
    margin: "0",
    color: "#AEB2BA",
    fontSize: "1.125rem",
    fontWeight: "500",
    letterSpacing: ".36px",
  },
  "& > span": {
    color: "#1C0D64",
    fontSize: "1rem",
    letterSpacing: ".32px",
  },
  // svg: { color: theme.typography.color.purpleBlue },
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  borderRadius: "8px",
  padding: "6px 12px",
  "& .MuiChip-label": { padding: "0" },
}));

const PaymentPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "10px",
  padding: "8px 10px",
  boxShadow: "none",
  width: "100%",
  color: "#6574D8",
  backgroundColor: "#EEF0FF",
}));

const PaymentInfoLine = styled("div")(({ theme }) => ({
  color: "inherit",
  display: "flex",
  gap: "8px",
  "& svg": {
    minWidth: "24px",
    height: "auto",
  },
  "& span": {
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "150%",
    letterSpacing: "0.32px",
    whiteSpace: "nowrap",
  },
}));

export const GroupsCard = ({ status = "active" }) => {
  // status from ["active", "archive", "completed"]
  const statusTexts = ["Активен", "Архивный", "Завершен"];
  const GroupCardInfoLine = useMemo(
    () =>
      styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        gap: "8px",
        "& > svg": {
          color:
            status === "completed"
              ? "#6B7280"
              : theme.typography.color.purpleBlue,
        },
        "& > div > .MuiTypography-root:first-of-type": {
          fontSize: ".875rem",
          fontWeight: "600",
          fontFamily: "inherit",
          color: "#AEB2BA",
        },
        "& > div > .MuiTypography-root:nth-of-type(2)": {
          fontSize: ".875rem",
          fontFamily: "inherit",
          color:
            status === "completed" ? "grey" : theme.typography.color.purpleBlue,
        },
      })),
    [status]
  );
  return (
    <Paper
      sx={{
        borderRadius: "20px",
        padding: "14px",
        boxShadow: "none",
        border: "1px solid #E5E7EB",
        // width: "100%",
        // minHeight: "357px",
        // maxWidth: "max-content",
      }}
    >
      <div className="flex flex-col gap-xs">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-xxs2">
            <Typography fontWeight={600} fontFamily="inherit">
              GR011-62
            </Typography>
            <Typography
              fontSize=".75rem"
              fontWeight={500}
              color="#AEB2BA"
              fontFamily="inherit"
            >
              UX/UI - Четные дни: 15:00
            </Typography>
          </div>
          <div>
            <Icons.MenuDots />
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-xs">
          <GroupCardInfoLine>
            <Icons.CalendarAdd />
            <div>
              <Typography>Дата добавления: </Typography>
              <Typography>20.02.2024</Typography>
            </div>
          </GroupCardInfoLine>
          <GroupCardInfoLine>
            <Icons.CalendarAdd />
            <div>
              <Typography>Дата завершения: </Typography>
              <Typography>20.08.2024</Typography>
            </div>
          </GroupCardInfoLine>
          <GroupCardInfoLine>
            <Icons.CalendarAdd />
            <div>
              <Typography>Дата активации:</Typography>
              <Typography>20.02.2024</Typography>
            </div>
          </GroupCardInfoLine>
          <GroupCardInfoLine>
            <Icons.Bill />
            <div>
              <Typography>Стоимость для студента:</Typography>
              <Typography>1 000 000 UZS</Typography>
            </div>
          </GroupCardInfoLine>
        </div>
        <ButtonStyled
          fullWidth
          variant="outlined"
          color={status === "active" ? "successGreen" : "grey"}
          sx={{ padding: "6px 10px", borderRadius: "49px" }}
        >
          <div className="flex items-center gap-xxs2">
            <Icons.Wallet />
            <span>
              Статус:{" "}
              {status === "active"
                ? statusTexts[0]
                : status === "archive"
                ? statusTexts[1]
                : statusTexts[2]}
            </span>
          </div>
        </ButtonStyled>
      </div>
    </Paper>
  );
};

export const StudentProfile = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const tabsToMap = [
    "Личная информация",
    "Группы",
    "Посещаемость",
    "История звонков",
    "SMS",
    "История",
  ];

  const goBack = () => {
    navigate(-1); // This navigates one step back in history
  };

  const persoalInfoContent = useMemo(
    () => (
      <div className="flex flex-wrap gap-lg">
        <div className="flex flex-col gap-sm">
          <div className="flex items-center gap-xxs">
            <Icons.UserId color={theme.typography.color.purpleBlue} />
            <Typography fontSize="1.125rem" fontWeight={600}>
              Информация о пользователе
            </Typography>
          </div>
          <div className="flex gap-lg">
            <div className="flex flex-col gap-xxs2">
              <InfoItem>
                <h5>Фамилия Имя Отчество</h5>
                <span>Koptleulov Arslan Almazovich</span>
              </InfoItem>
              <InfoItem>
                <h5>Номер телефона</h5>
                <span>
                  <div className="flex items-center gap-xxs2">
                    <Typography>+998 (33) 033-15-33</Typography>
                    <Link to="tel:/+998330331533" className="link">
                      <IconButton color="purpleBlue">
                        <Icons.Call />
                      </IconButton>
                    </Link>
                  </div>
                </span>
              </InfoItem>
              <InfoItem>
                <h5>Дата рождения:</h5>
                <span>21.08.2002</span>
              </InfoItem>
              <InfoItem>
                <h5>E-mail:</h5>
                <span>
                  <div className="flex items-center gap-xxs2">
                    <Typography>arslan.koptleulov@abexlab.com</Typography>
                    <Link
                      to="mailto:arslan.koptleulov@abexlab.com"
                      className="link"
                    >
                      <IconButton color="purpleBlue">
                        <Icons.Messages />
                      </IconButton>
                    </Link>
                  </div>
                </span>
              </InfoItem>
              <InfoItem>
                <h5>ID или Свидетельство о рождении:</h5>
                <span>AB 247325</span>
              </InfoItem>
            </div>
            <div className="flex flex-col gap-xxs2">
              <InfoItem>
                <h5>Теги</h5>
                <div className="flex gap-xxs2">
                  <SkillChip label={"VIP"} variant="outlined" color="golden" />
                  <SkillChip
                    label={"Сын Министра"}
                    variant="outlined"
                    color="blue"
                  />
                </div>
              </InfoItem>
              <InfoItem>
                <h5>Номер родителей</h5>
                <span className="flex flex-col">
                  <div className="flex items-center gap-xxs2">
                    <Typography>+998 (33) 033-15-33</Typography>
                    <Link to="tel:/+998330331533" className="link">
                      <IconButton color="purpleBlue">
                        <Icons.Call />
                      </IconButton>
                    </Link>
                  </div>
                </span>
              </InfoItem>
              <InfoItem>
                <h5>Адрес проживания:</h5>
                <span>Ташкент, Яшнабад, Тузель 1, кв 33</span>
              </InfoItem>
              <InfoItem>
                <h5>Активная группа:</h5>
                <span>GR011-62</span>
              </InfoItem>
              <InfoItem>
                <h5>Описание:</h5>
                <span>Ребенок гений</span>
              </InfoItem>
            </div>
          </div>
        </div>
        <div className="flex flex-grow flex-col gap-sm">
          <div className="flex items-center gap-xxs">
            <Icons.Wallet color={theme.typography.color.purpleBlue} />
            <Title fontSize="1.125rem" fontWeight={600}>
              Платежи
            </Title>
          </div>
          <Paper
            sx={{
              borderRadius: "10px",
              padding: "14px",
              boxShadow: "none",
              border: "1px solid #E5E7EB",
              width: "100%",
              minHeight: "357px",
              // maxWidth: "max-content",
              flexGrow: "1",
            }}
          >
            <div className="full-height flex flex-col justify-between gap-sm">
              <div className="flex flex-col gap-xs">
                <div className="flex">
                  {["Дата", "Сумма", "Комментарий", "Сотрудник"].map(
                    (tab, i) => (
                      <Typography
                        color="#1F2937"
                        fontWeight={600}
                        lineHeight="150%"
                        fontFamily="Poppins, Rubik, sans-serif"
                        key={i}
                        minWidth="9.5rem"
                        textAlign="center"
                      >
                        {tab}
                      </Typography>
                    )
                  )}
                </div>
                <Divider />
                <div className="flex flex-col gap-xs">
                  <PaymentPaper>
                    <div className="flex justify-between">
                      <div className="flex gap-lg items-start">
                        <PaymentInfoLine>
                          <Icons.CalendarAdd />
                          <span>20.02.2024</span>
                        </PaymentInfoLine>
                        <PaymentInfoLine>
                          <Icons.Bill />
                          <span>1 000 000 UZS</span>
                        </PaymentInfoLine>
                        <PaymentInfoLine>
                          <Icons.Messages />
                          <span>Click</span>
                        </PaymentInfoLine>
                        <div className="flex flex-col items-center gap-xxs2">
                          <PaymentInfoLine>
                            <Icons.UserId />
                            <span>Iroda Elliyeva</span>
                          </PaymentInfoLine>
                          <Typography
                            fontSize=".75rem"
                            fontWeight="500"
                            letterSpacing=".12px"
                            color="#ADACF2"
                          >
                            20.02/2024 12:25
                          </Typography>
                        </div>
                      </div>
                      <div className="flex gap-xxs2">
                        <Icons.Mailbox />
                        <Icons.Pen2 />
                      </div>
                    </div>
                  </PaymentPaper>
                  <PaymentPaper>
                    <div className="flex justify-between">
                      <div className="flex gap-lg items-start">
                        <PaymentInfoLine>
                          <Icons.CalendarAdd />
                          <span>20.02.2024</span>
                        </PaymentInfoLine>
                        <PaymentInfoLine>
                          <Icons.Bill />
                          <span>1 000 000 UZS</span>
                        </PaymentInfoLine>
                        <PaymentInfoLine>
                          <Icons.Messages />
                          <span>Click</span>
                        </PaymentInfoLine>
                        <div className="flex flex-col items-center gap-xxs2">
                          <PaymentInfoLine>
                            <Icons.UserId />
                            <span>Iroda Elliyeva</span>
                          </PaymentInfoLine>
                          <Typography
                            fontSize=".75rem"
                            fontWeight="500"
                            letterSpacing=".12px"
                            color="#ADACF2"
                          >
                            20.02/2024 12:25
                          </Typography>
                        </div>
                      </div>
                      <div className="flex gap-xxs2">
                        <Icons.Mailbox />
                        <Icons.Pen2 />
                      </div>
                    </div>
                  </PaymentPaper>
                </div>
              </div>
              <ButtonStyled
                variant="outlined"
                color="successGreen"
                sx={{ padding: "6px 10px", borderRadius: "49px" }}
              >
                <div className="flex items-center gap-xxs">
                  <Icons.InboxIn />
                  <span>Скачать все платежи</span>
                </div>
              </ButtonStyled>
            </div>
          </Paper>
        </div>
      </div>
    ),
    []
  );

  const groupsContent = useMemo(
    () => (
      <div className="flex flex-wrap gap-lg">
        <Grid
          container
          justifyContent="start"
          spacing={`${12}px`}
          marginBottom={`${theme.custom.spacing.sm}px`}
        >
          <Grid item xs="auto" md="auto" lg={3}>
            <GroupsCard status="active" />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <GroupsCard status="archive" />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <GroupsCard status="completed" />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <Button
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "20px",
                padding: "14px",
                boxShadow: "none",
                border: "1px solid #E5E7EB",
              }}
              color="purpleBlue"
            >
              <div className="full-width full-height flex flex-col items-center justify-center gap-sm">
                <Icons.AddCircleContained
                  width="72px"
                  height="72px"
                  color={theme.typography.color.purpleBlue}
                />
                <Typography
                  maxWidth="150px"
                  fontWeight={600}
                  color={theme.typography.color.purpleBlue}
                  textAlign="center"
                >
                  Добавить в новую группу
                </Typography>
              </div>
            </Button>
          </Grid>
        </Grid>
      </div>
    ),
    []
  );

  const attendanceContent = useMemo(
    () => (
      <>
        <Box>
          <Box maxWidth="60%">
            <AttendanceCalendar />
          </Box>
        </Box>
      </>
    ),
    []
  );

  const callsHistoryContent = useMemo(
    () => (
      <>
        <Box className="flex flex-col" rowGap="26px">
          <Box className="flex items-center" columnGap="10px">
            <TypographyStyled display="flex" colorFromTheme="purpleBlue">
              <Icons.Call />
            </TypographyStyled>
            <TypographyStyled fontSize="1.125rem" fontWeight="600">
              История звонков
            </TypographyStyled>
          </Box>
          <Box
            className="flex flex-col"
            rowGap="26px"
            maxHeight="50vh"
            overflow="auto"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, i) => (
              <Box
                key={i}
                className="flex items-center justify-between"
                marginRight="10px"
                padding="18px 25px"
                borderRadius="25px"
                bgcolor="#F9FAFB"
              >
                <TypographyStyled colorFromTheme="black" fontWeight="600" small>
                  +998 (33) 033-15-33
                </TypographyStyled>
                <Box display="flex" columnGap="24px">
                  <TypographyStyled colorFromTheme="purpleBlue" small>
                    12 минут
                  </TypographyStyled>
                  <TypographyStyled colorFromTheme="black" small>
                    13:23 | 15.02.2024
                  </TypographyStyled>
                  <TypographyStyled colorFromTheme="greenSuccess" small>
                    Звонок совершен
                  </TypographyStyled>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </>
    ),
    []
  );

  const smsHistoryContent = useMemo(
    () => (
      <>
        <Box className="flex flex-col" rowGap="26px">
          <Box className="flex items-center" columnGap="10px">
            <TypographyStyled display="flex" colorFromTheme="purpleBlue">
              <Icons.ChatRoundUnread />
            </TypographyStyled>
            <TypographyStyled fontSize="1.125rem" fontWeight="600">
              SMS
            </TypographyStyled>
          </Box>
          <Box
            className="flex flex-col"
            rowGap="26px"
            maxHeight="50vh"
            overflow="auto"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, i) => (
              <Box
                key={i}
                className="flex flex-col"
                rowGap="7px"
                marginRight="10px"
                padding="18px 25px"
                borderRadius="25px"
                bgcolor="#F9FAFB"
              >
                <Box className="flex items-center justify-between">
                  <TypographyStyled
                    colorFromTheme="black"
                    fontWeight="600"
                    small
                  >
                    +998 (33) 033-15-33
                  </TypographyStyled>
                  <Box display="flex" columnGap="24px">
                    <TypographyStyled colorFromTheme="black" small>
                      13:23 | 15.02.2024
                    </TypographyStyled>
                  </Box>
                </Box>
                <Box className="flex items-center justify-between">
                  <Box
                    className="flex items-center"
                    columnGap="10px"
                    maxWidth="75%"
                  >
                    <Icons.ChatRoundDots
                      width="34px"
                      height="34px"
                      color={theme.typography.color.purpleBlue}
                    />
                    <TypographyStyled small>
                      Office ipsum you must be muted. Strategies relaxation go
                      eow book reinvent working nail parking. Incentivization
                      solutionize interim search way discussions able. Light
                      anomalies highlights initiative enable crack building out.
                      Mint monday that box food launch unlock is. Last items
                      goto.
                    </TypographyStyled>
                  </Box>
                  <TypographyStyled colorFromTheme="greenSuccess" small>
                    Отправлен
                  </TypographyStyled>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </>
    ),
    []
  );

  const changeHistoryContent = useMemo(
    () => (
      <>
        <Box className="flex flex-col" rowGap="26px">
          <Box className="flex items-center" columnGap="10px">
            <TypographyStyled display="flex" colorFromTheme="purpleBlue">
              <Icons.ClipboardText />
            </TypographyStyled>
            <TypographyStyled fontSize="1.125rem" fontWeight="600">
              История
            </TypographyStyled>
          </Box>
          <Box
            className="flex flex-col"
            rowGap="26px"
            maxHeight="50vh"
            overflow="auto"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, i) => (
              <Box
                key={i}
                className="flex flex-col"
                rowGap="7px"
                marginRight="10px"
                padding="18px 25px"
                borderRadius="25px"
                bgcolor="#F9FAFB"
              >
                <Box className="flex items-center justify-between">
                  <TypographyStyled
                    colorFromTheme="black"
                    fontWeight="600"
                    small
                  >
                    Баланс отредактирован
                  </TypographyStyled>
                  <Box display="flex" columnGap="24px">
                    <TypographyStyled colorFromTheme="black" small>
                      13:23 | 15.02.2024
                    </TypographyStyled>
                  </Box>
                </Box>
                <Box className="flex items-center justify-between">
                  <Box
                    className="flex items-center"
                    columnGap="10px"
                    maxWidth="75%"
                  >
                    <Icons.Pen2
                      width="34px"
                      height="34px"
                      color={theme.typography.color.purpleBlue}
                    />
                    <TypographyStyled small>
                      По причине перерасчета
                    </TypographyStyled>
                  </Box>
                  <TypographyStyled colorFromTheme="greenSuccess" small>
                    Sherzod Abdurahmanov
                  </TypographyStyled>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </>
    ),
    []
  );

  const emptyElement = <></>;
  const tabContents = useMemo(
    () => [
      persoalInfoContent,
      groupsContent,
      attendanceContent,
      callsHistoryContent,
      smsHistoryContent,
      changeHistoryContent,
    ],
    [persoalInfoContent, groupsContent]
  );

  return (
    <Root>
      <Main>
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
              <Title>Профиль ученика</Title>
              <div className="flex items-center gap-x3s">
                <Link to={routes.CABINET + routes.STUDENTS} className="link">
                  <Typography fontSize="0.75rem">Ученики</Typography>
                </Link>
                <Icons.ArrowL
                  width="1rem"
                  style={{ transform: "rotate(180deg)" }}
                />
                <Typography fontSize="0.75rem">Профиль ученика</Typography>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-sm">
            <Link to={routes.CABINET + routes.STUDENTS} className="link">
              <DialogButton
                variant="outlined"
                color="crimson"
                // onClick={handleClickOpen}
              >
                <div className="flex items-center gap-x3s">
                  <Typography>Удалить ученика</Typography>
                </div>
              </DialogButton>
            </Link>
          </div>
        </div>
        <Paper
          sx={{
            borderRadius: "40px",
            padding: "40px",
            boxShadow: "none",
          }}
        >
          <div className="flex flex-col gap-lg">
            <div className="flex flex-col gap-x3s">
              <Card
                sx={{ padding: "20px", bgcolor: "#F9FAFB", boxShadow: "none" }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-sm">
                    <div>
                      {/* <Dropzone onDrop={handleImageSelection}>
                        {({ getRootProps, getInputProps, isDragActive }) => (
                          <CircleContainer
                            {...getRootProps({
                              active: isDragActive,
                              className: "flex justify-center items-center",
                            })}
                          >
                            <input
                              {...getInputProps({ id: "file-upload-input" })}
                            />
                            {selectedImage ? (
                              <img src={selectedImage} alt="Uploaded" />
                            ) : (
                              <Icons.GalleryAdd />
                            )}
                          </CircleContainer>
                        )}
                      </Dropzone> */}
                      <CircleContainer
                        className="flex justify-center items-center"
                        sx={{ cursor: "default" }}
                      >
                        {selectedImage ? (
                          <img src={selectedImage} alt="Uploaded" />
                        ) : (
                          <Icons.GalleryAdd />
                        )}
                      </CircleContainer>
                    </div>
                    <div className="flex gap-sm items-center">
                      <div>
                        <Title fontWeight={600}>Sakurai Hiro</Title>
                        <CardText fontSize={"12px"} color={"#AEB2BA"}>
                          ID: 011/256
                        </CardText>
                        <CardText fontSize={"12px"} color={"#AEB2BA"}>
                          Дата добавления: 21.03.2024
                        </CardText>
                      </div>
                      <div>
                        <ButtonStyled
                          variant="contained"
                          color="purpleBlueLight"
                          sx={{ borderRadius: "20px", padding: "8px" }}
                        >
                          <InfoLine>
                            <Icons.Wallet style={{ color: "inherit" }} />
                            <CardText>
                              <NumericFormat
                                value={1212000}
                                displayType="text" // Set to "input" if you want an input field
                                thousandSeparator=" "
                              />{" "}
                              UZS
                            </CardText>
                          </InfoLine>
                        </ButtonStyled>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link
                      to={routes.CABINET + routes.STUDENTS + routes.NEW}
                      className="link"
                    >
                      <DialogButton
                        variant="contained"
                        color="purpleBlue"
                        // onClick={handleClickOpen}
                      >
                        <div className="flex items-center gap-x3s">
                          <Icons.PenNewSquare />
                          <span>Изменить</span>
                        </div>
                      </DialogButton>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
            <div className="flex flex-col gap-md">
              <div className="flex flex-col gap-xs2">
                <div className="flex gap-xs">
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
                          <Icons.Circle
                            width="6px"
                            height="6px"
                            color="#D1D5DB"
                          />
                        </div>

                        // <Divider orientation="vertical" flexItem />
                      )}
                    </>
                  ))}
                </div>
              </div>
              <Box minHeight="450px" height="max-content">
                {tabContents[activeTab]}
              </Box>
            </div>
          </div>
        </Paper>
      </Main>
    </Root>
  );
};

export default StudentProfile;
