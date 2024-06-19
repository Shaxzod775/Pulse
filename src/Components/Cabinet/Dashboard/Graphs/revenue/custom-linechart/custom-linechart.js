import React, { useState, useEffect, useRef } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import styles from "./custom-linechart.module.css";

// const year = 1990; // replace with the year you want
// const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

const CustomLineChart = ({ labels, data }) => {
  const chartContainerRef = useRef(null); // Create a ref for the container div
  const [chartWidth, setChartWidth] = useState(0); // State to keep track of the chart width
  const [chartHeight, setChartHeight] = useState(0); // State to keep track of the chart height

  // Use a ResizeObserver to listen for changes in the size of the chartContainerRef
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Set the chart width to 80% of the parent container's width
        // setChartWidth(entry.contentRect.width * 0.8);
        setChartWidth(entry.contentRect.width);

        setChartHeight(entry.contentRect.height);
      }
    });

    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    return () => resizeObserver.disconnect(); // Clean up the observer on component unmount
  }, []);

  return (
    <div
      ref={chartContainerRef}
      className={styles.chartContainer}
      style={{ width: "100%", flex: 1 }}
    >
      <LineChart
        sx={{
          ".MuiAreaElement-series-MySeries": {
            fill: "url('#myGradient')",
          },
        }}
        xAxis={[
          {
            data: labels,
            scaleType: "point",
          },
        ]}
        series={[
          {
            id: "MySeries",
            curve: "catmullRom",
            data: data,
            // data: [105, 345, 789, 656, 890, 234, 567, 901, 112, 678, 345, 987],
            //   data: [
            //     789, 845, 987, 1023, 1100, 1156, 876, 945, 1001, 1123, 1189, 1200,
            //   ],
            color: "#8757fe",
            showMark: false,
            area: true,
          },
        ]}
        width={chartWidth}
        height={chartHeight}
      >
        <defs>
          <linearGradient id="myGradient" gradientTransform="rotate(90)">
            <stop offset="5%" stopColor="#b8b0de" />
            <stop offset="95%" stopColor="white" />
          </linearGradient>
        </defs>
      </LineChart>
    </div>
  );
};

export default CustomLineChart;
