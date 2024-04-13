import React, { useEffect, useMemo, useRef, useState } from "react";
import { ButtonStyled, Main, Root, Title, theme } from "../../CabinetStyles";
import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../../../../Assets/Icons/icons";
import {
  Button,
  Card,
  Chip,
  Divider,
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

const DialogButton = styled(Button)(({ theme }) => ({
  minWidth: "150px",
  borderRadius: theme.custom.spacing.xxs,
  padding: theme.custom.spacing.xxs,
  font: "inherit",
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.fontSize.sm,
  textTransform: "capitalize",
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
  ({ theme, width, height = 110, bgColor = "#f0f0f0" }) => ({
    width: `${width ? width : 110}px`,
    height: `${height}px`,
    backgroundColor: bgColor,
    borderRadius: `50%`,
    border: "6px solid #FFF",
    overflow: "hidden",

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
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  borderRadius: "8px",
  padding: "6px 12px",
  "& .MuiChip-label": { padding: "0" },
}));

const TeacherProfile = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const tabsToMap = ["Личная информация", "Группы", "Активность", "Зарплата"];

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
      <div className="flex flex-col gap-sm" style={{ paddingLeft: "20px" }}>
        <div className="flex items-center gap-xxs">
          <Icons.UserId color={theme.typography.color.purpleBlue} />
          <Title fontSize="1.125rem" fontWeight={600}>
            Информация пользователя
          </Title>
        </div>

        <div className="flex gap-lg">
          <div className="flex flex-col gap-xs">
            <InfoItem>
              <h5>Фамилия Имя Очество</h5>
              <span>Коптлеулов Арслан Алмазович</span>
            </InfoItem>
            <InfoItem>
              <h5>Номер телефона</h5>
              <span>+998(33) 033-15-33</span>
            </InfoItem>
            <InfoItem>
              <h5>Дата рождения:</h5>
              <span>21.08.2002</span>
            </InfoItem>
            <InfoItem>
              <h5>Почта:</h5>
              <span>arslan.koptleulov@abexlab.com</span>
            </InfoItem>
            <InfoItem>
              <h5>Паспортные данные:</h5>
              <span>AB 247325</span>
            </InfoItem>
          </div>
          <div className="flex flex-col gap-xs">
            <InfoItem>
              <h5>Скиллы</h5>
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
            <InfoItem>
              <h5>Роль</h5>
              <span>UX/UI Designer, Teacher</span>
            </InfoItem>
            <InfoItem>
              <h5>Адрес проживания:</h5>
              <span>Ташкент, Яшнабад, Тузель 1, кв 33</span>
            </InfoItem>
            <InfoItem>
              <h5>Активная группа:</h5>
              <span>GR011-62</span>
            </InfoItem>
          </div>
        </div>
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
            <Title>Профиль учителя</Title>
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
                  <span>удалить учителя</span>
                </div>
              </DialogButton>
            </Link>
          </div>
        </div>
        <Paper
          sx={{
            borderRadius: "20px",
            padding: "16px",
            boxShadow: "none",
          }}
        >
          <div className="flex flex-col gap-md">
            <div className="flex flex-col gap-x3s">
              <div>
                <Dropzone onDrop={handleImageSelection}>
                  {({ getRootProps, getInputProps, isDragActive }) => (
                    <SquareContainer
                      {...getRootProps({
                        active: isDragActive,
                        className: "flex justify-center items-center",
                      })}
                    >
                      <input {...getInputProps({ id: "file-upload-input" })} />
                      {selectedImage ? (
                        <img src={selectedImage} alt="Uploaded" />
                      ) : (
                        <div
                          className="flex flex-col gap-x3s items-center"
                          style={{ color: "#fff" }}
                        >
                          <Icons.ArrowDCircleContained />
                          <Typography>Add a Banner Image</Typography>
                          <Typography fontSize={"13px"} fontWeight={700}>
                            Optimal dimensions 1200 x 600px
                          </Typography>
                        </div>
                      )}
                    </SquareContainer>
                  )}
                </Dropzone>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-sm" style={{ paddingLeft: "57px" }}>
                  <div>
                    <CircleContainer
                      className="flex justify-center items-center"
                      style={{ marginTop: "-40%" }}
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
                        id: 011/256
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
                      <span>изменить</span>
                    </div>
                  </DialogButton>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-md">
              <div className="flex flex-col" style={{ gap: "12px" }}>
                <div className="flex gap-xs" style={{ paddingLeft: "20px" }}>
                  {tabsToMap.map((tab, i) => (
                    <>
                      <ProfileTabHeader
                        active={activeTab === i}
                        onClick={() => setActiveTab(i)}
                        key={i}
                      >
                        {tab}
                      </ProfileTabHeader>
                      {i < tabsToMap.length - 1 && (
                        <Divider orientation="vertical" flexItem />
                      )}
                    </>
                  ))}
                </div>
                <Divider flexItem sx={{ borderBottomWidth: "2px" }} />
              </div>
              <div style={{ minHeight: "450px" }}>{tabContents[activeTab]}</div>
            </div>
          </div>
        </Paper>
      </Main>
    </Root>
  );
};

export default TeacherProfile;
