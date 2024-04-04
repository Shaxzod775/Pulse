import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import * as routes from "../../Constants/routes";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Dashboard from "./Dashboard/Dashboard";
import styles from "./Cabinet.module.css";
import Groups from "./Groups/Groups";
import {
  ThemeProvider,
  createTheme,
  styled,
  InputLabel,
  Select,
  Button,
  Card,
  TextField,
  Autocomplete,
} from "@mui/material";
import Courses from "./Courses/Courses";
import Teachers from "./Teachers/Teachers";
import Students from "./Students/Students";
import TeachersRoot from "./Teachers/TeachersRoot";

export const theme = createTheme({
  palette: {
    purpleBlue: {
      main: "#6574D8",
      light: "#8A9BD8",
      dark: "#6574D8",
      contrastText: "#ffffff",
    },
    purpleBlueLight: {
      main: "#8A9BD8",
      light: "#8A9BD8",
      dark: "#6574D8",
      contrastText: "#ffffff",
    },
    greyLight: {
      main: "#E5E7EB",
      light: "#E5E7EB",
      dark: "#706F7C",
      contrastText: "#000000",
    },
    crimson: {
      main: "#FF2D55",
      light: "#FFC0CC",
      dark: "#FF2D55",
      contrastText: "#ffffff",
    },
    aqua: {
      main: "#00988F",
      light: "#00988F",
      dark: "#00988F",
      contrastText: "#ffffff",
    },
    darkBlue: {
      main: "#1C274C",
      light: "#1C274C",
      dark: "#1C274C",
      contrastText: "#ffffff",
    },
    purpleGrey: {
      main: "#A2A2C2",
      light: "#A2A2C2",
      dark: "#A2A2C2",
      contrastText: "#ffffff",
    },
    green: {
      main: "#04B87B",
      light: "#E6FBF4",
      dark: "#04B87B",
      contrastText: "#ffffff",
    },
    grey: {
      main: "#706F7C",
      light: "#DFDFDF",
      dark: "#706F7C",
      contrastText: "#ffffff",
    },
    orange: {
      main: "#F79B16",
      light: "#FBF3E6",
      dark: "#F79B16",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontSize: {
      xxs: "0.8rem",
      xs: "1rem",
      sm: "1.2rem",
      sm2: "1.5rem",
      md: "1.75rem",
      lg: "2.5rem",
    },
    color: {
      purpleBlue: "#6574D8",
      darkBlue: "#1C274C",
      mediumaquamarine: "#89CCB5",
      aqua: "#00988F",
    },
  },
  shape: {
    borderRadius: 12,
  },
  custom: {
    sidebarOpenWidth: 250,
    spacing: {
      x4s: 3,
      x3s: 5,
      xxs2: 8,
      xxs: 10,
      xs2: 12,
      xs: 15,
      sm: 20,
      md2: 27,
      md: 30,
      lg: 40,
      xlg: 57,
    },
  },
});

export const Root = styled("div")(({ theme }) => ({
  width: "100%",
  "& *": { fontFamily: "Poppins, Rubik, sans-serif" },
  maxWidth: `calc(100vw - ${
    theme.custom.sidebarOpenWidth + theme.custom.spacing.sm * 2
  }px)`,
  fontFamily: "Rubik",
  "& .flex": {
    display: "flex",
  },
  "& .flex-col": {
    flexDirection: "column",
  },
  "& .flex-row": {
    flexDirection: "row",
  },
  "& .flex-grow": {
    flexGrow: 1,
  },
  "& .flex-grow-2": {
    flexGrow: 2,
  },
  "& .flex-wrap": {
    flexWrap: "wrap",
  },
  "& .items-start": {
    alignItems: "start",
  },
  "& .items-center": {
    alignItems: "center",
  },
  "& .items-end": {
    alignItems: "end",
  },
  "& .items-stretch": {
    alignItems: "stretch",
  },
  "& .justify-center": {
    justifyContent: "center",
  },
  "& .justify-between": {
    justifyContent: "space-between",
  },
  "& .justify-around": {
    justifyContent: "space-around",
  },
  "& .justify-end": {
    justifyContent: "flex-end",
  },
  "& .align-self-start": {
    alignSelf: "start",
  },
  "& .align-self-end": {
    alignSelf: "end",
  },
  "& .justify-self-start": {
    justifySelf: "start",
  },
  "& .justify-self-end": {
    justifySelf: "end",
  },
  "& .gap-x4s": {
    gap: theme.custom.spacing.x4s,
  },
  "& .gap-x3s": {
    gap: theme.custom.spacing.x3s,
  },
  "& .gap-xxs2": {
    gap: theme.custom.spacing.xxs2,
  },
  "& .gap-xxs": {
    gap: theme.custom.spacing.xxs,
  },
  "& .gap-xs": {
    gap: theme.custom.spacing.xs,
  },
  "& .gap-sm": {
    gap: theme.custom.spacing.sm,
  },
  "& .gap-md": {
    gap: theme.custom.spacing.md,
  },
  "& .gap-lg": {
    gap: theme.custom.spacing.lg,
  },
  "& .full-height": {
    height: "100%",
  },
  "& .full-width": {
    width: "100%",
  },
  "& .grid": {
    display: "grid",
  },
  "& .grid-cols-2": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "& .col-start-1": {
    gridColumnStart: "1",
  },
  "& .col-end-2": {
    gridColumnEnd: "2",
  },
  "& .col-start-2": {
    gridColumnStart: "2",
  },
  "& .col-end-3": {
    gridColumnEnd: "3",
  },
  "& .p-xxs2": {
    padding: theme.custom.spacing.xxs2,
  },
  "& .p-r-xxs2": {
    paddingRight: theme.custom.spacing.xxs2,
  },
  "& .p-l-xxs2": {
    paddingLeft: theme.custom.spacing.xxs2,
  },
  "& .p-d-xxs2": {
    paddingDown: theme.custom.spacing.xxs2,
  },
  "& .p-t-xxs2": {
    paddingTop: theme.custom.spacing.xxs2,
  },
  "& .link": {
    textDecoration: "none",
    fontColor: "inherit",
  },
}));

export const Main = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.custom.spacing.md,
}));

export const ContentHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const Title = styled("h1")(({ theme }) => ({
  margin: "0",
  color: theme.typography.color.darkBlue,
  fontSize: theme.typography.fontSize.md,
  fontWeight: "1000",
}));

export const InputLabelStyled = styled(InputLabel)(({ theme }) => ({
  color: theme.typography.color.darkBlue,
  fontWeight: "600",
  font: "inherit",
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.fontSize.sm,
}));

export const SelectStyled = styled(Select)(({ theme }) => ({
  font: "inherit",
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.fontSize.sm,
  color: theme.palette.darkBlue.main,
  display: "flex",
  alignItems: "center",
  "& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input":
    {
      padding: "0",
      paddingLeft: theme.custom.spacing.xxs2,
      paddingRight: theme.custom.spacing.x3s,
      display: "flex",
      alignItems: "center",
      width: "min-content",
      minHeight: theme.typography.fontSize.sm,
      height: "100%",
    },
  "& .MuiSelect-icon.MuiSelect-iconOutlined": {
    position: "static",
    width: theme.typography.fontSize.sm,
    height: "auto",
    color: "#9CA3AF",
    // strokeWidth: "2px", not working... small problem for future me
  },
  "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, &:focus .MuiOutlinedInput-notchedOutline":
    {
      border: "none",
    },
}));

export const SelectStyledOld = styled(Select)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  font: "inherit",
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.fontSize.sm,
  color: theme.palette.darkBlue.main,
  display: "flex",
  alignItems: "center",
  "& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input":
    {
      padding: theme.custom.spacing.xs,
      paddingRight: "32px",
      display: "flex",
      alignItems: "center",
      minHeight: theme.typography.fontSize.sm,
      height: "auto",
    },
  "& .MuiSelect-icon.MuiSelect-iconOutlined": {
    width: theme.typography.fontSize.sm,
    height: "auto",
  },
  "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, &:focus .MuiOutlinedInput-notchedOutline":
    {
      border: "2px solid #E5E5E5",
    },
}));

export const ButtonStyled = styled(Button)(({ theme }) => ({
  minWidth: "10px",
  borderRadius: theme.shape.borderRadius,
  font: "inherit",
  fontSize: theme.typography.fontSize.xs,
  lineHeight: theme.typography.fontSize.xs,
  padding: "8px",
  textTransform: "capitalize",
  boxShadow: "none",
  "&:hover": { boxShadow: "none" },
  "& svg": {
    width: "20px",
    height: "auto",
  },
}));

export const GridContainer = styled("div")(({ theme }) => ({}));

export const CardStyled = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.custom.spacing.sm,
  boxShadow: "none",
  fontSize: theme.typography.fontSize.xs,
  fontWeight: 600,
  border: "2px solid #E5E5E5",
}));

export const TextFieldStyled = styled(TextField)(({ theme }) => ({
  fontSize: theme.typography.fontSize.xs,
  lineHeight: theme.typography.fontSize.md,
  color: "inherit",
  "& *": { boxSizing: "content-box" },
  "& .MuiInputBase-root": {
    borderRadius: "8px",
    "& .MuiInputBase-input": {
      padding: "12px",
    },
  },
}));

export const AutocompleteStyled = styled(Autocomplete)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.fontSize.md,
  color: "inherit",
  "& .MuiInputBase-root": {
    padding: "0",
  },
  "& .MuiInputBase-root .MuiInputBase-input": {
    fontFamily: "inherit",
    padding: "8px",
  },
  "& .MuiSvgIcon-root": {
    width: theme.custom.spacing.sm,
    height: "auto",
  },
  "& .MuiAutocomplete-endAdornment": {
    top: "6px",
  },
}));

const Cabinet = () => {
  return (
    <>
      <div className={styles["cabinet"]}>
        <Sidebar />
        <div className={styles["cabinet-main"]}>
          <Header />
          {/* <div className={styles["cabinet-content"]}> */}
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path={routes.DASHBOARD} element={<Dashboard />} />
              <Route path={routes.COURSES} element={<Courses />} />
              <Route path={routes.GROUPS} element={<Groups />} />
              <Route path={routes.TEACHERS + "/*"} element={<TeachersRoot />} />
              <Route path={routes.PERSONAL} element={<div>Personal</div>} />
              <Route path={routes.STUDENTS} element={<Students />} />
              <Route
                path="*"
                element={
                  <Navigate to={routes.CABINET + routes.DASHBOARD} replace />
                }
              />
            </Routes>
          </ThemeProvider>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Cabinet;
