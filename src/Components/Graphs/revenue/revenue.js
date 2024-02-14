import React from "react";
import styles from "./revenue.module.css";
import RevenueHeader from "./revenue-header/revenue-header";
import CustomLineChart from "./custom-linechart/custom-linechart";

const Revenue = () => {
  return (
    <div className={styles.revenue}>
      <RevenueHeader />
      <CustomLineChart />
    </div>
  );
};

export default Revenue;
