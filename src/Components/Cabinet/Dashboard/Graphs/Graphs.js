import React from "react";
import styles from "./Graphs.module.css";
import Revenue from "./revenue/revenue";
import Statistics from "./statistics/statistics";

const Graphs = () => {
  return (
    <div className={styles.graphs}>
      <Revenue />
      <Statistics />
    </div>
  );
};

export default Graphs;
