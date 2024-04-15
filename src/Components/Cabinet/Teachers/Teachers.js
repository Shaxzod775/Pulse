import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as routes from "../../../Constants/routes";
import TeachersMain from "./TeachersMain/TeachersMain";
import NewTeacher from "./NewTeacher/NewTeacher";
import TeacherProfile from "./TeacherProfile/TeacherProfile";

const teacherNames = ["Eshmatov Toshmat", "Aliyev Shohrux", "Azizova Aziza"];

export function createTeacher({
  id = uuidv4(),
  name = "Eshmatov Toshmat",
  contactNumber = "998987654321",
  field = "Front-end",
  techs = ["React", "Node.js", "Ruby on Rails", "Vue.js"],
  groups = 3,
  students = 23,
  startDate = new Date(2024, 4, 3),
  location = "IT Park Tashkent",
} = {}) {
  return {
    id,
    name,
    contactNumber,
    field,
    techs,
    groups,
    students,
    startDate,
    location,
  };
}

const Teachers = () => {
  const [open, setOpen] = useState(false);

  const [teachers, setTeachers] = useState([
    createTeacher({ name: teacherNames[0], groups: 12 }),
    createTeacher({ name: teacherNames[1], groups: 4 }),
    createTeacher({ name: teacherNames[2], groups: 6 }),
    createTeacher({ name: teacherNames[0], groups: 12 }),
    createTeacher({ name: teacherNames[1], groups: 4 }),
    createTeacher({ name: teacherNames[2], groups: 6 }),
    createTeacher({ name: teacherNames[0], groups: 12 }),
    createTeacher({ name: teacherNames[1], groups: 4 }),
    createTeacher({ name: teacherNames[0], groups: 12 }),
    createTeacher({ name: teacherNames[1], groups: 4 }),
    createTeacher({ name: teacherNames[1], groups: 4 }),
    createTeacher({ name: teacherNames[2], groups: 6 }),
    createTeacher({ name: teacherNames[0], groups: 12 }),
    createTeacher({ name: teacherNames[1], groups: 4 }),
    createTeacher({ name: teacherNames[0], groups: 12 }),
  ]);

  const handleAddTeacher = (newGroup) => {
    setTeachers([...teachers, newGroup]);
  };

  const handleDeleteTeacher = (idToDelete) => {
    setTeachers(teachers.filter((group) => group.id !== idToDelete));
  };

  return (
    <Routes>
      <Route
        path={routes.HOME}
        element={
          <TeachersMain
            teachers={teachers}
            handleDeleteTeacher={handleDeleteTeacher}
          />
        }
      />
      <Route path={routes.PROFILE} element={<TeacherProfile />} />
      <Route path={routes.NEW} element={<NewTeacher />} />
      <Route
        path="*"
        element={<Navigate to={routes.CABINET + routes.TEACHERS} replace />}
      />
    </Routes>
  );
};

export default Teachers;
