import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as routes from "../../../Constants/routes";
import TeachersMain from "./TeachersMain/TeachersMain";
import NewTeacher from "./NewTeacher/NewTeacher";
import TeacherProfile from "./TeacherProfile/TeacherProfile";

import api from "../../../Core/api";

const teacherNames = [
  "Koptleulov Arslan",
  "Ilya Starodubtsev",
  "Aziz Mamajonov",
  "Muhammad Matchonov",
];

export function createTeacher({
  id = uuidv4(),
  name = "Eshmatov Toshmat",
  contactNumber = "998987654321",
  field = "Frontend",
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

  const [teachers, setTeachers] = useState([]);

  // const handleAddTeacher = (newGroup) => {
  //   setTeachers([...teachers, newGroup]);
  // };

  const handleDeleteTeacher = async(idToDelete) => {

    const idToDeleteQuoted = `"${idToDelete}"`;
    console.log(idToDeleteQuoted)
    try {
      
      await api.post('teachers/delete', idToDeleteQuoted );
      
      
      setTeachers(teachers.filter((teacher) => teacher.id !== idToDelete));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
    
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        
        const response = await api.get('teachers');
        
        setTeachers(response.data);
        console.log(response.data)
      } catch (error) {
        
        console.error('Error fetching courses:', error);
       
      }
    };

    
    fetchTeachers();
  }, [])

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
