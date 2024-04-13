import React, { useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  FormControl,
  InputAdornment,
  TextField,
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

const DialogButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.custom.spacing.sm,
  padding: theme.custom.spacing.xxs,
  font: "inherit",
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.fontSize.sm,
  textTransform: "capitalize",
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
        minWidth: "unset",
        padding: "6px",
        lineHeight: "inherit",
        border: `${selected ? `1px solid ${theme.palette.darkBlue.main}` : ""}`,
      }}
      {...otherProps}
    >
      {children}
    </Button>
  );
}

const teachers = ["Eshmatov Toshmat", "Aliyev Shohrux", "Azizova Aziza"];
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
const durations = [
  { number: 3, text: "3 месяца" },
  { number: 6, text: "6 месяцев" },
  { number: 12, text: "12 месяцев" },
];
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
      thousandSeparator
      valueIsNumericString
    />
  );
});
NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const NewCourseDialog = ({
  open,
  handleClose,
  handleAddCourse,
  ...otherProps
}) => {
  const [name, changeName, resetName] = useInput("");
  const [selectedWeekDays, setSelectedWeekDays] = useState(
    weekDays.map(() => false)
  );
  const [teacher, changeTeacher, resetTeacher] = useInput(null);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [price, changePrice, resetPrice] = useInput(0);
  const [description, changeDescription, resetDescription] = useInput("");
  const [durationChosen, setDurationChosen] = useState({
    number: 0,
    text: "",
  });
  const [tags, setTags] = useState(["Тег 1", "Тег 2", "Тег 3"]);
  const [tagFormOpen, setTagFormOpen] = useState(false);
  const [startDate, setStartDate] = useState(null); // State for start date
  // State for end date - Calculated based on start date and duration
  const [endDate, setEndDate] = useState(null);

  // Function to handle selecting week days
  const handleSelectWeekDays = (index) => {
    const updatedSelectedWeekDays = [...selectedWeekDays];
    updatedSelectedWeekDays[index] = !updatedSelectedWeekDays[index];
    setSelectedWeekDays(updatedSelectedWeekDays);
  };

  // Function to handle change in teacher selection
  const handleTeacherChange = (event, newValue) => {
    changeTeacher({ target: { value: newValue } });
  };

  // Function to handle change in autocomplete techs selection
  const handleAutocompleteChange = (event, newValue) => {
    setSelectedTechs(newValue);
  };

  // Function to handle deletion of selected tech
  const handleDeleteTech = (techToDelete) => () => {
    setSelectedTechs(selectedTechs.filter((tech) => tech !== techToDelete));
  };

  // Function to handle adding a new tag
  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  // Function to handle deletion of a tag
  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  // Function to handle change in start date
  const handleStartDateChange = (event) => {
    const inputDate = event.target.value;
    const newStartDate = new Date(inputDate);
    if (!isNaN(newStartDate.getTime())) {
      setStartDate(newStartDate);

      // Calculate end date based on selected duration and new start date
      if (durationChosen.number > 0) {
        const newEndDate = new Date(newStartDate);
        newEndDate.setMonth(newStartDate.getMonth() + durationChosen.number);
        setEndDate(newEndDate);
      }
    } else {
      // Handle invalid input date here
      setStartDate(null);
      setEndDate(null);
    }
  };

  // Function to handle change in duration selection
  const handleDurationChange = (duration) => {
    const newEndDate = calculateEndDate(startDate, duration);
    setDurationChosen(duration);
    setEndDate(newEndDate);
  };

  // Function to calculate end date based on selected duration and start date
  const calculateEndDate = (startDate, duration) => {
    if (startDate && duration.number > 0) {
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + duration.number);
      return endDate;
    }
    return null;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const chosenDays = selectedWeekDays.reduce(
      (daysAccumulator, isDaySelected, dayIndex) => {
        if (isDaySelected) {
          daysAccumulator.push(dayIndex);
        }
        return daysAccumulator;
      },
      []
    );
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
      name,
      teacher,
      price,
      weekDays: chosenDays,
      description,
      techs: selectedTechs,
      tags,
      duration: durationChosen.number,
      startDate,
    });
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
            padding: `${theme.custom.spacing.xlg}px`,
            width: "100%",
          }}
        >
          <div className="flex flex-col gap-md">
            {/* DIALOG TITLE */}
            <Title
              sx={{
                fontSize: theme.typography.fontSize.md,
                color: theme.typography.color.aqua,
              }}
            >
              Новый курс
            </Title>
            {/* MAIN CONTENT OF DIALOG */}
            <div className="full-width flex justify-between gap-sm">
              {/* LEFT COLUMN */}
              <div className="full-width flex flex-col gap-sm">
                <FormControl fullWidth variant="outlined" required>
                  <label htmlFor="course-name">
                    <Title
                      sx={{
                        fontSize: theme.typography.fontSize.sm2,
                        paddingBottom: `${theme.custom.spacing.xs2}px`,
                      }}
                    >
                      Название курса
                    </Title>
                  </label>
                  <TextFieldStyled
                    id="course-name"
                    variant="outlined"
                    value={name}
                    onChange={changeName}
                  />
                </FormControl>
                <div>
                  <label htmlFor="week-days">
                    <Title
                      sx={{
                        fontSize: theme.typography.fontSize.sm2,
                        paddingBottom: `${theme.custom.spacing.xs2}px`,
                      }}
                    >
                      Дни недели:
                    </Title>
                  </label>
                  <div className="flex gap-xxs">
                    {weekDays.map((weekDay, i) => (
                      <TagCheckbox
                        key={i}
                        color="darkBlue"
                        selected={selectedWeekDays[i]}
                        onClick={() => handleSelectWeekDays(i)}
                      >
                        {weekDay}
                      </TagCheckbox>
                    ))}
                  </div>
                </div>
                <FormControl fullWidth variant="outlined">
                  <label htmlFor="teacher">
                    <Title
                      sx={{
                        fontSize: theme.typography.fontSize.sm2,
                        paddingBottom: `${theme.custom.spacing.xs2}px`,
                      }}
                    >
                      Преподаватель
                    </Title>
                  </label>
                  <AutocompleteStyled
                    options={teachers}
                    value={teacher}
                    onChange={handleTeacherChange}
                    renderInput={(params) => (
                      <TextField {...params} id="teacher" variant="outlined" />
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
                  <label htmlFor="techs">
                    <Title
                      sx={{
                        fontSize: theme.typography.fontSize.sm2,
                        paddingBottom: `${theme.custom.spacing.xs2}px`,
                      }}
                    >
                      Стек Технологий
                    </Title>
                  </label>
                  <div className="flex flex-col gap-x3s">
                    <AutocompleteStyled
                      multiple
                      options={techs}
                      value={selectedTechs}
                      onChange={handleAutocompleteChange}
                      renderInput={(params) => (
                        <TextField {...params} id="techs" variant="outlined" />
                      )}
                      renderTags={() => null}
                      popupIcon={
                        <Icons.ArrowD color={theme.typography.color.darkBlue} />
                      }
                      clearIcon={
                        <Icons.Delete color={theme.typography.color.darkBlue} />
                      }
                    />
                    <div className="flex flex-wrap gap-x3s">
                      {selectedTechs.map((tech, i) => (
                        <Chip
                          label={tech}
                          onDelete={handleDeleteTech(tech)}
                          key={i}
                          variant="outlined"
                          color="darkBlue"
                          sx={{
                            borderRadius: `${theme.custom.spacing.xxs}px`,
                          }}
                          deleteIcon={
                            <Icons.Delete
                              color={theme.typography.color.darkBlue}
                            />
                          }
                        />
                      ))}
                    </div>
                  </div>
                </FormControl>
              </div>
              {/* RIGHT COLUMN */}
              <div className="full-width flex flex-col gap-sm">
                <FormControl fullWidth variant="outlined">
                  <label htmlFor="price">
                    <Title
                      sx={{
                        fontSize: theme.typography.fontSize.sm2,
                        paddingBottom: `${theme.custom.spacing.xs2}px`,
                      }}
                    >
                      Введите цену
                    </Title>
                  </label>
                  <TextFieldStyled
                    id="price"
                    variant="outlined"
                    value={price}
                    onChange={changePrice}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">so'm</InputAdornment>
                      ),
                      inputComponent: NumericFormatCustom,
                    }}
                  />
                </FormControl>
                <FormControl fullWidth variant="outlined">
                  <label htmlFor="description">
                    <Title
                      sx={{
                        fontSize: theme.typography.fontSize.sm2,
                        paddingBottom: `${theme.custom.spacing.xs2}px`,
                      }}
                    >
                      Описание курса
                    </Title>
                  </label>
                  <TextFieldStyled
                    id="description"
                    variant="outlined"
                    value={description}
                    onChange={changeDescription}
                    multiline
                    rows={4}
                    sx={{
                      "& .MuiInputBase-multiline": {
                        padding: `${theme.custom.spacing.xxs}px ${theme.custom.spacing.sm}px`,
                        "&.MuiInputBase-root .MuiInputBase-input": {
                          padding: "0",
                        },
                      },
                    }}
                  />
                </FormControl>
                <div>
                  <Title
                    sx={{
                      fontSize: theme.typography.fontSize.sm2,
                      paddingBottom: `${theme.custom.spacing.xs2}px`,
                    }}
                  >
                    Теги
                  </Title>
                  <div className="flex flex-wrap gap-x3s">
                    {tags.map((tag, i) => (
                      <Chip
                        label={tag}
                        onDelete={() => handleDeleteTag(tag)}
                        key={i}
                        variant="outlined"
                        color="darkBlue"
                        sx={{
                          borderRadius: `${theme.custom.spacing.xxs}px`,
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
                        <TextFieldStyled
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
                            "& .MuiInputBase-input": {
                              height: theme.typography.fontSize.xs,
                              fontSize: theme.typography.fontSize.xs,
                              lineHeight: theme.typography.fontSize.xs,
                              padding: "8px 11px !important",
                              color: "",
                            },
                          }}
                        />
                      </FormControl>
                    )}
                    <Chip
                      label="+"
                      variant="outlined"
                      color="darkBlue"
                      sx={{
                        borderRadius: `${theme.custom.spacing.xxs}px`,
                      }}
                      onClick={() => setTagFormOpen(!tagFormOpen)}
                    />
                  </div>
                </div>
                <div className="full-width flex flex-col justify-between gap-xxs">
                  <FormControl fullWidth variant="outlined">
                    <label htmlFor="date-start">
                      <Title
                        sx={{
                          fontSize: theme.typography.fontSize.sm2,
                          paddingBottom: `${theme.custom.spacing.xs2}px`,
                        }}
                      >
                        Начало курса
                      </Title>
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
                    <label htmlFor="date-end">
                      <Title
                        sx={{
                          fontSize: theme.typography.fontSize.sm2,
                          paddingBottom: `${theme.custom.spacing.xs2}px`,
                        }}
                      >
                        Конец курса
                      </Title>
                    </label>
                    <TextFieldStyled
                      id="date-end"
                      variant="outlined"
                      type="date"
                      disabled
                      value={endDate ? endDate.toISOString().split("T")[0] : ""}
                    />
                  </FormControl>
                  <div className="flex flex-wrap gap-x3s">
                    {durations.map((duration, i) => (
                      <Chip
                        label={duration.text}
                        key={i}
                        variant={`${
                          duration.number === durationChosen.number
                            ? "contained"
                            : "outlined"
                        }`}
                        color="aqua"
                        sx={{
                          borderRadius: `${theme.custom.spacing.xxs}px`,
                          "&:focus": {
                            boxShadow: "none",
                          },
                        }}
                        onClick={() => handleDurationChange(duration)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* DIALOG ACTIONS */}
            <div className="full-width flex justify-between gap-sm">
              <DialogButton
                type="submit"
                variant="contained"
                color="aqua"
                fullWidth
              >
                Сохранить
              </DialogButton>
              <DialogButton
                onClick={handleClose}
                variant="outlined"
                color="aqua"
                fullWidth
              >
                Отмена
              </DialogButton>
            </div>
          </div>
        </DialogContent>
      </Root>
    </Dialog>
  );
};

export default NewCourseDialog;
