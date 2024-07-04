import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import * as routes from "../../../Constants/routes";
import api from "../../../Core/api";
import useToggle from "../../../hooks/useToggle";
import LeadsMain from "./LeadsMain/LeadsMain";

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

  const handleUpdateLeadStatus = async (uuid, status) => {
    try {
      const response = await api.post(
        `leads/update-status?uuid=${uuid}&status=${status}`
      );
      console.log("Lead status updated:", response);
      toggleRefresh(true);
    } catch (error) {
      console.error("Error updating lead status:", error);
    }
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        // Выполняем GET-запрос для получения списка курсов
        const response = await api.get("leads");
        // Обновляем состояние courses данными из ответа
        setLeads(response.data);
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

  return (
    <Routes>
      {/* {leads.length > 0 ? ( */}
      <Route
        path={routes.HOME}
        element={
          <LeadsMain
            leads={leads}
            handleDeleteLead={handleDeleteLead}
            handleAddLead={handleAddLead}
            handleUpdateLeadStatus={handleUpdateLeadStatus}
          />
        }
      />
      {/* ) : (
        <></>
      )} */}
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
