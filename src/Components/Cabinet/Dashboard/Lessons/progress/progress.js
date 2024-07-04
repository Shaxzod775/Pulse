import React from "react";
import ProgressBar from "./progress-bar/progress-bar";
import styles from "./progress.module.css";
import Scale from "./scale/scale";

const Progress = () => {
  // Define your max value based on the scale you want to use, for example, 40
  const maxValue = 120;
  const divisions = 4; // Since we want 5 indicators
  return (
    <div className={styles.progress}>
      <ProgressBar label="Математика" value={120} max={maxValue} />
      <ProgressBar label="Русский язык" value={80} max={maxValue} />
      <ProgressBar label="Узбекский язык" value={53} max={maxValue} />
      <Scale max={maxValue} divisions={divisions} />
    </div>
  );
};

export default Progress;
