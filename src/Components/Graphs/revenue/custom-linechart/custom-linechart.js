import React, { useState, useEffect, useRef } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import styles from "./custom-linechart.module.css";

const year = 1990; // replace with the year you want
const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

const CustomLineChart = () => {
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

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales",
        data: [
          15000, 21000, 18000, 22000, 26000, 30000, 25000, 27000, 30000, 35000,
          32000, 28000,
        ],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Data",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

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
            data: months,
            scaleType: "time",
            valueFormatter: (date) =>
              date.toLocaleString("default", { month: "short" }),
          },
        ]}
        series={[
          {
            id: "MySeries",
            curve: "catmullRom",
            data: [105, 345, 789, 656, 890, 234, 567, 901, 112, 678, 345, 987],
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
