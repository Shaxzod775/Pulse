import React, { useState } from "react";
import { ButtonStyled, Main, Root, Title, theme } from "../../Cabinet";
import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../../../../Assets/Icons/icons";
import {
  Button,
  Card,
  InputBase,
  Paper,
  Typography,
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

const TeacherProfile = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

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
          sx={{ borderRadius: "20px", padding: "16px", boxShadow: "none" }}
        >
          <div className="flex flex-col gap-sm">
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
                      <Title>Sakurai Hiro</Title>
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
            <div>2</div>
          </div>
        </Paper>
      </Main>
    </Root>
  );
};

export default TeacherProfile;
