import React from "react";
import styles from "./Dashboard-main.module.css";
import Overview from "../Overview/Overview";
import Lessons from "../Lessons/Lessons";
import Graphs from "../Graphs/Graphs";

const DashboardMain = () => {
  return (
    <div className={styles["dashboard-main"]}>
      <Overview />
      <Lessons />
      <Graphs />
    </div>
  );
};

export default DashboardMain;
