import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as routes from "../../../Constants/routes";
import LeadsMain from "./LeadsMain/LeadsMain";
import { leadStatuses } from "../../../Constants/testData";
import api from "../../../Core/api";



const names = ["Elyorov Ahmad", "Aliyev Shohrux", "Azizova Aziza"];



const Leads = () => {
  const [leads, setLeads] = useState([]);

  const handleAddLead = () => {
    console.log('Обновлено')
  };

  const handleDeleteLead = async(idToDelete) => {
    const idToDeleteQuoted = `"${idToDelete}"`;
    try {
      // Отправляем запрос на удаление курса
      await api.post('leads/delete', idToDeleteQuoted );
      
    
      setLeads(leads.filter((lead) => lead.id !== idToDelete));
    } catch (error) {
    
      console.error('Error deleting course:', error);
      
    }

    
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        // Выполняем GET-запрос для получения списка курсов
        const response = await api.get('leads');
        // Обновляем состояние courses данными из ответа
        setLeads(response.data);
      } catch (error) {
        // Обрабатываем ошибки
        console.error('Error fetching courses:', error);
        // Можно вывести сообщение об ошибке пользователю или предпринять другие действия
      }
    };

    // Вызываем функцию для загрузки курсов при монтировании компонента
    fetchLeads();
  }, [handleAddLead])
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
