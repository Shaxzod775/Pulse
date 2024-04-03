import React, { useState } from "react";
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
} from "../Cabinet";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import TeacherCard from "./TeacherCard/TeacherCard";
import NewCourseDialog from "../Courses/NewCourseDialog/NewCourseDialog";
import { Icons } from "../../../Assets/Icons/icons";

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

export function createTeacher({
  id = uuidv4(),
  name = "Eshmatov Toshmat",
  contactNumber = "998987654321",
  field = "Front-end",
  techs = ["React", "Node.js", "Ruby on Rails", "Vue.js"],
  groups = 3,
  students = 23,
  startDate = new Date(2024, 4, 3),
  location = "IT Park Tashkent",
} = {}) {
  return {
    id,
    name,
    contactNumber,
    field,
    techs,
    groups,
    students,
    startDate,
    location,
  };
}

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

const Teachers = () => {
  const [open, setOpen] = useState(false);

  const [groups, setGroups] = useState([
    createTeacher({ name: teachers[0], groups: 12 }),
    createTeacher({ name: teachers[1], groups: 4 }),
    createTeacher({ name: teachers[2], groups: 6 }),
    createTeacher({ name: teachers[0], groups: 12 }),
    createTeacher({ name: teachers[1], groups: 4 }),
    createTeacher({ name: teachers[2], groups: 6 }),
    createTeacher({ name: teachers[0], groups: 12 }),
    createTeacher({ name: teachers[1], groups: 4 }),
    createTeacher({ name: teachers[0], groups: 12 }),
    createTeacher({ name: teachers[1], groups: 4 }),
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTeacher = (newGroup) => {
    setGroups([...groups, newGroup]);
  };

  const handleDeleteTeacher = (idToDelete) => {
    setGroups(groups.filter((group) => group.id !== idToDelete));
  };
  return (
    <Root>
      <Main>
        <div className="flex items-stretch justify-between">
          <div className="flex items-center gap-md">
            <IconButton sx={headerItemStyles}>
              <Icons.ArrowL />
            </IconButton>
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
            <ButtonStyled
              variant="contained"
              color="purpleBlue"
              onClick={handleClickOpen}
            >
              <div className="flex items-center gap-x3s">
                <Icons.UserAdd />
                <span>добавить учителя</span>
              </div>
            </ButtonStyled>
          </div>
        </div>
        {/* <Paper
      sx={{ borderRadius: "20px", padding: "32px", boxShadow: "none" }}
    > */}
        <Grid
          container
          justifyContent="center"
          spacing={`${theme.custom.spacing.sm}px`}
          marginBottom={`${theme.custom.spacing.sm}px`}
        >
          {groups.map((group, i) => (
            <Grid item xs="auto" md="auto" lg={2.4} key={i}>
              <TeacherCard {...groups[i]} />
            </Grid>
          ))}
        </Grid>
        {/* </Paper> */}
      </Main>

      <NewCourseDialog
        open={open}
        handleClose={handleClose}
        handleAddCourse={handleAddTeacher}
      />
    </Root>
  );
};

export default Teachers;
