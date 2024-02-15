import React from "react";
import styles from "./statistics.module.css";
import CustomPieChart from "./custom-piechart/custom-piechart";

const Statistics = () => {
  return (
    <div className={styles.statistics}>
      <div className={styles["statistics-header"]}>
        <div className={styles["header-title"]}>Статистика</div>
        <div className={styles["header-desc"]}>Источнок лидов</div>
      </div>
      <CustomPieChart />
    </div>
  );
};

export default Statistics;
