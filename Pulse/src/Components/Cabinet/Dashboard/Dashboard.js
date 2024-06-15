import React from "react";
import styles from "./Dashboard.module.css";
import DashboardMain from "./Dashboard-main/Dashboard-main";

const Dashboard = () => {
  return (
    <div className={styles["dashboard"]}>
      <DashboardMain />
    </div>
  );
};

export default Dashboard;
