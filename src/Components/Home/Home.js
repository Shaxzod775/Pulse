import React from "react";
// import "./Home.scss";
import { Link } from "react-router-dom";
import kindergarten from "../../Assets/Images/HomeCards/kindergarten.jpg";
import learningCenter from "../../Assets/Images/HomeCards/learningCenter.jpg";
import school from "../../Assets/Images/HomeCards/school.jpg";
import * as routes from "../../Constants/routes";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles["main"]}>
      <div className={styles["container"]}>
        <div className={styles["title"]}>
          <h1>Выберите свою платформу</h1>
        </div>
        <div className={styles["cards"]}>
          <Link to={routes.SIGN_IN}>
            <img src={kindergarten} alt="kindergarden" />
          </Link>
          <Link to={routes.SIGN_IN}>
            <img src={learningCenter} alt="learningCenter" />
          </Link>
          <Link to={routes.SIGN_IN}>
            <img src={school} alt="school" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
