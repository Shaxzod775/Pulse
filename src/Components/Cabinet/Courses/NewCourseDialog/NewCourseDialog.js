import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  InputAdornment,
  Typography,
  styled,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { memo, useMemo, useState } from "react";
import Dropzone from "react-dropzone";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../../../../Assets/Icons/icons";
import { getRussianWord } from "../../../../helpers/helpers";
import useInput from "../../../../hooks/useInput";
import {
  createCourse,
  selectAllCourses,
} from "../../../../Slices/coursesSlice";
import {
  FormLabelStyled,
  Root,
  SquareContainer,
  TextFieldStyled,
  Title,
  theme,
} from "../../CabinetStyles";

const timeInputStyles = {
  minHeight: "unset",
  "& .MuiInputBase-root": {
    minHeight: "unset",
    // borderRadius: "8px",
    ".MuiInputBase-input": {
      padding: "10px",
      // "::placeholder": { color: "#D1D5DB", opacity: "1" },
    },
  },
  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    // padding: "10px",
    // textAlign: "center",
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
        minHeight: "44px",
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
          // aspectRatio: 1,
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

const teachers = [
  "Koptleulov Arslan",
  "Ilya Starodubtsev",
  "Aziz Mamajonov",
  "Muhammad Matchonov",
];
const techs = [
  "JavaScript",
  "Django",
  "Python",
  "GitHub",
  "React",
  "Node.js",
  "Ruby on Rails",
  "Vue.js",
  "Angular",
  "Flask",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Heroku",
  "CSS",
  "HTML",
  "TypeScript",
  "GraphQL",
];
const durations = [3, 6, 12];
const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator=" "
      valueIsNumericString
    />
  );
});
NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const NewCourseDialog = memo(({ open, handleClose, ...otherProps }) => {
  const dispatch = useDispatch();
  const courses = useSelector(selectAllCourses);
  const [name, changeName, resetName] = useInput("");
  const [price, changePrice, resetPrice] = useInput("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [nameError, setNameError] = useState("");

  const allCourseNames = useMemo(
    () => courses.map((course) => course.name),
    [courses]
  );

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

  const handleChangeName = (event) => {
    const newName = event.target.value.trim(); // Trim the new name
    if (
      allCourseNames.some(
        (courseName) =>
          courseName.trim().toLowerCase() === newName.toLowerCase()
      )
    ) {
      setNameError("Название курса должно быть уникальным.");
    } else {
      setNameError("");
    }
    changeName(event); // Update the name input field value
  };

  // Function to handle change in minutes
  const handleDurationChange = (event) => {
    let inputValue = parseInt(event.target.value, 10);

    // Ensure the value is between 0 and 24
    if (isNaN(inputValue) || inputValue < 0) inputValue = 0;
    if (inputValue > 24) inputValue = 24;

    inputValue = `${inputValue}`;

    setSelectedDuration(inputValue);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameError) {
      return; // Prevent form submission if name is not unique
    }

    const courseData = {
      name: name,
      price: price,
      duration: selectedDuration,
      // startDate: startDate, // Если требуется
      // endDate: endDate, // Если требуется
      // thumbnail: selectedImage,
    };

    // Dispatch the createCourse thunk with courseData
    dispatch(createCourse(courseData));

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
          maxWidth: "614px",
          width: "614px",
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
          <div className="flex flex-col gap-sm">
            {/* MAIN CONTENT OF DIALOG */}
            <div className="full-width flex flex-col gap-lg">
              <div className="full-width flex flex-col gap-sm">
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
                <div className="full-width flex justify-between gap-sm">
                  <div
                    className="full-width full-height"
                    style={{ width: "55%" }}
                  >
                    <Title fontSize="1.375rem" letterSpacing="0.32px">
                      Обложка курса
                    </Title>
                    <Typography
                      color="#AEB2BA"
                      fontSize=".8rem"
                      fontWeight={400}
                    >
                      Мы рекомендуем изображения не менее 322x179px, вы можете
                      загрузить PNG или JPG размером не более 10 МБ
                    </Typography>
                  </div>
                  <div
                    className="flex flex-col gap-xxs"
                    style={{ width: "40%" }}
                  >
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
              <div className="flex flex-col gap-xs">
                <FormControl
                  fullWidth
                  variant="outlined"
                  required
                  error={nameError}
                >
                  <FormLabelStyled>Название курса</FormLabelStyled>
                  <TextFieldStyled
                    required
                    id="name"
                    variant="outlined"
                    placeholder="Название"
                    value={name}
                    onChange={handleChangeName}
                    helperText={nameError}
                  />
                </FormControl>
                <div className="flex gap-sm">
                  <FormControl required>
                    <FormLabelStyled>Продолжительность курса</FormLabelStyled>
                    <div className="flex items-start gap-xxs">
                      {durations.map((duration, i) => (
                        <TagCheckbox
                          key={i}
                          color="purpleBlue"
                          selected={selectedDuration == duration}
                          onClick={() => setSelectedDuration(duration)}
                          style={{
                            whiteSpace: "nowrap",
                            minWidth: "max-content",
                          }}
                        >
                          {duration}{" "}
                          {getRussianWord(
                            duration,
                            "месяц",
                            "месяца",
                            "месяцев"
                          )}
                        </TagCheckbox>
                      ))}
                      <FormControl variant="outlined">
                        <Box
                          sx={
                            {
                              // // aspectRatio: 1,
                              // maxWidth: "30%",
                              // maxHeight: "100%",
                            }
                          }
                        >
                          <TextFieldStyled
                            required
                            autoComplete="off"
                            type="number"
                            id="name"
                            variant="outlined"
                            placeholder=""
                            value={selectedDuration}
                            onChange={handleDurationChange}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  {getRussianWord(
                                    selectedDuration,
                                    "месяц",
                                    "месяца",
                                    "месяцев"
                                  )}
                                </InputAdornment>
                              ),
                            }}
                            sx={timeInputStyles}
                          />
                        </Box>
                      </FormControl>
                    </div>
                  </FormControl>
                </div>
                <FormControl fullWidth variant="outlined" required>
                  <FormLabelStyled>Стоимость курса</FormLabelStyled>
                  <TextFieldStyled
                    required
                    id="price"
                    variant="outlined"
                    value={price}
                    onChange={changePrice}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">сўм</InputAdornment>
                      ),
                      placeholder: "Введите стоимость в сумах",
                      inputComponent: NumericFormatCustom,
                    }}
                  />
                </FormControl>
              </div>
            </div>

            {/* DIALOG ACTIONS */}
            <div className="full-width flex justify-center gap-sm">
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
        </DialogContent>
      </Root>
    </Dialog>
  );
});

export default NewCourseDialog;
