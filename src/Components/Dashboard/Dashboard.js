import React from "react";
import styles from "./Dashboard.module.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import DashboardMain from "../Dashboard-main/Dashboard-main";

const Dashboard = () => {
  return (
    <div className={styles["dashboard"]}>
      <div className={styles["dashboard-sidebar"]}>
        <Sidebar />
      </div>
      <div className={styles["dashboard-main"]}>
        <Header />
        <div className={styles["dashboard-content"]}>
          <DashboardMain />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
