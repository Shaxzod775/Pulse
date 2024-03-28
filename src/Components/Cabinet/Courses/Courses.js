import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  styled,
} from "@mui/material";
import {
  theme,
  ButtonStyled,
  ContentHeader,
  Main,
  Root,
  Title,
  TextFieldStyled,
  InputLabelStyled,
  AutocompleteStyled,
} from "../Cabinet";
import CourseCard from "./CourseCard/CourseCard";
import { Icons } from "../../../Assets/Icons/icons";
import { DateRangeOutlined } from "@mui/icons-material";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";

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

const Courses = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedTechs, setSelectedTechs] = useState([]);

  const [durationIndex, setDurationIndex] = useState(0);
  const durations = ["3 месяца", "6 месяцев", "12 месяцев"];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedTechs(newValue);
  };

  const handleDeleteTech = (techToDelete) => () => {
    setSelectedTechs(selectedTechs.filter((tech) => tech !== techToDelete));
  };

  const handleDurationChange = (number) => {
    durations[number] ? setDurationIndex(number) : setDurationIndex(0);
  };

  return (
    <Root>
      <Main>
        <ContentHeader>
          <Title>Курсы</Title>
          <div className="flex items-center gap-sm">
            <ButtonStyled
              variant="contained"
              color="aqua"
              onClick={handleClickOpen}
            >
              Создать +
            </ButtonStyled>
          </div>
        </ContentHeader>
        <Grid
          container
          justifyContent="center"
          spacing={`${theme.custom.spacing.sm}px`}
          marginBottom={`${theme.custom.spacing.sm}px`}
        >
          <Grid item xs="auto" md="auto" lg={3}>
            <CourseCard />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <CourseCard />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <CourseCard />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <CourseCard />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <CourseCard />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <CourseCard />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <CourseCard />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <CourseCard />
          </Grid>
        </Grid>
      </Main>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleClose();
          },
        }}
        sx={{
          fontFamily: "Rubik",
          "& .MuiPaper-root.MuiDialog-paper": {
            borderRadius: `${theme.custom.spacing.sm}px`,
            maxWidth: "957px",
            width: "957px",
          },
          "& *": {
            boxSizing: "border-box",
          },
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
            <div className="flex flex-column gap-md">
              <Title
                sx={{
                  fontSize: theme.typography.fontSize.md,
                  color: theme.typography.color.aqua,
                }}
              >
                Новый курс
              </Title>
              <div className="full-width flex justify-between gap-sm">
                <div className="full-width flex flex-column gap-sm">
                  <FormControl fullWidth variant="outlined">
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
                    <TextFieldStyled id="course-name" variant="outlined" />
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
                      <TagCheckbox
                        color="darkBlue"
                        selected={selected}
                        setSelected={setSelected}
                      >
                        Пн
                      </TagCheckbox>
                      <TagCheckbox
                        color="darkBlue"
                        selected={selected}
                        setSelected={setSelected}
                      >
                        Вт
                      </TagCheckbox>
                      <TagCheckbox
                        color="darkBlue"
                        selected={selected}
                        setSelected={setSelected}
                      >
                        Ср
                      </TagCheckbox>
                      <TagCheckbox
                        color="darkBlue"
                        selected={selected}
                        setSelected={setSelected}
                      >
                        Чт
                      </TagCheckbox>
                      <TagCheckbox
                        color="darkBlue"
                        selected={selected}
                        setSelected={setSelected}
                      >
                        Пт
                      </TagCheckbox>
                      <TagCheckbox
                        color="darkBlue"
                        selected={selected}
                        setSelected={setSelected}
                      >
                        Сб
                      </TagCheckbox>
                      <TagCheckbox
                        color="darkBlue"
                        selected={selected}
                        setSelected={setSelected}
                      >
                        Вс
                      </TagCheckbox>
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
                      renderInput={(params) => (
                        <TextField
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
                    <div className="flex flex-column gap-x3s">
                      <AutocompleteStyled
                        multiple
                        options={techs}
                        value={selectedTechs}
                        onChange={handleAutocompleteChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            id="techs"
                            variant="outlined"
                          />
                        )}
                        renderTags={() => null}
                        popupIcon={
                          <Icons.ArrowD
                            color={theme.typography.color.darkBlue}
                          />
                        }
                        clearIcon={
                          <Icons.Delete
                            color={theme.typography.color.darkBlue}
                          />
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
                <div className="full-width flex flex-column gap-sm">
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
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">so'm</InputAdornment>
                        ),
                        inputComponent: NumericFormatCustom,
                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth variant="outlined">
                    <label htmlFor="info">
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
                      id="info"
                      variant="outlined"
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
                      {["Тег 1", "Тег 2", "Тег 3", "+"].map((tech, i) => (
                        <Chip
                          label={tech}
                          onDelete={i !== 3 && handleDeleteTech(tech)}
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
                  <div className="full-width flex flex-column justify-between gap-xxs">
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
                      />
                    </FormControl>
                    <div className="flex flex-wrap gap-x3s">
                      {durations.map((duration, i) => (
                        <Chip
                          label={duration}
                          key={i}
                          variant={`${
                            durationIndex === i ? "contained" : "outlined"
                          }`}
                          color="aqua"
                          sx={{
                            borderRadius: `${theme.custom.spacing.xxs}px`,
                            "&:focus": {
                              boxShadow: "none",
                            },
                          }}
                          onClick={() => handleDurationChange(i)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

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
    </Root>
  );
};

export default Courses;
