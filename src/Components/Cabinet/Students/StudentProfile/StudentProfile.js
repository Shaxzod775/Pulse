import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ButtonStyled,
  Main,
  Root,
  Title,
  TypographyStyled,
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
  Paper,
  Typography,
  styled,
  IconButton,
  Box,
} from "@mui/material";
import * as routes from "../../../../Constants/routes";
import { NumericFormat } from "react-number-format";
import AttendanceCalendar from "./AttendanceCalendar/AttendanceCalendar";
import api from "../../../../Core/api";
import { formattedPhoneNumber } from "../../../../helpers/helpers";
import { format } from "date-fns";
import { genders } from "../../../../Constants/testData";

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

const InfoItem = ({ title, children }) => (
  <Box className="flex flex-col" rowGap="4px" lineHeight="150%">
    <Typography color="#AEB2BA" letterSpacing=".36px" fontSize="14px">
      {title}
    </Typography>
    <Typography color="#1C0D64" letterSpacing=".32px">
      {children}
    </Typography>
  </Box>
);

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
              <Typography>1 000 000 сўм</Typography>
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

export const StudentProfile = ({ handleDeleteStudent }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState(null);

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

  const deleteStudent = async () => {
    await handleDeleteStudent(id);
    navigate(routes.CABINET + routes.STUDENTS);
  };

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.get(`students/getById/${id}`);
        setStudent(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudent();
    console.log(student);
  }, [id]);

  const uniqueContacts = useMemo(() => {
    let unique = [];
    if (student && student.contacts) {
      student.contacts.forEach((contact) => {
        if (!unique.find((c) => c.id === contact.id)) {
          unique.push(contact);
        }
      });
    }
    return unique;
  }, [student]);

  const persoalInfoContent = useMemo(() => {
    if (!student) {
      return "Loading...";
    }
    return (
      <Box className="flex flex-col" rowGap="40px">
        <Box className="flex flex-col" rowGap="20px">
          <div className="flex items-center gap-xxs">
            <Icons.UserId color={theme.typography.color.purpleBlue} />
            <Typography fontSize="1.125rem" fontWeight={600}>
              Информация о пользователе
            </Typography>
          </div>
          <Box className="flex" columnGap="24px">
            <Card
              sx={{
                width: "100%",
                maxWidth: "calc(50% - 12px)",
                padding: "20px",
                borderRadius: "20px",
                bgcolor: "#F9FAFB",
                boxShadow: "none",
              }}
            >
              <Box className="flex justify-between">
                <Box className="flex flex-col" rowGap="14px">
                  <InfoItem title="Фамилия Имя Отчество">
                    {`${student.lastName} ${student.firstName} ${student.middleName}`}
                  </InfoItem>
                  <InfoItem title="Номер телефона">
                    <Box className="flex items-center" columnGap="4px">
                      <Typography>
                        {formattedPhoneNumber(student.phoneNumber)}
                      </Typography>
                      <Box className="flex">
                        <Link
                          to={`sms:${student.phoneNumber}`}
                          className="link"
                        >
                          <IconButton
                            color="purpleBlue"
                            sx={{ marginY: "-8px" }}
                          >
                            <Icons.ChatRoundDots />
                          </IconButton>
                        </Link>
                        <Link
                          to={`tel:/${student.phoneNumber}`}
                          className="link"
                        >
                          <IconButton
                            color="purpleBlue"
                            sx={{ marginY: "-8px" }}
                          >
                            <Icons.Call />
                          </IconButton>
                        </Link>
                      </Box>
                    </Box>
                  </InfoItem>
                  {student.secondPhoneNumber && (
                    <InfoItem title="Дополнительный номер">
                      <Box className="flex items-center" columnGap="4px">
                        <Typography>
                          {formattedPhoneNumber(student.secondPhoneNumber)}
                        </Typography>
                        <Box className="flex">
                          <Link
                            to={`sms:${student.secondPhoneNumber}`}
                            className="link"
                          >
                            <IconButton
                              color="purpleBlue"
                              sx={{ marginY: "-8px" }}
                            >
                              <Icons.ChatRoundDots />
                            </IconButton>
                          </Link>
                          <Link
                            to={`tel:/${student.secondPhoneNumber}`}
                            className="link"
                          >
                            <IconButton
                              color="purpleBlue"
                              sx={{ marginY: "-8px" }}
                            >
                              <Icons.Call />
                            </IconButton>
                          </Link>
                        </Box>
                      </Box>
                    </InfoItem>
                  )}
                  <InfoItem title="E-mail">
                    <Box className="flex items-center" columnGap="4px">
                      <Typography>{student.email}</Typography>
                      <Link to={`mailto:${student.email}`} className="link">
                        <IconButton color="purpleBlue" sx={{ marginY: "-8px" }}>
                          <Icons.Messages />
                        </IconButton>
                      </Link>
                    </Box>
                  </InfoItem>
                  <Box className="flex" columnGap="18px">
                    <InfoItem title="Дата рождения">
                      {format(new Date(student.dateOfBirth), "dd.MM.yyyy")}
                    </InfoItem>
                    <InfoItem title="Пол">
                      <Box className="flex items-center" columnGap="4px">
                        {genders[student.gender].ru}
                        <Icons.MaleSymbol />
                      </Box>
                    </InfoItem>
                  </Box>
                </Box>
                <Box className="flex flex-col" rowGap="14px">
                  <InfoItem title="ID или Свидетельство о рождении">
                    {`${student.passportSeries} ${student.passportNumber}`}
                  </InfoItem>
                  <Box className="flex flex-col" rowGap="10px">
                    <TypographyStyled
                      colorFromTheme="purpleBlue"
                      fontWeight={600}
                    >
                      Телефоны родителей
                    </TypographyStyled>
                    {uniqueContacts.length === 0 ? (
                      <TypographyStyled>Н/Д</TypographyStyled>
                    ) : (
                      uniqueContacts.map((parentContact) => (
                        <InfoItem
                          title="Фамилия Имя Очество Родителя"
                          key={parentContact.id}
                        >
                          <Typography>{parentContact.name}</Typography>
                          <Box className="flex items-center" columnGap="4px">
                            <Typography>
                              {formattedPhoneNumber(parentContact.phoneNumber)}
                            </Typography>
                            <Box className="flex">
                              <Link
                                to={`sms:${parentContact.phoneNumber}`}
                                className="link"
                              >
                                <IconButton
                                  color="purpleBlue"
                                  sx={{ marginY: "-8px" }}
                                >
                                  <Icons.ChatRoundDots />
                                </IconButton>
                              </Link>
                              <Link
                                to={`tel:/${parentContact.phoneNumber}`}
                                className="link"
                              >
                                <IconButton
                                  color="purpleBlue"
                                  sx={{ marginY: "-8px" }}
                                >
                                  <Icons.Call />
                                </IconButton>
                              </Link>
                            </Box>
                          </Box>
                        </InfoItem>
                      ))
                    )}
                  </Box>
                </Box>
              </Box>
            </Card>
            <Card
              sx={{
                width: "100%",
                maxWidth: "calc(50% - 12px)",
                padding: "20px",
                borderRadius: "20px",
                bgcolor: "#F9FAFB",
                boxShadow: "none",
                "& > *": { maxWidth: "calc(50% - 10px)" },
              }}
            >
              <Box className="flex justify-between">
                <Box className="flex flex-col" rowGap="14px">
                  <InfoItem title="Теги">
                    <Box display="flex" columnGap="8px">
                      {student.tags.map((tag, i) => (
                        <SkillChip
                          label={tag}
                          variant="outlined"
                          color="blue"
                          key={i}
                        />
                      ))}
                    </Box>
                  </InfoItem>
                  <InfoItem title="Адрес проживания">
                    {`${student.address.region}, ${student.address.state}, ${student.address.location}`}
                  </InfoItem>
                  <InfoItem title="Активная группа">GR011-62</InfoItem>
                  <InfoItem title="Описание">{student.description}</InfoItem>
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>
        <Box className="flex flex-col" rowGap="20px">
          <div className="flex items-center gap-xxs">
            <Icons.Wallet color={theme.typography.color.purpleBlue} />
            <Title fontSize="1.125rem" fontWeight={600}>
              Платежи
            </Title>
          </div>
          <Paper
            sx={{
              borderRadius: "20px",
              padding: "14px",
              boxShadow: "none",
              border: "1px solid #E5E7EB",
              backgroundColor: "#F9FAFB",
              width: "100%",
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
                  {[1, 2].map((i) => (
                    <PaymentPaper>
                      <div className="flex justify-between">
                        <div className="flex gap-lg items-start">
                          <PaymentInfoLine>
                            <Icons.CalendarAdd />
                            <span>20.02.2024</span>
                          </PaymentInfoLine>
                          <PaymentInfoLine>
                            <Icons.Bill />
                            <span>1 000 000 сўм</span>
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
                          <Icons.Pen2 />
                          <TypographyStyled colorFromTheme="redError">
                            <Icons.TrashCan width="24px" height="24px" />
                          </TypographyStyled>
                        </div>
                      </div>
                    </PaymentPaper>
                  ))}
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
        </Box>
      </Box>
    );
  }, [student]);

  const groupsContent = useMemo(() => {
    if (!student) {
      return "Loading...";
    }
    return (
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
    );
  }, [student]);

  const attendanceContent = useMemo(() => {
    if (!student) {
      return "Loading...";
    }

    return (
      <>
        <Box>
          <Box maxWidth="60%">
            <AttendanceCalendar />
          </Box>
        </Box>
      </>
    );
  }, [student]);

  const callsHistoryContent = useMemo(() => {
    if (!student) {
      return "Loading...";
    }
    return (
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
    );
  }, [student]);

  const smsHistoryContent = useMemo(() => {
    if (!student) {
      return "Loading...";
    }
    return (
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
    );
  }, [student]);

  const changeHistoryContent = useMemo(() => {
    if (!student) {
      return "Loading...";
    }
    return (
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
    );
  }, [student]);

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
    [
      persoalInfoContent,
      groupsContent,
      attendanceContent,
      callsHistoryContent,
      smsHistoryContent,
      changeHistoryContent,
    ]
  );

  if (!student) {
    return "Loading...";
  }
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
                onClick={deleteStudent}
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
                        <Title
                          fontWeight={600}
                        >{`${student.lastName} ${student.firstName}`}</Title>
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
                              сўм
                            </CardText>
                          </InfoLine>
                        </ButtonStyled>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link
                      to={
                        routes.CABINET +
                        routes.STUDENTS +
                        routes.getEditPath(student.id)
                      }
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
