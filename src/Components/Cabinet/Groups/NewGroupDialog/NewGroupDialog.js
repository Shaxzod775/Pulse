import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  FormControl,
  InputAdornment,
  InputBase,
  MenuItem,
  OutlinedInput,
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
  AutocompleteField,
  textFieldStyles,
  FormLabelStyled,
} from "../../CabinetStyles";
import { Icons } from "../../../../Assets/Icons/icons";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import useInput from "../../../../hooks/useInput";
import { createGroup } from "../Groups";
import Dropzone from "react-dropzone";
import { calculateMonthDifference } from "../../../../helpers/helpers";
import { useCourses } from "../../../../contexts/Courses.context";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ru } from "date-fns/locale";
import { russianLocale, weekDaysText } from "../../../../Constants/dateLocales";
import { teacherNames } from "../../../../Constants/testData";

import api from "../../../../Core/api";

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

const timeInputStyles = {
  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    textAlign: "center",
    fontWeight: "500",
    height: "100%",
    width: "100%",
    "::placeholder": { color: "#D1D5DB", opacity: "1" },
  },
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "& input[type=number]": {
    "-moz-appearance": "textfield",
  },
};

const DialogButton = styled(Button)(({ theme, variant, color }) => ({
  minHeight: "44px",
  minWidth: "150px",
  borderRadius: theme.custom.spacing.xxs,
  border:
    variant === "contained" ? `1px solid ${theme.palette[color].main}` : "",
  padding: "10px 30px",
  font: "inherit",
  fontWeight: "400",
  textTransform: "none",
  boxShadow: "none",
  "&:hover": { boxShadow: "none" },
}));

const FormLabel = styled(Typography)(({ theme }) => ({
  padding: "0",
  color: theme.typography.color.darkBlue,
  fontSize: theme.typography.fontSize.xs,
  lineHeight: "normal",
  paddingBottom: "12px",
  letterSpacing: "0.32px",
  fontWeight: "600",
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
        minWidth: "50px",
        minHeight: "50px",
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
const subjects = ["Frontend", "Backend", "UI/UX", "Flutter", "IT English"];
const NewGroupDialog = ({
  open,
  handleAddGroup,
  handleClose,
  ...otherProps
}) => {
  const { courses, findCourseByName, allCourseNames } = useCourses();

  const [selectedImage, setSelectedImage] = useState(null);

  const [name, changeName, resetName] = useInput("");

  const [selectedCourseName, changeSelectedCourseName] = useInput(null);

  const [teacher, changeTeacher, resetTeacher] = useInput(null);

  const [room, changeRoom, resetRoom] = useInput(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [selectedWeekDays, setSelectedWeekDays] = useState(
    weekDaysText.map(() => false)
  );

  const [hoursNumber, setHoursNumber] = useState("");
  const [minutesNumber, setMinutesNumber] = useState("");
  const [endHoursNumber, setEndHoursNumber] = useState("");
  const [endMinutesNumber, setEndMinutesNumber] = useState("");

  const [description, changeDescription] = useInput("");

  const [tags, setTags] = useState(["Тег 1", "Тег 2", "Тег 3"]);
  const [tagFormOpen, setTagFormOpen] = useState(false);

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

  // Function to handle change in subject selection
  const handleCourseChange = (event, newValue) => {
    changeSelectedCourseName({ target: { value: newValue } });
    // Find the selected course by its name
    const selectedCourse = findCourseByName(newValue);
    if (startDate && selectedCourse) {
      // Add the duration as months to the start date to calculate the end date
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + selectedCourse.duration);
      setEndDate(endDate);
    }
  };

  // Function to handle change in teacher selection
  const handleTeacherChange = (event, newValue) => {
    changeTeacher({ target: { value: newValue } });
  };

  // Function to handle change in room selection
  const handleRoomChange = (event, newValue) => {
    changeRoom({ target: { value: newValue } });
  };

  // Function to handle change in start date
  const handleStartDateChange = (newStartDate) => {
    if (newStartDate instanceof Date && !isNaN(newStartDate)) {
      setStartDate(newStartDate);

      // Find the selected course by its name
      const selectedCourse = findCourseByName(selectedCourseName);
      if (selectedCourse) {
        // Add the duration as months to the start date to calculate the end date
        const endDate = new Date(newStartDate);
        endDate.setMonth(newStartDate.getMonth() + selectedCourse.duration);
        setEndDate(endDate);
      }
    } else {
      // Handle invalid input date here
      setStartDate(null);
    }
  };

  // Function to handle change in end date
  const handleEndDateChange = (newEndDate) => {
    if (newEndDate instanceof Date && !isNaN(newEndDate)) {
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

  // Function to handle change in hours
  const handleHoursChange = (setter) => (event) => {
    let inputValue = parseInt(event.target.value, 10);

    // Ensure the value is between 0 and 23
    if (isNaN(inputValue) || inputValue < 0) inputValue = 0;
    if (inputValue > 23) inputValue = 23;

    // Add leading zero for numbers less than 10
    if (inputValue >= 0 && inputValue < 10) {
      inputValue = `0${inputValue}`;
    } else {
      inputValue = `${inputValue}`;
    }

    setter(inputValue);
  };

  // Function to handle change in minutes
  const handleMinutesChange = (setter) => (event) => {
    let inputValue = parseInt(event.target.value, 10);

    // Ensure the value is between 0 and 59
    if (isNaN(inputValue) || inputValue < 0) inputValue = 0;
    if (inputValue > 59) inputValue = 59;

    // Add leading zero for numbers less than 10
    if (inputValue >= 0 && inputValue < 10) {
      inputValue = `0${inputValue}`;
    } else {
      inputValue = `${inputValue}`;
    }

    setter(inputValue);
  };

  // Function to handle adding a new tag
  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  // Function to handle deletion of a tag
  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const weekDays = selectedWeekDays.reduce((acc, val, index) => {
      if (val) {
        acc.push(index);
      }
      return acc;
    }, []);
    const duration = calculateMonthDifference(startDate, endDate);
    const startDateISO = new Date(
      startDate.getTime() - startDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];
    const endDateISO = new Date(
      endDate.getTime() - endDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    const groupData = {
      name: name,
      startDate: startDateISO,
      endDate: endDateISO,
      roomNumber: room,
      courseTime: "14:00",
      classDays: weekDays,
      courseId: "8c9b891e-6de2-4d41-959f-f3afc33fcf79",
      teacherId: "c43a2788-f292-400f-916e-6aafc6204373",
    };
    console.log(groupData);

    await handleAddGroup(groupData);

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
            padding: `${theme.custom.spacing.lg}px`,
            width: "100%",
          }}
        >
          <div className="flex flex-col gap-lg">
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
                    <Title fontSize="1.375rem" letterSpacing="0.32px">
                      Обложка группы
                    </Title>
                    <Typography
                      color="#AEB2BA"
                      fontSize={".8rem"}
                      fontFamily={"Poppins, Rubik, Roboto, sans-serif"}
                    >
                      Мы рекомендуем изображения не менее 322x127px, вы можете
                      загрузить PNG или JPG размером не более 10 МБ
                    </Typography>
                  </div>
                  <div className="flex gap-xxs">
                    <DialogButton
                      onClick={handleUploadClick}
                      variant="contained"
                      color="purpleBlue"
                    >
                      {selectedImage ? "Изменить" : "Загрузить"}
                    </DialogButton>
                    {selectedImage && (
                      <DialogButton
                        onClick={() => setSelectedImage()}
                        variant="outlined"
                        color="purpleBlue"
                      >
                        Удалить обложку
                      </DialogButton>
                    )}
                  </div>
                </div>
              </div>
              <div className="full-width flex justify-between gap-sm">
                <Box
                  className="flex flex-col"
                  rowGap="20px"
                  style={{ width: "50%" }}
                >
                  <FormControl required fullWidth variant="outlined">
                    <FormLabelStyled>Название группы</FormLabelStyled>
                    <TextFieldStyled
                      required
                      id="name"
                      variant="outlined"
                      placeholder="Название"
                      value={name}
                      onChange={changeName}
                    />
                  </FormControl>
                  <div className="flex gap-sm">
                    <FormControl required fullWidth variant="outlined">
                      <FormLabelStyled>Дата начала</FormLabelStyled>
                      <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        adapterLocale={ru}
                        localeText={russianLocale}
                      >
                        <DatePicker
                          id="date-start"
                          value={startDate}
                          onChange={handleStartDateChange}
                          sx={textFieldStyles({ theme })}
                          slots={{
                            openPickerIcon: Icons.CalendarContained,
                          }}
                          slotProps={{
                            field: { clearable: true },
                            openPickerButton: { color: "purpleBlue" },
                            textField: { required: true },
                          }}
                        />
                      </LocalizationProvider>
                    </FormControl>
                    <FormControl required fullWidth variant="outlined">
                      <FormLabelStyled>Дата завершения</FormLabelStyled>
                      <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        adapterLocale={ru}
                        localeText={russianLocale}
                      >
                        <DatePicker
                          id="date-end"
                          value={endDate}
                          onChange={handleEndDateChange}
                          sx={textFieldStyles({ theme })}
                          slots={{
                            openPickerIcon: Icons.CalendarContained,
                          }}
                          slotProps={{
                            field: { clearable: true },
                            openPickerButton: { color: "purpleBlue" },
                            textField: { required: true },
                          }}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </div>
                  <FormControl required fullWidth variant="outlined">
                    <FormLabelStyled>Выбрать кабинет</FormLabelStyled>
                    <AutocompleteStyled
                      options={["1", "2", "3", "4", "5", "6"]}
                      value={room}
                      onChange={handleRoomChange}
                      renderInput={(params) => (
                        <AutocompleteField
                          {...params}
                          required
                          id="room-autocomplete"
                          variant="outlined"
                          placeholder="Выберите кабинет"
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
                  <FormControl required fullWidth variant="outlined">
                    <FormLabelStyled>Выберите учителя</FormLabelStyled>
                    <AutocompleteStyled
                      options={teacherNames}
                      value={teacher}
                      onChange={handleTeacherChange}
                      renderInput={(params) => (
                        <AutocompleteField
                          {...params}
                          required
                          id="teacher-autocomplete"
                          variant="outlined"
                          placeholder="Выберите учителя"
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
                </Box>
                <Box
                  className="flex flex-col"
                  rowGap="20px"
                  style={{ width: "50%" }}
                >
                  <FormControl required fullWidth variant="outlined">
                    <FormLabelStyled>Выбрать курс</FormLabelStyled>
                    <AutocompleteStyled
                      options={allCourseNames}
                      value={selectedCourseName}
                      onChange={handleCourseChange}
                      renderInput={(params) => (
                        <AutocompleteField
                          {...params}
                          required
                          id="subject"
                          variant="outlined"
                          placeholder="Выберите курс"
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
                  <Box>
                    <FormControl fullWidth>
                      <FormLabelStyled>Дни недели</FormLabelStyled>
                      <Box className="flex items-start" columnGap="10px">
                        {weekDaysText.map((weekDay, i) => (
                          <TagCheckbox
                            key={i}
                            color="purpleBlue"
                            selected={selectedWeekDays[i]}
                            onClick={() => handleSelectWeekDays(i)}
                          >
                            {weekDay}
                          </TagCheckbox>
                        ))}
                      </Box>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl fullWidth>
                      <FormLabelStyled>
                        Время начала и окончания урока
                      </FormLabelStyled>
                      <Box className="flex items-center" columnGap="24px">
                        <Box className="flex items-center" columnGap="8px">
                          <FormControl variant="outlined">
                            <Box
                              sx={{
                                aspectRatio: 1,
                                maxWidth: "50px",
                                maxHeight: "50px",
                              }}
                            >
                              <TextFieldStyled
                                type="number"
                                id="name"
                                variant="outlined"
                                placeholder="00"
                                value={hoursNumber}
                                onChange={handleHoursChange(setHoursNumber)}
                                sx={timeInputStyles}
                                autoComplete="off"
                              />
                            </Box>
                          </FormControl>
                          <Typography color="#D1D5DB">:</Typography>
                          <FormControl variant="outlined">
                            <Box
                              sx={{
                                aspectRatio: 1,
                                maxWidth: "50px",
                                maxHeight: "50px",
                              }}
                            >
                              <TextFieldStyled
                                type="number"
                                id="name"
                                variant="outlined"
                                placeholder="00"
                                value={minutesNumber}
                                onChange={handleMinutesChange(setMinutesNumber)}
                                sx={timeInputStyles}
                                autoComplete="off"
                              />
                            </Box>
                          </FormControl>
                        </Box>
                        <Box className="flex items-center" columnGap="8px">
                          <FormControl variant="outlined">
                            <Box
                              sx={{
                                aspectRatio: 1,
                                maxWidth: "50px",
                                maxHeight: "50px",
                              }}
                            >
                              <TextFieldStyled
                                type="number"
                                id="name"
                                variant="outlined"
                                placeholder="00"
                                value={endHoursNumber}
                                onChange={handleHoursChange(setEndHoursNumber)}
                                sx={timeInputStyles}
                                autoComplete="off"
                              />
                            </Box>
                          </FormControl>
                          <Typography color="#D1D5DB">:</Typography>
                          <FormControl variant="outlined">
                            <Box
                              sx={{
                                aspectRatio: 1,
                                maxWidth: "50px",
                                maxHeight: "50px",
                              }}
                            >
                              <TextFieldStyled
                                type="number"
                                id="name"
                                variant="outlined"
                                placeholder="00"
                                value={endMinutesNumber}
                                onChange={handleMinutesChange(
                                  setEndMinutesNumber
                                )}
                                sx={timeInputStyles}
                                autoComplete="off"
                              />
                            </Box>
                          </FormControl>
                        </Box>
                      </Box>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl fullWidth>
                      <FormLabelStyled>Теги</FormLabelStyled>
                      <Box className="full-width flex flex-wrap" gap="5px">
                        {tags.map((tag, i) => (
                          <Chip
                            label={tag}
                            onDelete={() => handleDeleteTag(tag)}
                            key={i}
                            variant="outlined"
                            color="purpleBlue"
                            sx={{
                              borderRadius: "8px",
                            }}
                            deleteIcon={
                              <Icons.Delete
                                color={theme.typography.color.darkBlue}
                              />
                            }
                          />
                        ))}
                        {tagFormOpen && (
                          <FormControl variant="outlined">
                            <TextField
                              autoFocus
                              required
                              onBlur={() => {
                                setTagFormOpen(!tagFormOpen);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  setTagFormOpen(false);
                                  handleAddTag(e.target.value);
                                }
                              }}
                              id="info"
                              variant="outlined"
                              sx={{
                                fontSize: theme.typography.fontSize.xs,
                                fontWeight: "400",
                                color: "inherit",
                                "& .MuiInputBase-root": {
                                  borderRadius: "8px",
                                  ".MuiInputBase-input": {
                                    width: "100px",
                                    padding: "4.5px 12px",
                                    "::placeholder": {
                                      color: "#D1D5DB",
                                      opacity: "1",
                                    },
                                  },
                                  ".MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, &:focus .MuiOutlinedInput-notchedOutline":
                                    {
                                      border: "1px solid #E5E7EB !important",
                                      boxShadow:
                                        "0px 1px 2px 0px rgba(31, 41, 55, 0.08) !important",
                                    },
                                },
                                "& .MuiFormHelperText-root": {
                                  color: "crimson",
                                  fontSize: ".8rem",
                                  margin: "2px 0 -10px 12px",
                                },
                              }}
                            />
                          </FormControl>
                        )}
                        <Chip
                          label="+"
                          variant="outlined"
                          color="purpleBlue"
                          sx={{
                            borderRadius: `${theme.custom.spacing.xxs}px`,
                          }}
                          onClick={() => setTagFormOpen(!tagFormOpen)}
                        />
                      </Box>
                    </FormControl>
                  </Box>
                </Box>
              </div>
              <FormControl fullWidth variant="outlined">
                <div className="flex items-start justify-between">
                  <FormLabelStyled>Описание</FormLabelStyled>
                  <TextFieldStyled
                    value={description}
                    onChange={changeDescription}
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    placeholder="Описание группы"
                    sx={{
                      maxWidth: "75%",
                      "& .MuiInputBase-multiline": {
                        padding: "0",
                      },
                    }}
                  />
                </div>
              </FormControl>
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
