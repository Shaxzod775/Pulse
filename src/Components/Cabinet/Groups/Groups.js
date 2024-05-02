import React, { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
import GroupsMain from "./GroupsMain/GroupsMain";
import * as routes from "../../../Constants/routes";
import GroupProfile from "./GroupProfile/GroupProfile";

import api from "../../../Core/api";

// export function createGroup({
//   id = uuidv4(),
//   name = "GR0000-00",
//   subject = "Frontend",
//   teacher = "Koptleulov Arslan",
//   weekDays = [0, 1, 2],
//   startDate = new Date(2024, 4, 3),
//   endDate = new Date(2024, 7, 3),
//   roomNumber = "11",
//   duration = 0,
//   thumbnail = null,
// } = {}) {
//   return {
//     id,
//     name,
//     subject,
//     teacher,
//     weekDays,
//     startDate,
//     endDate,
//     roomNumber,
//     duration,
//     thumbnail,
//   };
// }

const Groups = () => {
  const [groups, setGroups] = useState([]);

  const handleAddGroup = () => {
    console.log('Обновлено')
  };

  const handleDeleteGroup = async (idToDelete) => {
    const idToDeleteQuoted = `"${idToDelete}"`;
    console.log(idToDeleteQuoted)
    try {
      // Отправляем запрос на удаление курса
      await api.post('groups/delete', idToDeleteQuoted);



      setGroups(groups.filter((group) => group.id !== idToDelete));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await api.get('groups/');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    // Вызываем функцию для загрузки курсов при монтировании компонента
    fetchGroups();
  }, [handleAddGroup])

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
