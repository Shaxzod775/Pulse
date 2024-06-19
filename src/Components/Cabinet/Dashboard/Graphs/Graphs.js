import React from "react";
import Revenue from "./revenue/revenue";
import Statistics from "./statistics/statistics";
import styles from "./Graphs.module.css";

const Graphs = () => {
  return (
    <div className={styles.graphs}>
      <Revenue />
      <Statistics />
    </div>
  );
};

export default Graphs;
