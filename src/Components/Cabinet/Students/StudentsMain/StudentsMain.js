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

const teachers = ["Eshmatov Toshmat", "Aliyev Shohrux", "Azizova Aziza"];

export function createStudent({
  id = uuidv4(),
  name = "Azizova Aziza",
  field = "Front-end",
  techs = ["React", "UI/UX", "Node.js", "Ruby on Rails", "Vue.js"],
  contactNumber = "998987654321",
  email = "example@gmail.com",
  group = "Front-end GR1214-21",
  teacher = "Eshmatov Toshmat",
  startDate = new Date(2024, 4, 3),
  endDate = new Date(2024, 10, 3),
  balance = 1120000,
} = {}) {
  return {
    id,
    name,
    field,
    techs,
    contactNumber,
    email,
    group,
    teacher,
    startDate,
    endDate,
    balance,
  };
}

const StudentsMain = ({ students, handleDeleteStudent }) => {
  const [open, setOpen] = useState(false);

  // const [students, setStudents] = useState([
  //   createStudent({ name: teachers[0], group: "Front-end GR1214-21" }),
  //   createStudent({ name: teachers[1], group: "Front-end GR1214-22" }),
  //   createStudent({ name: teachers[2], group: "Front-end GR1214-23" }),
  //   createStudent({ name: teachers[0], group: "Front-end GR1214-21" }),
  //   createStudent({ name: teachers[1], group: "Front-end GR1214-22" }),
  //   createStudent({ name: teachers[2], group: "Front-end GR1214-23" }),
  //   createStudent({ name: teachers[0], group: "Front-end GR1214-21" }),
  //   createStudent({ name: teachers[1], group: "Front-end GR1214-22" }),
  //   createStudent({ name: teachers[2], group: "Front-end GR1214-23" }),
  //   createStudent({ name: teachers[2], group: "Front-end GR1214-23" }),
  // ]);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This navigates one step back in history
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleAddStudent = (newGroup) => {
  //   setGroups([...groups, newGroup]);
  // };

  // const handleDeleteStudent = (idToDelete) => {
  //   setGroups(groups.filter((group) => group.id !== idToDelete));
  // };
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
            <ButtonStyled
              variant="outlined"
              color="purpleBlue"
              onClick={handleClickOpen}
            >
              <div className="flex items-center gap-x3s">
                <Icons.InboxIn />
                <span>Скачать список</span>
              </div>
            </ButtonStyled>
            <Link to={routes.CABINET + routes.STUDENTS + routes.NEW}>
              <ButtonStyled
                variant="contained"
                color="purpleBlue"
                onClick={handleClickOpen}
              >
                <div className="flex items-center gap-x3s">
                  <Icons.UserAdd />
                  <span>добавить ученика</span>
                </div>
              </ButtonStyled>
            </Link>

            <ButtonStyled
              variant="outlined"
              color="purpleBlue"
              onClick={handleClickOpen}
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
              overflowY: "scroll",
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

      {/* <NewCourseDialog
        open={open}
        handleClose={handleClose}
        handleAddCourse={handleAddStudent}
      /> */}
    </Root>
  );
};

export default StudentsMain;
