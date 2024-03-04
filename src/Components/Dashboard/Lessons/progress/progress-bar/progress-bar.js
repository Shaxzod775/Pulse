import React from "react";
import styles from "./progress-bar.module.css";

const ProgressBar = ({ label, value, max }) => {
  const percentage = (value / max) * 100;

  return (
    <div className={styles.progressBar}>
      <span className={styles.label}>{label}</span>
      <div className={styles.barNValue}>
        <div className={styles.barContainer}>
          <div
            className={styles.bar}
            style={{
              width: `${percentage}%`,
              backgroundColor: getBarColor(percentage),
            }}
          />
        </div>
        <span
          className={styles.value}
          style={{
            color: getBarColor(percentage),
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

const getBarColor = (percentage) => {
  // Define your logic for color selection here based on percentage
  if (percentage > 75) return "#6e29d4"; // Example color for high percentage
  //   if (percentage > 50) return "#9c27b0"; // Example color for medium percentage
  return "#a19dac"; // Example color for low percentage
};

export default ProgressBar;
