import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
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

const Courses = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                    <label htmlFor="course-name">
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
                    <label htmlFor="course-name">
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
                          id="course-name"
                          variant="outlined"
                        />
                      )}
                      popupIcon={<Icons.ArrowD />}
                    />
                  </FormControl>
                  <FormControl fullWidth variant="outlined">
                    <label htmlFor="course-name">
                      <Title
                        sx={{
                          fontSize: theme.typography.fontSize.sm2,
                          paddingBottom: `${theme.custom.spacing.xs2}px`,
                        }}
                      >
                        Стек Технологий
                      </Title>
                    </label>
                    <AutocompleteStyled
                      options={teachers}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="course-name"
                          variant="outlined"
                        />
                      )}
                      popupIcon={<Icons.ArrowD />}
                    />
                  </FormControl>
                </div>
                <div className="full-width">Yo!</div>
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
