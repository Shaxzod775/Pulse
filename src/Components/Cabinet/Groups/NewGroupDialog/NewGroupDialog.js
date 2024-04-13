import React, { useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  duration,
  keyframes,
  styled,
  textFieldClasses,
} from "@mui/material";
import {
  theme,
  Root,
  Title,
  TextFieldStyled,
  AutocompleteStyled,
  SelectStyled,
} from "../../CabinetStyles";
import { Icons } from "../../../../Assets/Icons/icons";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import useInput from "../../../../hooks/useInput";
import { createGroup } from "../Groups";
import Dropzone from "react-dropzone";

const rainbowCycle = keyframes`
  0% {
    border-color: hsl(0, 100%, 50%); /* Red */
  }
  14% {
    border-color: hsl(40, 100%, 50%); /* Orange */
  }
  28% {
    border-color: hsl(80, 100%, 50%); /* Yellow */
  }
  42% {
    border-color: hsl(120, 100%, 50%); /* Green */
  }
  57% {
    border-color: hsl(180, 100%, 50%); /* Cyan */
  }
  71% {
    border-color: hsl(240, 100%, 50%); /* Blue */
  }
  85% {
    border-color: hsl(300, 100%, 50%); /* Magenta */
  }
  100% {
    border-color: hsl(360, 100%, 50%); /* Back to Red */
  }
`;

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

const subjects = ["Front-end", "Back-end", "UI/UX", "Flutter", "IT English"];

const FormLabel = styled(Typography)(({ theme }) => ({
  padding: "0",
  color: theme.typography.color.darkBlue,
  fontSize: theme.typography.fontSize.xs,
  lineHeight: "normal",
  paddingBottom: "12px",
  fontWeight: "600",
}));

const AutocompleteField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "8px",
  },
}));

const SquareContainer = styled("div")(
  ({ theme, width, height = 160, bgColor = "#fff", active }) => ({
    width: width ? `${width}px` : "100%",
    height: `${height}px`,
    backgroundColor: bgColor,
    borderRadius: "37px",
    border: `${active ? "3px dashed #cccccc" : "1px solid #E5E7EB"}`,
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

const NewGroupDialog = ({
  open,
  handleClose,
  handleAddGroup,
  ...otherProps
}) => {
  const [name, changeName, resetName] = useInput("");
  const [subject, changeSubject, resetSubject] = useInput(null);
  const [room, changeRoom, resetRoom] = useInput(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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

  const handleUploadClick = () => {
    // Simulate file input click event
    const fileInput = document.getElementById("file-upload-input");
    fileInput.click();
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // id,
    // name,
    // subject,
    // startDate,
    // endDate,
    // thumbnail,
    const thumbnail = selectedImage;
    const newGroup = createGroup({
      name,
      subject,
      startDate: Date(2024, 1, 1),
      endDate: Date(2024, 1, 1),
      thumbnail,
    });
    handleAddGroup(newGroup);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (e) => handleSubmit(e),
      }}
      sx={{
        fontFamily: "Rubik",
        "& .MuiPaper-root.MuiDialog-paper": {
          borderRadius: `${theme.custom.spacing.sm}px`,
          maxWidth: "957px",
          width: "957px",
        },
        // "& *": {
        //   boxSizing: "border-box",
        // },
      }}
    >
      <Root sx={{ width: "100%" }}>
        <DialogContent
          sx={{
            fontFamily: "Rubik",
            padding: `${theme.custom.spacing.lg}px`,
            width: "100%",
          }}
        >
          <div className="flex flex-col gap-md">
            {/* MAIN CONTENT OF DIALOG */}
            <div className="flex flex-col gap-sm">
              <div className="full-width flex justify-between gap-sm">
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
                        <Icons.GalleryAdd />
                      )}
                    </SquareContainer>
                  )}
                </Dropzone>
                <div className="full-width flex flex-col">
                  <div className="full-width full-height">
                    <Title>Обложка группы</Title>
                    <Typography
                      color="#AEB2BA"
                      fontSize={".8rem"}
                      fontFamily={"Poppins, Rubik, Roboto, sans-serif"}
                    >
                      Мы рекомендуем изображения не менее 322 x 127px, вы можете
                      загрузить PNG или JPG размером менее 10 МБ
                    </Typography>
                  </div>
                  <div>
                    <DialogButton
                      onClick={handleUploadClick}
                      variant="contained"
                      color="purpleBlue"
                    >
                      Загрузить
                    </DialogButton>
                  </div>
                </div>
              </div>
              <div className="full-width flex gap-sm">
                <div className="flex flex-grow flex-col gap-sm">
                  <FormControl fullWidth variant="outlined">
                    <label htmlFor="name">
                      <FormLabel>Название группы*</FormLabel>
                    </label>
                    <TextFieldStyled id="name" variant="outlined" />
                  </FormControl>
                  <FormControl fullWidth variant="outlined">
                    <label htmlFor="subject">
                      <FormLabel>Выбрать предмет</FormLabel>
                    </label>
                    <AutocompleteStyled
                      options={subjects}
                      value={subject}
                      // onChange={handleTeacherChange}
                      renderInput={(params) => (
                        <AutocompleteField
                          {...params}
                          id="subject"
                          variant="outlined"
                        />
                      )}
                      popupIcon={
                        <Icons.ArrowD color={theme.typography.color.darkBlue} />
                      }
                      clearIcon={
                        <Icons.Delete color={theme.typography.color.darkBlue} />
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth variant="outlined">
                    <label htmlFor="teacher">
                      <FormLabel>Выбрать кабинет</FormLabel>
                    </label>
                    <AutocompleteStyled
                      options={["1", "2", "3", "4", "5", "6"]}
                      // value={"1"}
                      // onChange={handleTeacherChange}
                      renderInput={(params) => (
                        <AutocompleteField
                          {...params}
                          id="teacher"
                          variant="outlined"
                        />
                      )}
                      popupIcon={
                        <Icons.ArrowD color={theme.typography.color.darkBlue} />
                      }
                      clearIcon={
                        <Icons.Delete color={theme.typography.color.darkBlue} />
                      }
                    />
                  </FormControl>
                </div>
                <div className="flex flex-grow gap-sm">
                  <FormControl fullWidth variant="outlined">
                    <label htmlFor="date-start">
                      <FormLabel>Дата начала</FormLabel>
                    </label>
                    <TextFieldStyled
                      id="date-start"
                      variant="outlined"
                      type="date"
                      // value={
                      //   startDate ? startDate.toISOString().split("T")[0] : ""
                      // }
                      // onChange={handleStartDateChange}
                    />
                  </FormControl>
                  <FormControl fullWidth variant="outlined">
                    <label htmlFor="date-start">
                      <FormLabel>Дата завершения</FormLabel>
                    </label>
                    <TextFieldStyled
                      id="date-start"
                      variant="outlined"
                      type="date"
                      // value={
                      //   startDate ? startDate.toISOString().split("T")[0] : ""
                      // }
                      // onChange={handleStartDateChange}
                    />
                  </FormControl>
                </div>
              </div>
            </div>

            {/* DIALOG ACTIONS */}
            <div className="full-width flex justify-end">
              <div className="flex justify-between gap-xxs">
                <DialogButton
                  onClick={handleClose}
                  variant="outlined"
                  color="purpleBlue"
                >
                  Отмена
                </DialogButton>
                <DialogButton
                  type="submit"
                  variant="contained"
                  color="purpleBlue"
                >
                  Сохранить
                </DialogButton>
              </div>
            </div>
          </div>
        </DialogContent>
      </Root>
    </Dialog>
  );
};

export default NewGroupDialog;
