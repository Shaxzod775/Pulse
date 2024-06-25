import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as routes from "../../../Constants/routes";
import LeadsMain from "./LeadsMain/LeadsMain";
import { leadStatuses } from "../../../Constants/testData";
import api from "../../../Core/api";
import useToggle from "../../../hooks/useToggle";

const names = ["Elyorov Ahmad", "Aliyev Shohrux", "Azizova Aziza"];

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [refresh, toggleRefresh] = useToggle(false);

  const handleDeleteLead = async (idToDelete) => {
    const idToDeleteQuoted = `"${idToDelete}"`;
    try {
      // Отправляем запрос на удаление курса
      await api.post("leads/delete", idToDeleteQuoted);
      toggleRefresh(true);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleAddLead = async (leadData) => {
    try {
      const response = await api.post("leads/create", leadData);
      console.log(response);
      toggleRefresh(true);
    } catch (error) {
      console.error("Error submitting course:", error);
    }
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        // Выполняем GET-запрос для получения списка курсов
        const response = await api.get("leads");
        // Обновляем состояние courses данными из ответа
        setLeads(response.data);
        console.log(response.data);
        toggleRefresh(false);
      } catch (error) {
        // Обрабатываем ошибки
        console.error("Error fetching courses:", error);
        // Можно вывести сообщение об ошибке пользователю или предпринять другие действия
      }
    };

    // Вызываем функцию для загрузки курсов при монтировании компонента
    fetchLeads();
  }, [refresh]);

  const groupedLeads = leads.reduce((acc, lead) => {
    const { status } = lead;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(lead);
    return acc;
  }, {});
  console.log(groupedLeads);

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
