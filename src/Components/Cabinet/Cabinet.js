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

export const theme = createTheme({
  palette: {
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
  width: `calc(100vw - ${
    theme.custom.sidebarOpenWidth + theme.custom.spacing.sm * 2
  }px)`,
  fontFamily: "Rubik",
  "& .flex": {
    display: "flex",
  },
  "& .flex-column": {
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
  "& .justify-between": {
    justifyContent: "space-between",
  },
  "& .justify-around": {
    justifyContent: "space-around",
  },
  "& .gap-x4s": {
    gap: theme.custom.spacing.x4s,
  },
  "& .gap-x3s": {
    gap: theme.custom.spacing.x3s,
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
  "& .full-width": {
    width: "100%",
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
  fontSize: theme.typography.fontSize.lg,
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
  borderRadius: theme.shape.borderRadius,
  font: "inherit",
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.fontSize.sm,
  padding: theme.custom.spacing.xs,
  textTransform: "capitalize",
  boxShadow: "none",
  "&:hover": { boxShadow: "none" },
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
  borderRadius: theme.shape.borderRadius,
  font: "inherit",
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.fontSize.md,
  color: "inherit",
  "& .MuiInputBase-root .MuiInputBase-input": {
    padding: `${theme.custom.spacing.xxs}px ${theme.custom.spacing.sm}px`,
    borderRadius: theme.custom.spacing.xs,
  },
}));

export const AutocompleteStyled = styled(Autocomplete)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  font: "inherit",
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.fontSize.md,
  color: "inherit",
  "& .MuiInputBase-root": {
    padding: "0",
  },
  "& .MuiInputBase-root .MuiInputBase-input": {
    padding: `${theme.custom.spacing.xxs}px ${theme.custom.spacing.sm}px`,
  },
  "& .MuiSvgIcon-root": {
    width: theme.custom.spacing.sm,
    height: "auto",
  },
}));

const Cabinet = () => {
  return (
    <>
      <div className={styles["cabinet"]}>
        <Sidebar />
        <div className={styles["cabinet-main"]}>
          <Header />
          <div className={styles["cabinet-content"]}>
            <ThemeProvider theme={theme}>
              <Routes>
                <Route path={routes.DASHBOARD} element={<Dashboard />} />
                <Route path={routes.COURSES} element={<Courses />} />
                <Route path={routes.GROUPS} element={<Groups />} />
                <Route path={routes.LEADS} element={<div>Leads</div>} />
                <Route path={routes.PERSONAL} element={<div>Personal</div>} />
                <Route path={routes.STUDENTS} element={<div>Students</div>} />
                <Route
                  path="*"
                  element={
                    <Navigate to={routes.CABINET + routes.DASHBOARD} replace />
                  }
                />
              </Routes>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cabinet;
