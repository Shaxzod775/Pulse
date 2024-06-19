import React from "react";
import styles from "./Lessons.module.css";
import Circles from "./circles/circles";
import Progress from "./progress/progress";

const Lessons = () => {
  return (
    <div className={styles.lessons}>
      <div className={styles.title}>Уроки</div>
      <div className={styles.circles}>
        <Circles />
      </div>
      <div className={styles.progress}>
        <Progress />
      </div>
    </div>
  );
};

export default Lessons;
