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
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  ThemeProvider,
  Typography,
  keyframes,
  styled,
} from "@mui/material";
import * as routes from "../../../../Constants/routes";
import Dropzone from "react-dropzone";
import { NumericFormat } from "react-number-format";
import {
  formattedPhoneNumber,
  getSocialIconByName,
} from "../../../../helpers/helpers";
import { genders, socialMediaTypes } from "../../../../Constants/testData";
import { GroupsCard } from "../../Students/StudentProfile/StudentProfile";
import api from "../../../../Core/api";
import { format } from "date-fns";

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
    variant === "contained" ? `1px solid ${theme.palette[color].main}` : "",
  padding: "10px 30px",
  font: "inherit",
  fontWeight: "400",
  "&:first-letter": { textTransform: "capitalize" },
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
  ({ theme, width, height = 116, bgColor = "#F9FAFB" }) => ({
    width: `${width ? width : 116}px`,
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

// const InfoItem = styled("div")(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   gap: "8px",
//   lineHeight: "150%",
//   fontFamily: "Poppins, Rubik, sans-serif",
//   "& > h5": {
//     margin: "0",
//     color: "#AEB2BA",
//     fontSize: "0.875rem",
//     fontWeight: "500",
//     letterSpacing: ".36px",
//   },
//   "& > span": {
//     color: "#1C0D64",
//     fontSize: "1rem",
//     letterSpacing: ".32px",
//   },
// }));

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

const SocialLinkItem = ({ name, username }) => {
  const IconComponent = getSocialIconByName(name);

  return (
    <Box className="flex flex-col" rowGap="6px">
      <Typography color="#6B7280" letterSpacing=".36px">
        {name}
      </Typography>
      <Box
        className="flex items-center"
        columnGap="12px"
        padding="9px 18px"
        bgcolor="#fff"
        border="1px solid #E9EAF0"
        borderRadius="8px"
      >
        <IconComponent color={theme.typography.color.purpleBlue} />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ minHeight: "32px", bgcolor: "#E9EAF0" }}
        />
        <Typography fontWeight="400" color="#8C94A3" letterSpacing="0.32px">
          {username}
        </Typography>
      </Box>
    </Box>
  );
};

const SkillChip = styled(Chip)(({ theme }) => ({
  borderRadius: "8px",
  padding: "6px 12px",
  "& .MuiChip-label": { padding: "0" },
}));

const TeacherProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const tabsToMap = [
    "Информация о пользователе",
    "Группы",
    "Активность",
    "Зарплата",
  ];

  const handleImageSelection = (acceptedFiles) => {
    // Assuming acceptedFiles is an array containing file objects
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]; // Get the first file
      if (file && file.type.startsWith("image/")) {
        // Check if it's an image
        const reader = new FileReader();
        reader.onload = (event) => {
          setSelectedImage(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        console.error("Please upload an image file.");
      }
    }
  };

  const goBack = () => {
    navigate(-1); // This navigates one step back in history
  };

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await api.get(`teachers/getById/${id}`);
        setTeacher(response.data);
      } catch (error) {
        console.error("Error fetching teacher:", error);
      }
    };

    fetchTeacher();
    console.log(teacher);
  }, [id]);

  const userInfo = useMemo(() => {
    if (!teacher) {
      return "Loading...";
    }
    return (
      <>
        <Box className="flex flex-col" rowGap="37px">
          <Box className="flex flex-col" rowGap="20px">
            <Box className="flex items-center" columnGap="10px">
              <Icons.UserId color={theme.typography.color.purpleBlue} />
              <Typography fontSize="1.125rem" fontWeight={600}>
                Личная информация
              </Typography>
            </Box>
            <Box display="flex" columnGap="24px">
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
                    <InfoItem title="Фамилия Имя Отчество">{`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}</InfoItem>
                    <InfoItem title="Номер телефона">
                      <Box className="flex items-center" columnGap="4px">
                        <Typography>
                          {formattedPhoneNumber(teacher.phoneNumber)}
                        </Typography>
                        <Box className="flex">
                          <Link
                            to={`sms:${teacher.phoneNumber}`}
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
                            to={`tel:/${teacher.phoneNumber}`}
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
                    {teacher.secondPhoneNumber && (
                      <InfoItem title="Дополнительный номер">
                        <Box className="flex items-center" columnGap="4px">
                          <Typography>
                            {formattedPhoneNumber(teacher.secondPhoneNumber)}
                          </Typography>
                          <Box className="flex">
                            <Link
                              to={`sms:${teacher.secondPhoneNumber}`}
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
                              to={`tel:/${teacher.secondPhoneNumber}`}
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
                        <Typography>{teacher.email}</Typography>
                        <Link to={`mailto:${teacher.email}`} className="link">
                          <IconButton
                            color="purpleBlue"
                            sx={{ marginY: "-8px" }}
                          >
                            <Icons.Messages />
                          </IconButton>
                        </Link>
                      </Box>
                    </InfoItem>
                    {teacher.corporateEmail && (
                      <InfoItem title="E-mail (корпоративный)">
                        <Box className="flex items-center" columnGap="4px">
                          <Typography>{teacher.corporateEmail}</Typography>
                          <Link
                            to={`mailto:${teacher.corporateEmail}`}
                            className="link"
                          >
                            <IconButton
                              color="purpleBlue"
                              sx={{ marginY: "-8px" }}
                            >
                              <Icons.Messages />
                            </IconButton>
                          </Link>
                        </Box>
                      </InfoItem>
                    )}
                    <Box className="flex" columnGap="18px">
                      <InfoItem title="Дата рождения">
                        {format(new Date(teacher.dateOfBirth), "dd.MM.yyyy")}
                      </InfoItem>
                      <InfoItem title="Пол">
                        <Box className="flex items-center" columnGap="4px">
                          {genders[teacher.gender].ru}
                          <Icons.MaleSymbol />
                        </Box>
                      </InfoItem>
                    </Box>
                  </Box>
                  <Box className="flex flex-col" rowGap="14px">
                    <InfoItem title="ID или Свидетельство о рождении">
                      {`${teacher.passportSeries} ${teacher.passportNumber}`}
                    </InfoItem>
                    <InfoItem title="ID/Номер договора">
                      247325247325247325
                    </InfoItem>
                    <InfoItem title="ПИНФЛ">{teacher.pnfl}</InfoItem>
                    <InfoItem title="Дата начала работы">21.07.2022</InfoItem>
                    <InfoItem title="Вид контракта">ГПХ</InfoItem>
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
                }}
              >
                <Box className="flex justify-between">
                  <Box className="flex flex-col" rowGap="14px" maxWidth="50%">
                    <InfoItem title="ИНПС">{teacher.inps}</InfoItem>
                    <InfoItem title="ИНН">{teacher.inn}</InfoItem>
                    <InfoItem title="Скиллы">
                      <Box className="flex" columnGap="8px">
                        <SkillChip
                          label={"Frontend"}
                          variant="outlined"
                          color="purpleBlue"
                        />
                        <SkillChip
                          label={"UX/UX"}
                          variant="outlined"
                          color="purpleBlue"
                        />
                      </Box>
                    </InfoItem>
                    <InfoItem title="Направление">UX/UI</InfoItem>
                    <InfoItem title="Роль">Teacher</InfoItem>
                  </Box>
                  <Box className="flex flex-col" rowGap="14px" maxWidth="50%">
                    <InfoItem title="Адрес проживания">
                      {`${teacher.address.region}, ${teacher.address.state}, ${teacher.address.location}`}
                    </InfoItem>
                    <InfoItem title="Активная группа">GR011-62 </InfoItem>
                    <InfoItem title="Должность">Mentor</InfoItem>
                    <InfoItem title="Филиал">IT Park Tashkent</InfoItem>
                    <InfoItem title="Теги">
                      <Box className="flex" columnGap="8px">
                        {teacher.tags.map((tag, i) => (
                          <SkillChip
                            label={tag}
                            variant="outlined"
                            color="blue"
                            key={i}
                          />
                        ))}
                      </Box>
                    </InfoItem>
                    <InfoItem title="Описание">{teacher.description}</InfoItem>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Box>
          <Box className="flex flex-col" rowGap="20px">
            <Box className="flex items-center" columnGap="10px">
              <Icons.Feed color={theme.typography.color.purpleBlue} />
              <Typography fontSize="1.125rem" fontWeight={600}>
                Социальная информация
              </Typography>
            </Box>
            <Card
              sx={{
                width: "100%",
                padding: "20px",
                borderRadius: "20px",
                bgcolor: "#F9FAFB",
                boxShadow: "none",
              }}
            >
              <Grid container spacing={2}>
                {socialMediaTypes.map((socialMediaType, index) => (
                  <Grid item xs={12} sm={4}>
                    <SocialLinkItem
                      name={socialMediaType}
                      username="Username"
                    />
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Box>
        </Box>
      </>
    );
  }, [teacher]);

  const groupsContent = useMemo(() => {
    if (!teacher) {
      return "Loading...";
    }
    return (
      <>
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
      </>
    );
  }, [teacher]);

  const activityContent = useMemo(() => {
    if (!teacher) {
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
              Активность
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
                    Добавлено
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
                    <Icons.CheckCircleBoldDuotone
                      width="34px"
                      height="34px"
                      color={theme.typography.color.purpleBlue}
                    />
                    <TypographyStyled small>
                      Добавлены ссылки для портфолио
                    </TypographyStyled>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </>
    );
  }, [teacher]);

  const emptyElement = <></>;
  const tabContents = useMemo(
    () => [userInfo, groupsContent, activityContent, emptyElement],
    [userInfo, groupsContent, activityContent, emptyElement]
  );
  if (!teacher) {
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
              <Title>Профиль учителя</Title>
              <div className="flex items-center gap-x3s">
                <Link to={routes.CABINET + routes.TEACHERS} className="link">
                  <Typography fontSize="0.75rem">Учителя</Typography>
                </Link>
                <Icons.ArrowL
                  width="1rem"
                  style={{ transform: "rotate(180deg)" }}
                />
                <Typography fontSize="0.75rem">Профиль учителя</Typography>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-sm">
            <Link
              to={routes.CABINET + routes.TEACHERS + routes.NEW}
              className="link"
            >
              <DialogButton
                variant="outlined"
                color="crimson"
                // onClick={handleClickOpen}
              >
                <div className="flex items-center gap-x3s">
                  <span>Удалить учителя</span>
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
          <div className="flex flex-col gap-md">
            <div className="flex flex-col gap-x3s">
              <Card
                sx={{ padding: "20px", bgcolor: "#F9FAFB", boxShadow: "none" }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-sm">
                    <div>
                      <Dropzone onDrop={handleImageSelection}>
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
                      </Dropzone>
                    </div>
                    <div className="flex gap-sm items-center">
                      <div>
                        <Title
                          fontWeight={600}
                        >{`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}</Title>
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
                  </div>
                </div>
              </Card>
            </div>
            <div className="flex flex-col gap-md">
              <div className="flex flex-col" style={{ gap: "12px" }}>
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

export default TeacherProfile;
