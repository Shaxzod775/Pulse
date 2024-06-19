import React from "react";
import styles from "./circles.module.css";
import { PieChart } from "@mui/x-charts/PieChart";
import PiechartLabeled from "./piechart-labeled/piechart-labeled";

const Circles = () => {
  const values = [24, 28, 39];
  const dataActive = [
    { value: values[0], color: "#04b87b", arcLabel: `${values[0]}` },
    { value: values[1], color: "#fff3ea" },
    { value: values[2], color: "#fdeaec" },
  ];
  const dataSelection = [
    { value: values[0], color: "#e9f8f3" },
    { value: values[1], color: "#f79b16", arcLabel: `${values[1]}` },
    { value: values[2], color: "#fdeaec" },
  ];
  const dataFinished = [
    { value: values[0], color: "#e9f8f3" },
    { value: values[1], color: "#fff3ea" },
    { value: values[2], color: "#f22f28", arcLabel: `${values[2]}` },
  ];
  return (
    <div className={styles.circles}>
      <PiechartLabeled data={dataActive} label={"Активные"} />
      <PiechartLabeled data={dataSelection} label={"Набор"} />
      <PiechartLabeled data={dataFinished} label={"Завершено"} />
    </div>
  );
};

export default Circles;
