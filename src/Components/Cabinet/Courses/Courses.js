import React, { useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Typography,
  Paper,
  styled,
} from "@mui/material";
import {
  theme,
  ButtonStyled,
  ContentHeader,
  Main,
  Root,
  Title,
  SelectStyled,
} from "../CabinetStyles";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import CourseCard from "./CourseCard/CourseCard";
import NewCourseDialog from "./NewCourseDialog/NewCourseDialog";
import { Icons } from "../../../Assets/Icons/icons";
import { useNavigate } from "react-router-dom";
import {
  useCourses,
  useCoursesDispatch,
} from "../../../contexts/Courses.context";
import { addCourse, deleteCourse } from "../../../reducers/courses.reducer";

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

const DialogButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.custom.spacing.sm,
  padding: theme.custom.spacing.xxs,
  font: "inherit",
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.fontSize.sm,
  textTransform: "none",
  boxShadow: "none",
  "&:hover": { boxShadow: "none" },
}));

const teachers = [
  "Koptleulov Arslan",
  "Ilya Starodubtsev",
  "Aziz Mamajonov",
  "Muhammad Matchonov",
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

export function createCourse({
  id = uuidv4(),
  name = "python",
  price = 1000000,
  // currency = "so'm",
  duration = 3, // in months
  // startDate = new Date(2024, 4, 3),
  // endDate = new Date(2024, 7, 3),
  thumbnail = null,
} = {}) {
  return {
    id,
    name,
    price,
    // currency,
    duration,
    // startDate,
    // endDate,
    thumbnail,
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

const Courses = () => {
  const [open, setOpen] = useState(false);

  const { courses } = useCourses();
  const coursesDispatch = useCoursesDispatch();

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

  const handleAddCourse = (newCourse) => {
    // setCourses([...courses, newCourse]);
    coursesDispatch(addCourse(newCourse));
  };

  const handleDeleteCourse = (idToDelete) => {
    // setCourses(courses.filter((course) => course.id !== idToDelete));
    coursesDispatch(deleteCourse(idToDelete));
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
            <Title>Курсы</Title>
          </div>

          <div className="flex items-center gap-sm">
            <ButtonStyled
              variant="contained"
              color="purpleBlue"
              onClick={handleClickOpen}
            >
              <div className="flex items-center gap-xs">
                <Icons.AddCircle />
                <span>Создать курс</span>
              </div>
            </ButtonStyled>
          </div>
        </div>
        {/* <Paper
          sx={{
            borderRadius: "20px",
            height: "90%",
            padding: "32px",
            boxShadow: "none",
          }}
        > */}
        <div
          style={{
            flexGrow: "1",
            // maxHeight: "100%",
            paddingRight: "32px",
            overflowY: "auto",
          }}
        >
          <Grid
            container
            justifyContent="start"
            columnSpacing={"32px"}
            rowSpacing={"18px"}
            marginBottom={`${theme.custom.spacing.sm}px`}
          >
            {courses.map((course, i) => (
              <Grid item xs="auto" md="auto" lg={3} key={i}>
                <CourseCard
                  {...course}
                  handleDeleteCourse={handleDeleteCourse}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        {/* </Paper> */}
      </Main>

      <NewCourseDialog
        open={open}
        handleClose={handleClose}
        handleAddCourse={handleAddCourse}
      />
    </Root>
  );
};

export default Courses;
