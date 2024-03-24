import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import * as routes from "../../Constants/routes";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Dashboard from "./Dashboard/Dashboard";
import styles from "./Cabinet.module.css";
import Groups from "./Groups/Groups";

const Cabinet = () => {
  return (
    <>
      <div className={styles["cabinet"]}>
        <Sidebar />
        <div className={styles["cabinet-main"]}>
          <Header />
          <div className={styles["cabinet-content"]}>
            <Routes>
              <Route path={routes.DASHBOARD} element={<Dashboard />} />
              <Route path={routes.COURSES} element={<div>Courses</div>} />
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Cabinet;
