import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
  duration,
  styled,
} from "@mui/material";
import {
  theme,
  Root,
  Title,
  TextFieldStyled,
  AutocompleteStyled,
} from "../../CabinetStyles";
import { Icons } from "../../../../Assets/Icons/icons";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import { createCourse } from "../Courses";
import useInput from "../../../../hooks/useInput";
import Dropzone from "react-dropzone";
import { getRussianWord } from "../../../../helpers/helpers";

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

const FormLabel = styled(Typography)(({ theme }) => ({
  padding: "0",
  color: theme.typography.color.darkBlue,
  fontSize: theme.typography.fontSize.xs,
  lineHeight: "normal",
  paddingBottom: "12px",
  letterSpacing: "0.32px",
  fontWeight: "600",
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

const SquareContainer = styled("div")(
  ({ theme, width, height = 160, bgColor = "#fff", active }) => ({
    width: width ? `${width}px` : "100%",
    height: `${height}px`,
    backgroundColor: bgColor,
    borderRadius: "12px",
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

const teachers = [
  "Коптлеулов Арслан",
  "Илья Стародубцев",
  "Азиз Мамаджонов",
  "Мухаммад Матчонов",
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

export function calculateMonthDifference(startDate, endDate) {
  // Handle invalid dates or missing values
  if (!startDate || !endDate) {
    return 0; // Or handle it differently as needed
  }

  const yearsDifference = endDate.getFullYear() - startDate.getFullYear();
  const monthsDifference = endDate.getMonth() - startDate.getMonth();

  // Floor the month difference considering years difference
  return monthsDifference + yearsDifference * 12;
}

const NewCourseDialog = ({
  open,
  handleClose,
  handleAddCourse,
  ...otherProps
}) => {
  const [name, changeName, resetName] = useInput("");
  const [price, changePrice, resetPrice] = useInput("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState("");
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

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const monthsDifference = calculateMonthDifference(startDate, endDate);
    // id,
    // name,
    // teacher,
    // price,
    // currency,
    // weekDays,
    // description,
    // techs,
    // tags,
    // duration,
    // startDate,
    const newCourse = createCourse({
      name: name,
      price: price,
      duration: selectedDuration,
      startDate: startDate,
      endDate: endDate,
      thumbnail: selectedImage,
    });
    console.log(newCourse);
    handleAddCourse(newCourse);
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
                      загрузить PNG или JPG размером менее 10 МБ
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
                <FormControl fullWidth variant="outlined">
                  <label htmlFor="name">
                    <FormLabel>Название курса*</FormLabel>
                  </label>
                  <TextFieldStyled
                    id="name"
                    variant="outlined"
                    placeholder="Name"
                    value={name}
                    onChange={changeName}
                  />
                </FormControl>
                <div className="flex gap-sm">
                  <div>
                    <label htmlFor="price">
                      <FormLabel>Длительность курса</FormLabel>
                    </label>
                    <div className="flex items-start gap-xxs">
                      {durations.map((duration, i) => (
                        <TagCheckbox
                          key={i}
                          color="purpleBlue"
                          selected={selectedDuration === duration}
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
                            type="number"
                            id="name"
                            variant="outlined"
                            placeholder=""
                            value={selectedDuration}
                            onChange={(e) =>
                              setSelectedDuration(e.target.value)
                            }
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
                  </div>
                  {/* <FormControl fullWidth variant="outlined">
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
                      value={endDate ? endDate.toISOString().split("T")[0] : ""}
                      onChange={handleEndDateChange}
                    />
                  </FormControl> */}
                </div>
                <FormControl fullWidth variant="outlined">
                  <label htmlFor="price">
                    <FormLabel>Стоимость курса</FormLabel>
                  </label>
                  <TextFieldStyled
                    id="price"
                    variant="outlined"
                    value={price}
                    onChange={changePrice}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">UZS</InputAdornment>
                      ),
                      placeholder: "Введите стоимость в UZS",
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
};

export default NewCourseDialog;
