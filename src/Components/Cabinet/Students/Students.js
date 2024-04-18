import React, { useState } from "react";
import StudentsMain from "./StudentsMain/StudentsMain";
import { Navigate, Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as routes from "../../../Constants/routes";
import NewStudent from "./NewStudent/NewStudent";
import StudentProfile from "./StudentProfile/StudentProfile";

const studentNames = ["Madina Azizova", "Mariya Ivanova"];

export function createStudent({
  id = uuidv4(),
  name = "Aziza Azizova",
  field = "Frontend",
  techs = ["React", "UI/UX", "Node.js", "Ruby on Rails", "Vue.js"],
  contactNumber = "998987654321",
  email = "example@gmail.com",
  group = "Frontend GR1214-21",
  teacher = "Eshmatov Toshmat",
  startDate = new Date(2024, 4, 3),
  endDate = new Date(2024, 10, 3),
  balance = 1120000,
} = {}) {
  return {
    id,
    name,
    field,
    techs,
    contactNumber,
    email,
    group,
    teacher,
    startDate,
    endDate,
    balance,
  };
}

const Students = () => {
  const [students, setStudents] = useState([
    createStudent({ name: studentNames[0], group: "Frontend GR1214-21" }),
    createStudent({ name: studentNames[1], group: "Frontend GR1214-22" }),
    createStudent({ name: studentNames[2], group: "Frontend GR1214-23" }),
    createStudent({ name: studentNames[0], group: "Frontend GR1214-21" }),
    createStudent({ name: studentNames[1], group: "Frontend GR1214-22" }),
    createStudent({ name: studentNames[2], group: "Frontend GR1214-23" }),
    createStudent({ name: studentNames[0], group: "Frontend GR1214-21" }),
    createStudent({ name: studentNames[1], group: "Frontend GR1214-22" }),
    createStudent({ name: studentNames[2], group: "Frontend GR1214-23" }),
    createStudent({ name: studentNames[2], group: "Frontend GR1214-23" }),
  ]);

  console.log(students);

  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const handleDeleteStudent = (idToDelete) => {
    setStudents(students.filter((student) => student.id !== idToDelete));
  };

  return (
    <Routes>
      <Route
        path={routes.HOME}
        element={
          <StudentsMain
            students={students}
            handleDeleteStudent={handleDeleteStudent}
          />
        }
      />
      <Route path={routes.PROFILE} element={<StudentProfile />} />
      <Route path={routes.NEW} element={<NewStudent />} />
      <Route
        path="*"
        element={<Navigate to={routes.CABINET + routes.STUDENTS} replace />}
      />
    </Routes>
  );
};

export default Students;
