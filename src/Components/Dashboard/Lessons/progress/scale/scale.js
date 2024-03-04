import React from "react";
import styles from "./scale.module.css";

const Scale = ({ max, divisions }) => {
  const generateScaleMarks = () => {
    let marks = [];
    for (let i = 0; i <= divisions; i++) {
      marks.push(
        <div key={i} className={styles.mark}>
          {Math.round((max / divisions) * i)}
        </div>
      );
    }
    return marks;
  };

  return <div className={styles.scaleContainer}>{generateScaleMarks()}</div>;
};

export default Scale;
