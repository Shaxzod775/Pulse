import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import styles from "./custom-linechart.module.css";

const year = 1990; // replace with the year you want
const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

const CustomLineChart = () => {
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
      width={800}
      height={300}
    >
      <defs>
        <linearGradient id="myGradient" gradientTransform="rotate(90)">
          <stop offset="5%" stopColor="#b8b0de" />
          <stop offset="95%" stopColor="white" />
        </linearGradient>
      </defs>
    </LineChart>
  );
};

export default CustomLineChart;
