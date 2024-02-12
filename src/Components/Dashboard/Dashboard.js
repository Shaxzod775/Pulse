import React from "react";
import styles from "./Dashboard.module.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className={styles["dashboard"]}>
      <div className={styles["dashboard-sidebar"]}>
        <Sidebar />
      </div>
      <div className={styles["dashboard-main"]}>
        <Header />
        <div className={styles["dashboard-content"]}>
          {/* Content will go here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
