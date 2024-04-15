import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as routes from "../../../Constants/routes";
import LeadsMain from "./LeadsMain/LeadsMain";

const names = ["Eshmatov Toshmat", "Aliyev Shohrux", "Azizova Aziza"];

export function createLead({
  id = uuidv4(),
  name = "Azizova Aziza",
  field = "Front-end",
  techs = ["React", "UI/UX", "Node.js", "Ruby on Rails", "Vue.js"],
  contactNumber = "998987654321",
  email = "example@gmail.com",
  group = "Front-end GR1214-21",
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

const Leads = () => {
  const [leads, setLeads] = useState([
    createLead({ name: names[0], group: "Front-end GR1214-21" }),
    createLead({ name: names[1], group: "Front-end GR1214-22" }),
    createLead({ name: names[2], group: "Front-end GR1214-23" }),
    createLead({ name: names[0], group: "Front-end GR1214-21" }),
    createLead({ name: names[1], group: "Front-end GR1214-22" }),
    createLead({ name: names[2], group: "Front-end GR1214-23" }),
    createLead({ name: names[0], group: "Front-end GR1214-21" }),
    createLead({ name: names[1], group: "Front-end GR1214-22" }),
    createLead({ name: names[2], group: "Front-end GR1214-23" }),
    createLead({ name: names[2], group: "Front-end GR1214-23" }),
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
          <LeadsMain leads={leads} handleDeleteLead={handleDeleteLead} />
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
