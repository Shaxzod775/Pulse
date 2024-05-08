import React, { useEffect, useMemo, useRef, useState } from "react";
import { ButtonStyled, Main, Root, Title, theme } from "../../CabinetStyles";
import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../../../../Assets/Icons/icons";
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
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
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      lineHeight: "150%",
      fontFamily: "Poppins, Rubik, sans-serif",
    }}
  >
    <Typography
      variant="subtitle2"
      sx={{ color: "#AEB2BA", letterSpacing: ".36px" }}
    >
      {title}
    </Typography>
    <Typography
      variant="body1"
      sx={{ color: "#1C0D64", letterSpacing: ".32px" }}
    >
      {children}
    </Typography>
  </Box>
);

const SkillChip = styled(Chip)(({ theme }) => ({
  borderRadius: "8px",
  padding: "6px 12px",
  "& .MuiChip-label": { padding: "0" },
}));

const TeacherProfile = () => {
  const navigate = useNavigate();
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

  const persoalInfo = useMemo(
    () => (
      <div className="flex flex-col gap-sm">
        <div className="flex items-center gap-xxs">
          <Icons.UserId color={theme.typography.color.purpleBlue} />
          <Typography fontSize="1.125rem" fontWeight={600}>
            Личная информация
          </Typography>
        </div>
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
                <InfoItem title="Фамилия Имя Отчество">
                  Koptleulov Arslan Almazovich
                </InfoItem>
                <InfoItem title="Номер телефона">
                  <Box className="flex items-center" columnGap="4px">
                    <Typography>+998 (33) 033-15-33</Typography>
                    <Box className="flex">
                      <Link to="sms:+998330331533" className="link">
                        <IconButton color="purpleBlue" sx={{ marginY: "-8px" }}>
                          <Icons.ChatRoundDots />
                        </IconButton>
                      </Link>
                      <Link to="tel:/+998330331533" className="link">
                        <IconButton color="purpleBlue" sx={{ marginY: "-8px" }}>
                          <Icons.Call />
                        </IconButton>
                      </Link>
                    </Box>
                  </Box>
                </InfoItem>
                <InfoItem title="Дополнительный номер">
                  <Box className="flex items-center" columnGap="4px">
                    <Typography>+998 (33) 033-15-33</Typography>
                    <Box className="flex">
                      <Link to="sms:+998330331533" className="link">
                        <IconButton color="purpleBlue" sx={{ marginY: "-8px" }}>
                          <Icons.ChatRoundDots />
                        </IconButton>
                      </Link>
                      <Link to="tel:/+998330331533" className="link">
                        <IconButton color="purpleBlue" sx={{ marginY: "-8px" }}>
                          <Icons.Call />
                        </IconButton>
                      </Link>
                    </Box>
                  </Box>
                </InfoItem>
                <InfoItem title="Почта">
                  <Box className="flex items-center" columnGap="4px">
                    <Typography>arslan.koptleulov@abexlab.com</Typography>
                    <Link
                      to="mailto:arslan.koptleulov@abexlab.com"
                      className="link"
                    >
                      <IconButton color="purpleBlue" sx={{ marginY: "-8px" }}>
                        <Icons.Messages />
                      </IconButton>
                    </Link>
                  </Box>
                </InfoItem>
                <Box className="flex" columnGap="18px">
                  <InfoItem title="Дата рождения">21.08.2002</InfoItem>
                  <InfoItem title="Пол">
                    <Box className="flex items-center" columnGap="4px">
                      Мужской
                      <Icons.MaleSymbol />
                    </Box>
                  </InfoItem>
                </Box>
              </Box>
              <Box className="flex flex-col" rowGap="14px">
                <InfoItem title="ID или Свидетельство о рождении">
                  AB 1234567
                </InfoItem>
                <InfoItem title="ID/Номер договора">
                  247325247325247325
                </InfoItem>
                <InfoItem title="ПИНФЛ">247325247325247325</InfoItem>
                <InfoItem title="Дата начала работы">21.07.2022</InfoItem>
                <InfoItem title="Вид контракта">ГПХ</InfoItem>
                <InfoItem title="Вид контракта">ГПХ</InfoItem>
                <InfoItem title="Теги">
                  <div className="flex gap-xxs2">
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
                  </div>
                </InfoItem>
                <InfoItem title="Роль">UX/UI Designer, Teacher</InfoItem>
                <InfoItem title="Адрес проживания">
                  Ташкент, Яшнабад, Тузель 1, кв 33
                </InfoItem>
                <InfoItem title="Активная группа">GR011-62</InfoItem>
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
              <Box className="flex flex-col" rowGap="14px">
                <InfoItem title="ИНПС">247325247325247325</InfoItem>
                <InfoItem title="ИНН">247325247325247325</InfoItem>
                <InfoItem title="Дополнительный номер">
                  <Box className="flex items-center" columnGap="4px">
                    <Typography>+998 (33) 033-15-33</Typography>
                    <Box className="flex">
                      <Link to="sms:+998330331533" className="link">
                        <IconButton color="purpleBlue" sx={{ marginY: "-8px" }}>
                          <Icons.ChatRoundDots />
                        </IconButton>
                      </Link>
                      <Link to="tel:/+998330331533" className="link">
                        <IconButton color="purpleBlue" sx={{ marginY: "-8px" }}>
                          <Icons.Call />
                        </IconButton>
                      </Link>
                    </Box>
                  </Box>
                </InfoItem>
                <InfoItem title="Почта">
                  <Box className="flex items-center" columnGap="4px">
                    <Typography>arslan.koptleulov@abexlab.com</Typography>
                    <Link
                      to="mailto:arslan.koptleulov@abexlab.com"
                      className="link"
                    >
                      <IconButton color="purpleBlue" sx={{ marginY: "-8px" }}>
                        <Icons.Messages />
                      </IconButton>
                    </Link>
                  </Box>
                </InfoItem>
                <Box className="flex" columnGap="18px">
                  <InfoItem title="Дата рождения">21.08.2002</InfoItem>
                  <InfoItem title="Пол">
                    <Box className="flex items-center" columnGap="4px">
                      Мужской
                      <Icons.MaleSymbol />
                    </Box>
                  </InfoItem>
                </Box>
              </Box>
              <Box className="flex flex-col" rowGap="14px">
                <InfoItem title="ID или Свидетельство о рождении">
                  AB 1234567
                </InfoItem>
                <InfoItem title="ID/Номер договора">
                  247325247325247325
                </InfoItem>
                <InfoItem title="ПИНФЛ">247325247325247325</InfoItem>
                <InfoItem title="Дата начала работы">21.07.2022</InfoItem>
                <InfoItem title="Вид контракта">ГПХ</InfoItem>
                <InfoItem title="Теги">
                  <div className="flex gap-xxs2">
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
                  </div>
                </InfoItem>
                <InfoItem title="Роль">UX/UI Designer, Teacher</InfoItem>
                <InfoItem title="Адрес проживания">
                  Ташкент, Яшнабад, Тузель 1, кв 33
                </InfoItem>
                <InfoItem title="Активная группа">GR011-62</InfoItem>
              </Box>
            </Box>
          </Card>
        </Box>
      </div>
    ),
    []
  );
  const emptyElement = <></>;
  const tabContents = useMemo(
    () => [persoalInfo, emptyElement, emptyElement, emptyElement],
    [persoalInfo]
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
              <div
                style={{
                  minHeight: "450px",
                  paddingRight: "20px",
                  paddingLeft: "20px",
                }}
              >
                {tabContents[activeTab]}
              </div>
            </div>
          </div>
        </Paper>
      </Main>
    </Root>
  );
};

export default TeacherProfile;
