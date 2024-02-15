import React from "react";
import styles from "./custom-piechart.module.css";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";

const configuration = {
  innerRadius: "54%",
  outerRadius: "90%",
  cornerRadius: 10,
  paddingAngle: 3,
  startAngle: 0,
  endAngle: 360,
  cy: "50%",
  cx: "50%",
};

const size = {
  width: 290,
  height: 325,
  // width: 325,
  // height: 325,
};

const StyledNumberText = styled("text")(({ theme }) => ({
  fill: "#1c274c", // Darker color for the number
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 24, // Larger font size for the number
  fontWeight: "bold", // Bold font weight for the number
}));

const StyledLabelText = styled("text")(({ theme }) => ({
  fill: "#b6b6b6", // Different color for the label
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 16, // Smaller font size for the label
}));

function PieCenterLabel({ average }) {
  const { width, height, left, top } = useDrawingArea();
  const numberY = top + height / 2 - 10; // Adjust Y position for the number
  const labelY = top + height / 2 + 15; // Adjust Y position for the label

  return (
    <>
      <StyledNumberText x={left + width / 2} y={numberY}>
        {average.toFixed(2)}
      </StyledNumberText>
      <StyledLabelText x={left + width / 2} y={labelY}>
        Average Range
      </StyledLabelText>
    </>
  );
}

const CustomPieChart = () => {
  const values = [360, 390, 500, 250];
  const data = [
    { value: values[0], color: "#6e29d4" },
    { value: values[1], color: "#d2befb" },
    { value: values[2], color: "#add3f7" },
    { value: values[3], color: "#0da7ed" },
  ];
  const labels = ["Context add", "Советы", "Сайт", "Instagram"];

  const dataWithLabels = data.map((item, index) => ({
    label: labels[index],
    ...item,
  }));

  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
  const AVERAGE = TOTAL / data.length;

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className={styles.piechartContainer}>
      <div className={styles.piechart}>
        <PieChart
          series={[
            {
              // arcLabel: (item) => `${item.arcLabel ? item.arcLabel : ""}`,
              arcLabel: getArcLabel,
              data,
              highlightScope: { highlighted: "item" },
              highlighted: {
                additionalRadius: 10,
                innerRadius: 80,
                paddingAngle: 6,
              },
              ...configuration,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: "white",
              fontWeight: "bold",
            },
          }}
          {...size}
          margin={{ right: 5 }}
        >
          <PieCenterLabel average={AVERAGE} />
        </PieChart>
      </div>
      <div className={styles.legendContainer}>
        {dataWithLabels.map((item, index) => (
          <div key={index} className={styles.legendItem}>
            <span
              className={styles.legendColorBox}
              style={{ backgroundColor: item.color }}
            ></span>
            <span className={styles.legendText}>{item.label}</span>
            <span className={styles.legendValue}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPieChart;
