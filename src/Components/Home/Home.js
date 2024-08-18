import React from "react";
import { Link } from "react-router-dom";
import kindergarten from "../../Assets/Images/HomeCards/kindergarten.jpg";
import learningCenter from "../../Assets/Images/HomeCards/learningCenter.jpg";
import school from "../../Assets/Images/HomeCards/school.jpg";
import * as routes from "../../Constants/routes";
import styles from "./Home.module.css";

const Home = () => {

  const cards = [
    {image: kindergarten, alt: "kindergarten"},
    {image: learningCenter, alt: "learningCenter"},
    {image: school, alt: "school"},
  ]

  return (
    <div className={styles["main"]}>
      <div className={styles["container"]}>
        <div className={styles["title"]}>
          <h1>Выберите свою платформу</h1>
        </div>
        <div className={styles["cards"]}>
        {cards.map((card, index) => (
          <Link to={routes.SIGN_IN} key={index}>
            <img src={card.image} alt={card.alt}/>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
