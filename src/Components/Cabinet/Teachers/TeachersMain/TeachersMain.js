import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as routes from "../../../../Constants/routes";
import { Grid, IconButton, InputBase, Paper, styled } from "@mui/material";
import { theme, ButtonStyled, Main, Root, Title } from "../../CabinetStyles";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import TeacherCard from "../TeacherCard/TeacherCard";
import NewCourseDialog from "../../Courses/NewCourseDialog/NewCourseDialog";
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

const teachers = [
  "Коптлеулов Арслан",
  "Илья Стародубцев",
  "Азиз Мамаджонов",
  "Мухаммад Матчонов",
];
const techs = [
  "JavaScript",
  "Django",
  "Python",
  "GitHub",
  "React",
  "Node.js",
  "Ruby on Rails",
  "Vue.js",
  "Angular",
  "Flask",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Heroku",
  "CSS",
  "HTML",
  "TypeScript",
  "GraphQL",
];

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
    />
  );
});
NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const TeachersMain = ({ teachers, handleDeleteTeacher }) => {
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
            <Title>Учителя</Title>
            <div className="flex items-stretch gap-xxs full-height">
              <HeaderDiv className="flex items-stretch full-height p-r-xxs2 p-l-xxs2">
                <div className="flex items-center">
                  <Icons.Search
                    style={{ boxSizing: "content-box", paddingRight: "8px" }}
                    color="#E5E7EB"
                  />
                  <InputBase
                    sx={{ color: theme.typography.color.darkBlue }}
                    placeholder="Поиск по учителю..."
                  />
                </div>
              </HeaderDiv>
            </div>
          </div>

          <div className="flex items-center gap-sm">
            <Link
              to={routes.CABINET + routes.TEACHERS + routes.NEW}
              className="link"
            >
              <ButtonStyled
                variant="contained"
                color="purpleBlue"
                // onClick={handleClickOpen}
              >
                <div className="flex items-center gap-x3s">
                  <Icons.UserAdd />
                  <span>Добавить учителя</span>
                </div>
              </ButtonStyled>
            </Link>
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
              // spacing={`${12}px`}
              columnSpacing={"32px"}
              rowSpacing={"18px"}
              marginBottom={`${theme.custom.spacing.sm}px`}
            >
              {teachers.map((teacher, i) => (
                <Grid item xs="auto" md="auto" lg={3} key={i}>
                  <TeacherCard
                    {...teacher}
                    handleDeleteTeacher={handleDeleteTeacher}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </Paper>
      </Main>

      {/* <NewCourseDialog
        open={open}
        handleClose={handleClose}
        handleAddCourse={handleAddTeacher}
      /> */}
    </Root>
  );
};

export default TeachersMain;
