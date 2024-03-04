import React, { useState, useRef, useEffect } from "react";
// import "./Home.scss";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

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
        "https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=",
      header: "Canyons",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1479659929431-4342107adfc1?dpr=2&auto=format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=",
      header: "Beaches",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1479644025832-60dabb8be2a1?dpr=2&auto=format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=",
      header: "Trees",
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
      <h1>HOME</h1>
      <Link to="/sign-in">sign in</Link>
      <br />
      <Link to="/dashboard">dashboard</Link>
      <div className={styles["container"]}>
        <h1 className={styles["title"]}>Choose type of your School</h1>
        {cards.map((card, index) => (
          <Card
            key={index}
            dataImage={card.image}
            headerContent={card.header}
            contentContent={card.content}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
