import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as routes from "../../../Constants/routes";
import TeachersMain from "./TeachersMain/TeachersMain";
import NewTeacher from "./NewTeacher/NewTeacher";
import TeacherProfile from "./TeacherProfile/TeacherProfile";

import api from "../../../Core/api";
import { useSelector } from "react-redux";
import { selectAllTeachers } from "../../../Slices/teachersSlice";

const teacherNames = [
  "Koptleulov Arslan",
  "Ilya Starodubtsev",
  "Aziz Mamajonov",
  "Muhammad Matchonov",
];

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
