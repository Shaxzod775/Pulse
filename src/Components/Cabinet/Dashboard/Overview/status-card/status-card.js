import Icon from "@mui/material/Icon";
import React from "react";
import styles from "./status-card.module.css";

const StatusCard = ({ icon, title, value, change }) => {
  return (
    <div className={styles.card}>
      {icon && (
        <div className={styles["icon-container"]}>
          <Icon className={styles.icon}>{icon}</Icon>
        </div>
      )}
      <div className={styles.details}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>{value}</div>
        {change && (
          <>
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
