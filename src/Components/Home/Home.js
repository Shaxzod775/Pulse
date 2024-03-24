import React, { useState, useRef, useEffect } from "react";
// import "./Home.scss";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import * as routes from "../../Constants/routes";

const Card = ({ dataImage, headerContent, contentContent }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const cardRef = useRef(null);
  let mouseLeaveDelay;

  useEffect(() => {
    setWidth(cardRef.current.offsetWidth);
    setHeight(cardRef.current.offsetHeight);
  }, []);

  const handleMouseMove = (e) => {
    setMouseX(e.pageX - cardRef.current.offsetLeft - width / 2);
    setMouseY(e.pageY - cardRef.current.offsetTop - height / 2);
  };

  const handleMouseEnter = () => {
    clearTimeout(mouseLeaveDelay);
  };

  const handleMouseLeave = () => {
    mouseLeaveDelay = setTimeout(() => {
      setMouseX(0);
      setMouseY(0);
    }, 1000);
  };

  const mousePX = mouseX / width;
  const mousePY = mouseY / height;

  const cardStyle = {
    transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`,
  };

  const cardBgTransform = {
    transform: `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`,
  };

  const cardBgImage = {
    backgroundImage: `url(${dataImage})`,
  };

  return (
    <div
      className={styles["card-wrap"]}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <div className={styles["card"]} style={cardStyle}>
        <div
          className={styles["card-bg"]}
          style={{ ...cardBgTransform, ...cardBgImage }}
        ></div>
        <div className={styles["card-info"]}>
          <h1>{headerContent}</h1>
          <p>{contentContent}</p>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const cards = [
    {
      image:
        "https://images.adsttc.com/media/images/53ae/0e31/c07a/8079/0f00/0039/newsletter/PORT_LITTLE_EXPLORERS_2.jpg?1403915790",
      header: "Kindergarden",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    {
      image:
        "https://media.consumeraffairs.com/files/cache/news/Students_raising_hands_in_classroom_skynesher_Getty_Images_large.webp",
      header: "School",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    {
      image:
        "https://www.theedadvocate.org/wp-content/uploads/2017/05/6-660x400.jpg",
      header: "Learning Center",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    // {
    //   image:
    //     "https://images.unsplash.com/photo-1479621051492-5a6f9bd9e51a?dpr=2&auto=format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=",
    //   header: "Lakes",
    //   content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    // },
  ];
  return (
    <div>
      <Link
        to={routes.SIGN_IN}
        className={styles["signIn-btn"]}
        style={{ margin: "20px" }}
      >
        sign in
      </Link>
      <br />
      <h1 className={styles["title"]}>Choose type of your School</h1>
      <div className={styles["container"]}>
        {cards.map((card, index) => (
          <Link to={routes.CABINET}>
            <Card
              key={index}
              dataImage={card.image}
              headerContent={card.header}
              contentContent={card.content}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
