import React, { useEffect, useState } from "react";
import StudentsMain from "./StudentsMain/StudentsMain";
import { Navigate, Route, Routes } from "react-router-dom";

import api from "../../../Core/api";

import * as routes from "../../../Constants/routes";
import NewStudent from "./NewStudent/NewStudent";
import StudentProfile from "./StudentProfile/StudentProfile";
import useToggle from "../../../hooks/useToggle";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [refresh, toggleRefresh] = useToggle(false);

  const handleDeleteStudent = async (idToDelete) => {
    const idToDeleteQuoted = `"${idToDelete}"`;
    console.log(idToDeleteQuoted);
    try {
      await api.post("students/delete", idToDeleteQuoted);

      setStudents(students.filter((student) => student.id !== idToDelete));
      toggleRefresh(true);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await api.get("students");

      setStudents(response.data);
      console.log(response.data);
      toggleRefresh(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [refresh]);

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
      <Route
        path={routes.PROFILE}
        element={<StudentProfile handleDeleteStudent={handleDeleteStudent} />}
      />
      <Route
        path={routes.NEW}
        element={<NewStudent fetchStudents={fetchStudents} />}
      />
      <Route
        path={routes.EDIT}
        element={<NewStudent fetchStudents={fetchStudents} />}
      />
      <Route
        path="*"
        element={<Navigate to={routes.CABINET + routes.STUDENTS} replace />}
      />
    </Routes>
  );
};

export default Students;
