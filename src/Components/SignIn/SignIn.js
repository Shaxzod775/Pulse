import React, { useState } from "react";
import styles from "./SignIn.module.css";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Visibility,
  VisibilityOff,
  WbSunnyOutlined,
  NightlightOutlined,
} from "@mui/icons-material";
import * as routes from "../../Constants/routes";
import api from "../../Core/api";
import { useGlobal } from "../../Core/global";

<<<<<<< HEAD
const Logo = require("../../Assets/Images/Logo.png");
const LogoClosed = require("../../Assets/Images/LogoClosed.png");
const LogoScanning = require("../../Assets/Images/LogoScanning.png");
=======
const SignInLogo = require("../../Assets/Images/SignIn.png");
const ThreeTriangles = require("../../Assets/Images/ThreeTriangles.png");
const Sun = require("../../Assets/Images/Sun.png");
>>>>>>> source-repo/main

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useGlobal((state) => state.login)

  const handleSignIn = async () => {
    try {
      const response = await api.post("auth/login", { 
      username: email, // Передаем email вместо username
      password: password });
      // Обработка успешного входа, например, редирект на домашнюю страницу
      console.log("Успешный вход:", response.data);
      login(response.data)
    } catch (error) {
      console.error("Ошибка входа:", error.response.data);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className={styles["SignIn"]}>
<<<<<<< HEAD
      <div className={styles["signIn-box"]}>
        <div className={styles["logo"]}>
          <img src={showPassword ? Logo : LogoClosed} alt="Logo" />
          <div className={styles["logo-title"]}>Вход в систему с CRM ID</div>
        </div>
        <div className={styles["form"]}>
          <div className={`${styles["text-input"]}`}>
            <div className={styles["label"]}>Почта</div>
            <TextField
=======
      <div className={styles["SignIn-Container"]}>
        <div className={styles["SignIn-Box"]}>
            <div className={styles["icons"]}>
              <img src={ThreeTriangles} alt="ThreeTriangles" />
              <img src={Sun} alt="Sun" />
            </div>
          <h1>Войти в Систему</h1>
         <div className={styles["form"]}>
          <div className={`${styles["text-input"]}`}>
          <TextField
>>>>>>> source-repo/main
              id="outlined-required"
              type="email"
              autoComplete="current-password"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
<<<<<<< HEAD
              sx={{
=======
              placeholder="Введите почту"
              sx={{
                width: "100%",
                marginBottom: "15px",
>>>>>>> source-repo/main
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "& .MuiInputBase-input": {
                    padding: "12px 10px",
                  },
                },
              }}
            />
<<<<<<< HEAD
          </div>
          {/* <div className={`${styles["text-input"]}`}>
            <div className={styles["label"]}>Пароль</div>
            <TextField
              id="outlined-password-input"
              type="password"
              autoComplete="current-password"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "& .MuiInputBase-input": {
                    padding: "12px 10px",
                  },
                },
              }}
            />
          </div> */}
          <div className={`${styles["text-input"]}`}>
            <div className={styles["label"]}>Пароль</div>
=======
>>>>>>> source-repo/main
            <TextField
              id="outlined-password-input"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
              sx={{
=======
              placeholder="Введите пароль"
              sx={{
                width: "100%",
>>>>>>> source-repo/main
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "& .MuiInputBase-input": {
                    padding: "12px 10px",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
<<<<<<< HEAD
          <Button
            variant="contained"
            onClick={handleSignIn}
            sx={{
              backgroundColor: "#00988f",
              borderRadius: "10px",
              padding: "12px 10px",
              "&:hover": {
                backgroundColor: "#00988f",
              },
            }}
          >
            Войти
          </Button>
          <Link to={routes.HOME} className={styles["forgot-password"]}>
            <div>Забыли пароль?</div>
          </Link>
        </div>
      </div>
      <div className={styles["footer"]}>
        <WbSunnyOutlined />
        <div className={styles["footer-btns"]}>
          <div className={styles["footer-btn"]}>Состояние системы</div>
          <div className={styles["footer-divider"]}></div>
          <div className={styles["footer-btn"]}>
            Политика конфиденциальности
          </div>
          <div className={styles["footer-divider"]}></div>
          <div className={styles["footer-btn"]}>Условия и положения</div>
        </div>
        <div className={styles["copyright"]}>
          Copyright © 2024. Все права защищены.
        </div>
      </div>
=======
         </div> 
         <Button 
          variant="contained"
          onClick={handleSignIn}
          sx={{
            backgroundColor: "#6574D8",
            borderRadius: "12px",
            padding: "10px",
            "&:hover": {
              backgroundColor: "#6574D8",
            }
          }}
          >
          Войти
         </Button>
         <Link to={routes.HOME} className={styles["forgot-password"]}>    
            <div>Забыли Пароль?</div>
         </Link>
        </div>
        <div className={styles['SignIn-ImageBox']}>
          <img src={SignInLogo} alt="SignInLogo" />
        </div>
      </div>     
>>>>>>> source-repo/main
    </div>
  );
};

export default SignIn;
