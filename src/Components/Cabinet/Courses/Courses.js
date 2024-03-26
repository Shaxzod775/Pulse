import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
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
} from "../Cabinet";
import CourseCard from "./CourseCard/CourseCard";

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

const Courses = () => {
  const [open, setOpen] = useState(false);

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
          },
        }}
      >
        <Root sx={{ width: "100%" }}>
          <DialogContent
            sx={{
              fontFamily: "Rubik",
              padding: `${theme.custom.spacing.xlg}px`,
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
              <div>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
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
