import React from "react";
import DashboardMain from "./Dashboard-main/Dashboard-main";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles["dashboard"]}>
      <DashboardMain />
    </div>
  );
};

export default Dashboard;
