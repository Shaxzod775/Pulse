import React, { useEffect } from "react";
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
import TeachersMain from "./Teachers/TeachersMain/TeachersMain";
import StudentsMain from "./Students/StudentsMain/StudentsMain";
import Teachers from "./Teachers/Teachers";
import Students from "./Students/Students";
import { theme } from "./CabinetStyles";
import Leads from "./Leads/Leads";
import { CoursesProvider } from "../../contexts/Courses.context";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, selectCoursesStatus } from "../../Slices/coursesSlice";
import {
  fetchTeachers,
  selectTeachersStatus,
} from "../../Slices/teachersSlice";

const Cabinet = () => {
  const dispatch = useDispatch();
  const coursesStatus = useSelector(selectCoursesStatus);
  const teachersStatus = useSelector(selectTeachersStatus);

  useEffect(() => {
    if (coursesStatus === "idle") {
      dispatch(fetchCourses());
    }
  }, [coursesStatus, dispatch]);

  useEffect(() => {
    if (teachersStatus === "idle") {
      dispatch(fetchTeachers());
    }
  }, [teachersStatus, dispatch]);

  return (
    <>
      <div className={styles["cabinet"]}>
        <Sidebar />
        <div className={styles["cabinet-main"]}>
          <Header />
          {/* <div className={styles["cabinet-content"]}> */}
          <ThemeProvider theme={theme}>
            <CoursesProvider>
              <Routes>
                <Route path={routes.DASHBOARD} element={<Dashboard />} />
                <Route path={routes.COURSES} element={<Courses />} />
                <Route path={routes.LEADS + "/*"} element={<Leads />} />
                <Route path={routes.GROUPS + "/*"} element={<Groups />} />
                <Route path={routes.TEACHERS + "/*"} element={<Teachers />} />
                <Route path={routes.PERSONAL} element={<div>Personal</div>} />
                <Route path={routes.STUDENTS + "/*"} element={<Students />} />
                <Route
                  path="*"
                  element={
                    <Navigate to={routes.CABINET + routes.DASHBOARD} replace />
                  }
                />
              </Routes>
            </CoursesProvider>
          </ThemeProvider>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default Cabinet;
