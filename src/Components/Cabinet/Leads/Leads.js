import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as routes from "../../../Constants/routes";
import LeadsMain from "./LeadsMain/LeadsMain";

const names = ["Elyorov Ahmad", "Aliyev Shohrux", "Azizova Aziza"];
const statuses = ["recycled", "dead", "inProgress"];

export function createLead({
  id = uuidv4(),
  name = "Azizova Aziza",
  field = "Frontend",
  phoneNumber = "+998330331533",
  additionalPhoneNumber = "+998330331533",
  email = "example@gmail.com",
  leadSource = "Instagram",
  selectedCourseNames = ["Course1", "Course2"],
  courseLanguages = ["Русский", "Узбекский"],
  group = "GR1214-21",
  status = statuses[0],
} = {}) {
  return {
    id,
    name,
    field,
    phoneNumber,
    additionalPhoneNumber,
    email,
    leadSource,
    selectedCourseNames,
    courseLanguages,
    group,
    status,
  };
}

const Leads = () => {
  const [leads, setLeads] = useState([
    createLead({
      name: names[0],
      group: "Frontend GR1214-21",
      status: statuses[0],
    }),
    createLead({
      name: names[1],
      group: "Frontend GR1214-22",
      status: statuses[2],
    }),
    createLead({
      name: names[2],
      group: "Frontend GR1214-23",
      status: statuses[0],
    }),
    createLead({
      name: names[0],
      group: "Frontend GR1214-21",
      status: statuses[2],
    }),
    createLead({
      name: names[1],
      group: "Frontend GR1214-22",
      status: statuses[2],
    }),
    createLead({
      name: names[2],
      group: "Frontend GR1214-23",
      status: statuses[1],
    }),
    createLead({
      name: names[0],
      group: "Frontend GR1214-21",
      status: statuses[2],
    }),
    createLead({
      name: names[1],
      group: "Frontend GR1214-22",
      status: statuses[1],
    }),
    createLead({
      name: names[2],
      group: "Frontend GR1214-23",
      status: statuses[0],
    }),
    createLead({
      name: names[0],
      group: "Frontend GR1214-23",
      status: statuses[2],
    }),
    createLead({
      name: names[2],
      group: "Frontend GR1214-23",
      status: statuses[2],
    }),
    createLead({
      name: names[1],
      group: "Frontend GR1214-23",
      status: statuses[0],
    }),
  ]);

  const handleAddLead = (newLead) => {
    setLeads([...leads, newLead]);
  };

  const handleDeleteLead = (idToDelete) => {
    setLeads(leads.filter((lead) => lead.id !== idToDelete));
  };

  return (
    <Routes>
      <Route
        path={routes.HOME}
        element={
          <LeadsMain
            leads={leads}
            handleDeleteLead={handleDeleteLead}
            handleAddLead={handleAddLead}
          />
        }
      />
      <Route path={routes.PROFILE} element={<div>LEADS PROFILE</div>} />
      <Route path={routes.NEW} element={<div>CREATE NEW LEAD</div>} />
      <Route
        path="*"
        element={<Navigate to={routes.CABINET + routes.LEADS} replace />}
      />
    </Routes>
  );
};

export default Leads;
