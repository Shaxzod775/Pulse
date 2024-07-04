import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import StudentsMain from "./StudentsMain/StudentsMain";

import * as routes from "../../../Constants/routes";
import NewStudent from "./NewStudent/NewStudent";
import StudentProfile from "./StudentProfile/StudentProfile";

const Students = () => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<StudentsMain />} />
      <Route path={routes.PROFILE} element={<StudentProfile />} />
      <Route path={routes.NEW} element={<NewStudent />} />
      <Route path={routes.EDIT} element={<NewStudent />} />
      <Route
        path="*"
        element={<Navigate to={routes.CABINET + routes.STUDENTS} replace />}
      />
    </Routes>
  );
};

export default Students;
