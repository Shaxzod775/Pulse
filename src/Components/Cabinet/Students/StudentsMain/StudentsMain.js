import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as routes from "../../../../Constants/routes";
import {
  Button,
  ButtonBase,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import {
  theme,
  ButtonStyled,
  ContentHeader,
  Main,
  Root,
  Title,
  TextFieldStyled,
  SelectStyled,
} from "../../CabinetStyles";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import StudentCard from "../StudentCard/StudentCard";
import { Icons } from "../../../../Assets/Icons/icons";

const headerItemStyles = ({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: "#fff",
  border: "1px solid #E5E7EB",
});

const HeaderDiv = styled("div")(({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: "#fff",
  border: "1px solid #E5E7EB",
}));

const StudentsMain = ({ students, handleDeleteStudent }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This navigates one step back in history
  };

  return (
    <Root sx={{ maxHeight: "calc(100% - 122px)", display: "flex" }}>
      <Main>
        <div className="flex items-stretch justify-between">
          <div className="flex items-center gap-md">
            <ButtonStyled
              variant="outlined"
              sx={headerItemStyles}
              color="grey"
              onClick={goBack}
            >
              <Icons.ArrowL />
            </ButtonStyled>
            <Title>Ученики</Title>
            <div className="flex items-stretch gap-xxs full-height">
              <HeaderDiv className="flex items-stretch full-height p-r-xxs2 p-l-xxs2">
                <div className="flex items-center">
                  <Icons.Search
                    style={{ boxSizing: "content-box", paddingRight: "8px" }}
                    color="#E5E7EB"
                  />
                  <InputBase
                    sx={{ color: theme.typography.color.darkBlue }}
                    placeholder="Поиск по ученику..."
                  />
                </div>
              </HeaderDiv>
            </div>
          </div>

          <div className="flex items-center gap-sm">
            <Link to={routes.CABINET + routes.STUDENTS + routes.NEW}>
              <ButtonStyled variant="contained" color="purpleBlue">
                <div className="flex items-center gap-x3s">
                  <Icons.UserAdd />
                  <span>Добавить ученика</span>
                </div>
              </ButtonStyled>
            </Link>
            <ButtonStyled variant="outlined" color="purpleBlue">
              <div className="flex items-center gap-x3s">
                <Icons.InboxIn />
                <span>Скачать список</span>
              </div>
            </ButtonStyled>

            <ButtonStyled
              variant="outlined"
              color="purpleBlue"
              sx={{ minWidth: "0" }}
            >
              <Icons.MenuDots />
            </ButtonStyled>
          </div>
        </div>
        <Paper
          sx={{
            borderRadius: "20px",
            height: "90%",
            padding: "32px",
            boxShadow: "none",
          }}
        >
          <div
            style={{
              maxHeight: "100%",
              paddingRight: "32px",
              overflowY: "auto",
            }}
          >
            <Grid
              container
              justifyContent="start"
              spacing={`${12}px`}
              marginBottom={`${theme.custom.spacing.sm}px`}
            >
              {students.map((student, i) => (
                <Grid item xs="auto" md="auto" lg={3} key={i}>
                  <StudentCard
                    {...student}
                    handleDeleteStudent={handleDeleteStudent}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </Paper>
      </Main>
    </Root>
  );
};

export default StudentsMain;
