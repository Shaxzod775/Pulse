import React, { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import GroupsMain from "./GroupsMain/GroupsMain";
import * as routes from "../../../Constants/routes";
import GroupProfile from "./GroupProfile/GroupProfile";

export function createGroup({
  id = uuidv4(),
  name = "GR0000-00",
  subject = "Frontend",
  teacher = "Koptleulov Arslan",
  weekDays = [0, 1, 2],
  startDate = new Date(2024, 4, 3),
  endDate = new Date(2024, 7, 3),
  roomNumber = "11",
  duration = 0,
  thumbnail = null,
} = {}) {
  return {
    id,
    name,
    subject,
    teacher,
    weekDays,
    startDate,
    endDate,
    roomNumber,
    duration,
    thumbnail,
  };
}

const Groups = () => {
  const [groups, setGroups] = useState([
    createGroup({ name: "GR011-62", duration: 3 }),
    createGroup({ name: "GR011-61", duration: 3 }),
    createGroup({ name: "GR011-63", duration: 3 }),
    createGroup({ name: "GR011-64", duration: 6 }),
    createGroup({ name: "GR011-65", duration: 9 }),
    createGroup({ name: "GR011-66", duration: 3 }),
    createGroup({ name: "GR011-67", duration: 3 }),
    createGroup({ name: "GR011-68", duration: 3 }),
  ]);

  const handleAddGroup = (newGroup) => {
    setGroups([...groups, newGroup]);
  };

  const handleDeleteGroup = (idToDelete) => {
    setGroups(groups.filter((group) => group.id !== idToDelete));
  };

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
