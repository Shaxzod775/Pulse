import { ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import * as routes from "../../Constants/routes";
import { CoursesProvider } from "../../contexts/Courses.context";
import { fetchCourses, selectCoursesStatus } from "../../Slices/coursesSlice";
import { fetchGroups, selectGroupsStatus } from "../../Slices/groupsSlice";
import {
  fetchStudents,
  selectStudentsStatus,
} from "../../Slices/studentsSlice";
import {
  fetchTeachers,
  selectTeachersStatus,
} from "../../Slices/teachersSlice";
import styles from "./Cabinet.module.css";
import { theme } from "./CabinetStyles";
import Courses from "./Courses/Courses";
import Dashboard from "./Dashboard/Dashboard";
import Groups from "./Groups/Groups";
import Header from "./Header/Header";
import Leads from "./Leads/Leads";
import Sidebar from "./Sidebar/Sidebar";
import Students from "./Students/Students";
import Teachers from "./Teachers/Teachers";

const Cabinet = () => {
  const dispatch = useDispatch();
  const coursesStatus = useSelector(selectCoursesStatus);
  const teachersStatus = useSelector(selectTeachersStatus);
  const groupsStatus = useSelector(selectGroupsStatus);
  const studentsStatus = useSelector(selectStudentsStatus);

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

  useEffect(() => {
    if (groupsStatus === "idle") {
      dispatch(fetchGroups());
    }
  }, [groupsStatus, dispatch]);

  useEffect(() => {
    if (studentsStatus === "idle") {
      dispatch(fetchStudents());
    }
  }, [studentsStatus, dispatch]);

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
