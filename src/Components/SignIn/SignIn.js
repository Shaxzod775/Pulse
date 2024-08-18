import React, { useState } from "react";
import styles from "./SignIn.module.css";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import * as routes from "../../Constants/routes";
import api from "../../Core/api";
import { useGlobal } from "../../Core/global";

const SignInLogo = require("../../Assets/Images/SignIn.png");
const ThreeTriangles = require("../../Assets/Images/ThreeTriangles.png");
const Sun = require("../../Assets/Images/Sun.png");

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const login = useGlobal((state) => state.login);

  const handleSignIn = async () => {
    try {
      const response = await api.post("auth/login", {
        username: email, // Передаем email вместо username
        password: password,
      });
      // Обработка успешного входа, например, редирект на домашнюю страницу
      console.log("Успешный вход:", response.data);
      login(response.data);
    } catch (error) {
      console.error("Ошибка входа:", error.response.data);
      setMessage("Неправильно введён логин или пароль!")
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles["SignIn"]}>
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
                id="outlined-required"
                type="email"
                autoComplete="current-password"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите почту"
                required
                sx={{
                  width: "100%",
                  marginBottom: "15px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& .MuiInputBase-input": {
                      padding: "12px 10px",
                    },
                  },
                }}
              />
              <TextField
                id="outlined-password-input"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                required
                sx={{
                  width: "100%",
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
          </div>
          <div className={styles["button-container"]}>
            {message && <p>{message}</p>}
            <Button
              variant="contained"
              onClick={() => handleSignIn()}
              sx={{
                backgroundColor: "#6574D8",
                borderRadius: "12px",
                padding: "10px",
                "&:hover": {
                  backgroundColor: "#6574D8",
                },
              }}
            >
              Войти
            </Button>
          </div>
          <Link to={routes.HOME} className={styles["forgot-password"]}>
            забыли пароль?
          </Link>
        </div>
        <div className={styles["SignIn-ImageBox"]}>
          <img src={SignInLogo} alt="SignInLogo" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
