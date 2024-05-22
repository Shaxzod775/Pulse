import React, { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
import GroupsMain from "./GroupsMain/GroupsMain";
import * as routes from "../../../Constants/routes";
import GroupProfile from "./GroupProfile/GroupProfile";

import api from "../../../Core/api";
import useToggle from "../../../hooks/useToggle";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [refreshGroups, toggleRefreshGroups] = useToggle(false);

  const handleDeleteGroup = async (idToDelete) => {
    const idToDeleteQuoted = `"${idToDelete}"`;
    console.log(idToDeleteQuoted);
    try {
      // Отправляем запрос на удаление курса
      await api.post("groups/delete", idToDeleteQuoted);
      toggleRefreshGroups(true);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleAddGroup = async (groupData) => {
    const formData = new FormData();
    const {
      name,
      startDate,
      endDate,
      roomNumber,
      courseTime,
      classDays,
      courseId,
      teacherId,
    } = groupData;

    formData.append(
      "groupData",
      JSON.stringify({
        name: name,
        startDate: startDate,
        endDate: endDate,
        roomNumber: roomNumber,
        courseTime: courseTime,
        classDays: classDays,
        courseId: courseId,
        teacherId: teacherId,
      })
    );

    try {
      // Отправляем запрос на сервер с использованием Axios
      const response = await api.post("groups/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Обрабатываем успешный ответ, если это необходимо
      console.log(response);
      toggleRefreshGroups(true);
    } catch (error) {
      // Обрабатываем ошибки
      console.error("Error submitting course:", error);
      // Можно вывести сообщение об ошибке пользователю или предпринять другие действия
    }
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await api.get("groups/");
        setGroups(response.data);
        console.log(response.data);
        toggleRefreshGroups(false);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    console.log("YO! useEffect");

    // Вызываем функцию для загрузки курсов при монтировании компонента
    fetchGroups();
  }, [refreshGroups]);

  return (
    <Routes>
      <Route
        path={routes.HOME}
        element={
          <GroupsMain
            groups={groups}
            handleAddGroup={handleAddGroup}
            handleDeleteGroup={handleDeleteGroup}
          />
        }
      />
      <Route path={routes.PROFILE} element={<GroupProfile />} />
      <Route
        path="*"
        element={<Navigate to={routes.CABINET + routes.GROUPS} replace />}
      />
    </Routes>
  );
};

export default Groups;
