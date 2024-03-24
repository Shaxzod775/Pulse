import React, { useState } from "react";
import styles from "./revenue-header.module.css";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const RevenueHeader = ({ activeTime, setActiveTime, month, setMonth }) => {
  // const [activeTime, setActiveTime] = useState("year"); // Initialize with "year" as the default active time
  const change = 1.36;

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleTimeSwitch = (time) => {
    setActiveTime(time);
  };

  return (
    <div className={styles.header}>
      {/* Implement your header content here */}
      <div className={styles.title}>Доход 2023</div>
      {/* <p>4.765.000 UZS + 36% (2022)</p> */}
      <div className={styles.headerContent}>
        <div className={styles["value-box"]}>
          <div className={styles.value}>4.765.000 UZS</div>
          <div
            className={`${styles.change} ${
              change >= 1 ? styles.increase : styles.decrease
            }`}
          >
            <div>
              {change > 1 ? "+" : ""}
              {((change - 1) * 100).toFixed()}%
            </div>
            <Icon className={styles["change-icon"]}>
              {change >= 1 ? "arrow_upward" : "arrow_downward"}
            </Icon>
            <div className={styles["change-time"]}>(2022)</div>
          </div>
        </div>
        <div className={styles.timeSwitch}>
          <div
            className={activeTime === "week" ? styles.active : ""}
            onClick={() => handleTimeSwitch("week")}
          >
            Неделя
          </div>
          <div
            className={activeTime === "month" ? styles.active : ""}
            onClick={() => handleTimeSwitch("month")}
          >
            Месяц
          </div>
          <div
            className={activeTime === "year" ? styles.active : ""}
            onClick={() => handleTimeSwitch("year")}
          >
            Год
          </div>
        </div>
      </div>
      <>
        {activeTime === "month" && (
          <Box sx={{ maxWidth: 125 }} className={styles.formBox}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Month</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={month}
                label="Month"
                onChange={handleMonthChange}
              >
                <MenuItem value={0}>January</MenuItem>
                <MenuItem value={1}>February</MenuItem>
                <MenuItem value={2}>March</MenuItem>
                <MenuItem value={3}>April</MenuItem>
                <MenuItem value={4}>May</MenuItem>
                <MenuItem value={5}>June</MenuItem>
                <MenuItem value={6}>July</MenuItem>
                <MenuItem value={7}>August</MenuItem>
                <MenuItem value={8}>September</MenuItem>
                <MenuItem value={9}>October</MenuItem>
                <MenuItem value={10}>November</MenuItem>
                <MenuItem value={11}>December</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
      </>
    </div>
  );
};

export default RevenueHeader;
