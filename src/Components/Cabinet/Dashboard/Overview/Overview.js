import React from "react";
import styles from "./Overview.module.css";
import StatusCard from "./status-card/status-card";

const Overview = () => {
  return (
    <div className={styles["overview"]}>
      {/* change={1} means there is no change, change={1.36} means 36% increase. */}
      <StatusCard icon="group" title="Должники" value="5203" change={0.9} />
      <StatusCard icon="payment" title="Оплатившие" value="100" />
      <StatusCard icon="person_remove" title="Покинули группу" value="53" />
      <StatusCard
        title="Доход за сентябрь"
        value="4 000 657 сўм"
        change={1.36}
      />
    </div>
  );
};

export default Overview;
