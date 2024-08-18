import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
import * as routes from "../../../Constants/routes";
import GroupProfile from "./GroupProfile/GroupProfile";
import GroupsMain from "./GroupsMain/GroupsMain";

const Groups = () => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<GroupsMain />} />
      <Route path={routes.PROFILE} element={<GroupProfile />} />
      <Route
        path="*"
        element={<Navigate to={routes.CABINET + routes.GROUPS} replace />}
      />
    </Routes>
  );
};

export default Groups;
