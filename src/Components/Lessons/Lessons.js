import React from "react";
import styles from "./Lessons.module.css";
import Circles from "./circles/circles";

const Lessons = () => {
  return (
    <div className={styles.lessons}>
      <div className={styles.title}>Уроки</div>
      <div className={styles.circles}>
        <Circles />
      </div>
      <div className={styles.bars}>bars</div>
    </div>
  );
};

export default Lessons;
