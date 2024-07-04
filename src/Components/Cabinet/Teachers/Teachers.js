import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import * as routes from "../../../Constants/routes";
import NewTeacher from "./NewTeacher/NewTeacher";
import TeacherProfile from "./TeacherProfile/TeacherProfile";
import TeachersMain from "./TeachersMain/TeachersMain";

const Teachers = () => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<TeachersMain />} />
      <Route path={routes.PROFILE} element={<TeacherProfile />} />
      <Route path={routes.NEW} element={<NewTeacher />} />
      <Route path={routes.EDIT} element={<NewTeacher />} />
      <Route
        path="*"
        element={<Navigate to={routes.CABINET + routes.TEACHERS} replace />}
      />
    </Routes>
  );
};

export default Teachers;
