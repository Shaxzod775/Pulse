import React, { useState } from "react";
import styles from "./revenue.module.css";
import RevenueHeader from "./revenue-header/revenue-header";
import CustomLineChart from "./custom-linechart/custom-linechart";

const StaticYear = 2023;
const StaticMonthIndex = 11; // december

// Helper function to check for leap year
const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// Function to get the number of days in a specific month of a specific year
const getDaysInMonth = (year, monthIndex) => {
  return new Date(year, monthIndex + 1, 0).getDate();
};

// Function to generate random data for each day of the year
const generateYearData = () => {
  const days = isLeapYear(StaticYear) ? 366 : 365;
  return Array.from({ length: days }, () => Math.floor(Math.random() * 10));
};

// const WholeData = generateYearData();
const WholeData = [
  5, 8, 2, 0, 0, 2, 0, 1, 7, 8, 4, 1, 5, 6, 4, 3, 6, 3, 6, 5, 1, 5, 2, 9, 0, 2,
  6, 1, 2, 9, 8, 1, 3, 9, 0, 8, 9, 5, 5, 1, 1, 9, 3, 2, 2, 2, 6, 9, 0, 8, 7, 5,
  0, 7, 3, 6, 3, 2, 2, 7, 4, 6, 2, 9, 0, 8, 5, 4, 3, 9, 5, 1, 1, 3, 6, 8, 1, 2,
  4, 4, 5, 0, 6, 2, 8, 4, 7, 3, 8, 9, 7, 2, 3, 0, 0, 7, 1, 3, 0, 5, 6, 4, 1, 5,
  5, 5, 9, 2, 7, 6, 1, 7, 5, 2, 5, 0, 9, 2, 9, 5, 0, 3, 3, 4, 1, 9, 8, 5, 0, 7,
  0, 7, 8, 7, 8, 0, 6, 2, 6, 5, 4, 3, 8, 7, 7, 5, 7, 6, 9, 6, 7, 1, 7, 3, 7, 6,
  5, 4, 0, 6, 4, 5, 9, 2, 7, 0, 4, 4, 2, 6, 3, 9, 1, 0, 4, 3, 7, 2, 7, 2, 9, 2,
  6, 3, 9, 8, 7, 0, 2, 8, 8, 7, 9, 0, 4, 5, 1, 6, 7, 5, 3, 6, 2, 7, 4, 9, 7, 9,
  9, 3, 7, 4, 7, 8, 8, 4, 4, 2, 0, 6, 4, 5, 1, 8, 4, 3, 0, 1, 7, 7, 2, 8, 1, 7,
  1, 1, 0, 2, 5, 6, 1, 7, 1, 1, 8, 3, 7, 0, 9, 9, 1, 3, 1, 5, 9, 7, 7, 9, 9, 0,
  2, 9, 8, 7, 0, 0, 3, 3, 5, 6, 7, 2, 6, 6, 8, 8, 7, 7, 3, 6, 7, 1, 2, 1, 7, 1,
  1, 1, 5, 3, 6, 2, 1, 5, 6, 4, 5, 5, 9, 7, 4, 5, 1, 9, 6, 5, 2, 1, 5, 9, 8, 5,
  4, 0, 0, 0, 1, 4, 9, 0, 3, 6, 0, 3, 4, 0, 7, 8, 8, 9, 0, 9, 0, 8, 7, 7, 3, 1,
  5, 7, 4, 3, 9, 4, 2, 9, 1, 5, 7, 5, 1, 0, 2, 0, 9, 1, 0, 0, 8, 1, 5, 9, 9, 6,
  2,
];

// Function to get data for a specific month
const getMonthData = (wholeData, monthIndex) => {
  const daysInMonth = [
    31,
    isLeapYear(StaticYear) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  const startIndex = daysInMonth
    .slice(0, monthIndex)
    .reduce((acc, days) => acc + days, 0);
  return wholeData.slice(startIndex, startIndex + daysInMonth[monthIndex]);
};

// Function to get monthly data (sum of values for each month)
const getMonthlyData = (wholeData) => {
  const monthlyData = [];
  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    const monthData = getMonthData(wholeData, monthIndex);
    const monthSum = monthData.reduce((acc, val) => acc + val, 0);
    monthlyData.push(monthSum);
  }
  return monthlyData;
};

const Revenue = () => {
  const [activeTime, setActiveTime] = useState("year");

  // Function to determine chart labels
  const getChartLabels = () => {
    switch (activeTime) {
      case "month":
        return Array.from(
          { length: getDaysInMonth(StaticYear, StaticMonthIndex) },
          (_, i) => i + 1
        );
      case "year":
        return [
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
        ];
      default:
        return [];
    }
  };

  // Function to determine which data to display
  const getChartData = () => {
    switch (activeTime) {
      // case "week":
      //   return getLastNDaysData(7);
      case "month":
        return getMonthData(WholeData, StaticMonthIndex);
      case "year":
        return getMonthlyData(WholeData);
      default:
        return [];
    }
  };

  const ChartLabels = getChartLabels();
  const ChartData = getChartData();

  console.log(WholeData);

  return (
    <div className={styles.revenue}>
      {/* <RevenueHeader />
      <CustomLineChart /> */}
      <RevenueHeader activeTime={activeTime} setActiveTime={setActiveTime} />
      <CustomLineChart labels={ChartLabels} data={ChartData} />
    </div>
  );
};

export default Revenue;
