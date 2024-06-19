import React, { useEffect, useState } from "react";
import * as routes from "../../../Constants/routes";
import {
  Box,
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
  TypographyStyled,
  CustomCheckbox,
} from "../CabinetStyles";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import CourseCard from "./CourseCard/CourseCard";
import NewCourseDialog from "./NewCourseDialog/NewCourseDialog";
import { Icons } from "../../../Assets/Icons/icons";
import { useNavigate, Link } from "react-router-dom";
import CoursesList from './CoursesList/CoursesList'
import {
  useCourses,
  useCoursesDispatch,
} from "../../../contexts/Courses.context";
import { addCourse, deleteCourse } from "../../../reducers/courses.reducer";

import api from "../../../Core/api";

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
  const [courses, setCourses] = useState([]);

  const [selectedCoursesIds, setSelectedCoursesIds] = useState([]);

  const [isGrid, setIsGrid] = useState(false);

  const areAllCoursessSelected = courses.length > 0 && selectedCoursesIds.length === courses.length;

  
  const handleSelectCourse = (id) => {
    setSelectedCoursesIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((courseId) => courseId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAllCourses = (selectAll) => {
    if (selectAll) {
      setSelectedCoursesIds(courses.map((course) => course.id));
    } else {
      setSelectedCoursesIds([]);
    }
  };

  const handleDeleteSelectedCourses = (allCoursesIDs) => {
    if (allCoursesIDs.length > 0) {
      selectedCoursesIds.map((courseID) => (handleDeleteCourse(courseID)))
    }
    else {
      console.log("Выберите курсы для удаления")
    }
  }


  const handleAddCourse = () => {
    console.log("Добавлен курс");
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Выполняем GET-запрос для получения списка курсов
        const response = await api.get("courses");
        // Обновляем состояние courses данными из ответа
        setCourses(response.data);
      } catch (error) {
        // Обрабатываем ошибки
        console.error("Error fetching courses:", error);
        // Можно вывести сообщение об ошибке пользователю или предпринять другие действия
      }
    };

    // Вызываем функцию для загрузки курсов при монтировании компонента
    fetchCourses();
  }, []); // Пустой массив зависимостей означает, что эффект будет выполняться только один раз при монтировании компонента

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

  const handleDeleteCourse = async (idToDelete) => {
    const idToDeleteQuoted = `"${idToDelete}"`;
    console.log(idToDeleteQuoted);
    try {
      // Отправляем запрос на удаление курса
      await api.post("courses/delete", idToDeleteQuoted);

      // Если удаление прошло успешно, обновляем состояние courses, убирая удаленный курс
      setCourses(courses.filter((course) => course.id !== idToDelete));
    } catch (error) {
      // Обрабатываем ошибки
      console.error("Error deleting course:", error);
      // Можно вывести сообщение об ошибке пользователю или предпринять другие действия
    }
  };

  return (
    <Root
    // sx={{ maxHeight: "calc(100% - 122px)", display: "flex" }}
    >
      <Main sx={{ maxHeight: "calc(100vh - 42px)" }}>
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
            {selectedCoursesIds.length <= 0 ? (
                  <>
                    <ButtonStyled
                      onClick={() => setIsGrid(!isGrid)}
                      variant="contained"
                      sx={{
                        color: 'white',
                        backgroundColor: 'white',
                        '&:hover': {
                          backgroundColor: 'white',
                        },
                      }}
                    >
                      <div className="flex items-center gap-x3s">
                        {isGrid ? <Icons.ListIcon /> : <Icons.List />}
                      </div>
                    </ButtonStyled>
                      <ButtonStyled variant="contained" color="purpleBlue" onClick={handleClickOpen}>
                        <div className="flex items-center gap-x3s">
                          <Icons.AddCircle  />
                          <span>Создать курс</span>
                        </div>
                      </ButtonStyled>
                  </>
                ) : (
                  <Box className="flex flex-row items-center" gap="25px">
                    <Box className="flex flex-row" gap="5px">
                      <Icons.ListSelected />
                      <TypographyStyled sx={{ color: "#6574D8", fontSize: "14px"}}>
                        Выбрано {selectedCoursesIds.length}
                      </TypographyStyled>
                    </Box>
                    <Box className="flex flex-row items-center" gap="5px" >
                      <ButtonStyled
                        variant="contained"
                        onClick={() => setSelectedCoursesIds([])}
                        sx={{
                          color: '#6574D8',
                          border: '1px solid #6574D8',
                          backgroundColor: 'white',
                          width:"100px",
                          paddingX:"20px",
                          paddingY:"10px",
                          fontSize:"14px",
                          '&:hover': {
                            backgroundColor: 'white',
                          },
                        }}>
                        Отменить
                      </ButtonStyled>
                      <ButtonStyled
                        variant="contained"
                        sx={{
                          color: 'white',
                          backgroundColor: '#6574D8',
                          width:"100px",
                          paddingX:"20px",
                          paddingY:"10px",
                          fontSize:"14px",
                          '&:hover': {
                            backgroundColor: '#6574D8',
                          },
                        }}
                        onClick={() => handleDeleteSelectedCourses(selectedCoursesIds)}>
                        Удалить
                      </ButtonStyled>
                    </Box>
                  </Box>
                )}
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
            overflowY: "hidden",
            overflowX: "hidden",
          }}
        >
         {!isGrid ? <Grid
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
          : <Box className="flex flex-col" backgroundColor="white" border="1px solid #E5E7EB" borderRadius="20px" paddingX="30px">
              <Box className="flex flew-row justify-between"  sx={{ paddingY:"15px", paddingRight:"34px", paddingLeft:"51px", background:"#F9F9F9", borderRadius:"29px",
                          marginRight:"60px", marginLeft:"20px", marginTop:"40px", fontFamily: "Poppins", fontStyle: "normal", fontWeight: "600", fontSize: "11px", textAlign: "center", 
                          color: "#7D8594", width: "auto" }}>
                <Box className="flex flex-row justify-between items-center" position="relative"  >
                  <CustomCheckbox checked={areAllCoursessSelected} onChange={(e) => handleSelectAllCourses(e.target.checked)}/>
                  <Typography>
                    Название курса
                  </Typography>
                </Box>
                <Box className="flex flex-row items-center" position="relative">
                  <Box width="auto" position="relative" right="525px">
                    <Typography>
                      Дата завершения
                    </Typography>
                  </Box>
                  <Typography position="relative" right="465px">
                    Группа
                  </Typography>
                  <Typography position="relative" right="365px">
                    Номер
                  </Typography>
                  <Typography position="relative" right="245px">
                    Почта
                  </Typography>
                  <Typography position="relative" right="85px">
                    Учитель
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ position:"relative", overflowX:"hidden", overflowY:"scroll", marginBottom:"15px", maxHeight:"75vh" }}>
              {courses.map((course, i)  => (
                <CoursesList
                  keyId={i}  
                  {...course}
                  handleDeleteCourse={handleDeleteCourse}
                  selectedCoursesIds={selectedCoursesIds} 
                  handleSelectCourse={handleSelectCourse} 
                  handleSelectAllCourses={handleSelectAllCourses}
                  areAllCoursessSelected={areAllCoursessSelected} 
                  />
              ))}
              </Box>
            </Box> 
            }
        </div>
      </Main>

      <NewCourseDialog
        open={open}
        handleClose={handleClose}
        handleAddCourse={handleAddCourse}
        courses={courses}
      />
    </Root>
  );
};

export default Courses;
