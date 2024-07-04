import React from "react";
import Graphs from "../Graphs/Graphs";
import Lessons from "../Lessons/Lessons";
import Overview from "../Overview/Overview";
import styles from "./Dashboard-main.module.css";

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
