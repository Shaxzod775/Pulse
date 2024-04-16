import React, { useState } from "react";
import {
  Box,
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
  letterSpacing: "0.32px",
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

function TagCheckbox({
  children,
  selected,
  setSelected,
  variant,
  ...otherProps
}) {
  //I will just seperate variant from other props so it does't interfere with dynamic variant
  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <Button
      variant={selected ? "contained" : "outlined"}
      onClick={handleClick}
      sx={{
        boxSizing: "border-box",
        boxShadow: "none",
        "&:hover": { boxShadow: "none" },
        minWidth: "44px",
        minWidth: "44px",
        padding: "10px",
        lineHeight: "inherit",
        border: `${
          selected ? `1px solid ${theme.palette[otherProps.color].main}` : ""
        }`,
        borderRadius: "10px",
        textTransform: "none",
        fontSize: "1rem",
      }}
      {...otherProps}
    >
      <Box
        sx={{
          aspectRatio: 1,
          lineHeight: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </Button>
  );
}

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

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
  const [selectedWeekDays, setSelectedWeekDays] = useState(
    weekDays.map(() => false)
  );
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

  // Function to handle change in start date
  const handleStartDateChange = (event) => {
    const inputDate = event.target.value;
    const newStartDate = new Date(inputDate);
    if (!isNaN(newStartDate.getTime())) {
      setStartDate(newStartDate);
    } else {
      // Handle invalid input date here
      setStartDate(null);
    }
  };
  // Function to handle change in start date
  const handleEndDateChange = (event) => {
    const inputDate = event.target.value;
    const newEndDate = new Date(inputDate);
    if (!isNaN(newEndDate.getTime())) {
      setEndDate(newEndDate);
    } else {
      // Handle invalid input date here
      setEndDate(null);
    }
  };

  // Function to handle selecting week days
  const handleSelectWeekDays = (index) => {
    const updatedSelectedWeekDays = [...selectedWeekDays];
    updatedSelectedWeekDays[index] = !updatedSelectedWeekDays[index];
    setSelectedWeekDays(updatedSelectedWeekDays);
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
      startDate,
      endDate,
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
          maxWidth: "924px",
          width: "924px",
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
              <div className="full-width flex justify-between gap-sm">
                <div className="flex flex-col gap-sm" style={{ width: "40%" }}>
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
                <div className="flex flex-col gap-sm" style={{ width: "60%" }}>
                  <div className="flex gap-sm">
                    <FormControl fullWidth variant="outlined">
                      <label htmlFor="date-start">
                        <FormLabel>Дата начала</FormLabel>
                      </label>
                      <TextFieldStyled
                        id="date-start"
                        variant="outlined"
                        type="date"
                        value={
                          startDate ? startDate.toISOString().split("T")[0] : ""
                        }
                        onChange={handleStartDateChange}
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
                        value={
                          endDate ? endDate.toISOString().split("T")[0] : ""
                        }
                        onChange={handleEndDateChange}
                      />
                    </FormControl>
                  </div>

                  <div>
                    <label htmlFor="week-days">
                      <FormLabel>Дни недели:</FormLabel>
                    </label>
                    <div className="flex gap-xxs">
                      {weekDays.map((weekDay, i) => (
                        <TagCheckbox
                          key={i}
                          color="purpleBlue"
                          selected={selectedWeekDays[i]}
                          onClick={() => handleSelectWeekDays(i)}
                        >
                          {weekDay}
                        </TagCheckbox>
                      ))}
                    </div>
                  </div>
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
