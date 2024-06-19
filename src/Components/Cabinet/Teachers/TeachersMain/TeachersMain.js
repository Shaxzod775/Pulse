import React, { useEffect, useState } from "react";
import { Link, useInRouterContext, useNavigate } from "react-router-dom";
import * as routes from "../../../../Constants/routes";
import {
  Box,
  Grid,
  IconButton,
  InputBase,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  styled,
  Typography,
} from "@mui/material";
import {
  theme,
  ButtonStyled,
  Main,
  Root,
  Title,
  InputBaseStyledV2,
  selectStylesV2,
  customMenuProps,
  CustomCheckbox,
  TypographyStyled,
} from "../../CabinetStyles";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import TeacherCard from "../TeacherCard/TeacherCard";
import NewCourseDialog from "../../Courses/NewCourseDialog/NewCourseDialog";
import { Icons } from "../../../../Assets/Icons/icons";
import { useCourses } from "../../../../contexts/Courses.context";
import useInput from "../../../../hooks/useInput";
import useDebounce from "../../../../hooks/useDebounce";
import TeachersList from "../TeachersList/TeachersList"

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
  const { allCourseNames } = useCourses();

  const [filteredTeachers, setFilteredTeacheres] = useState(teachers);

  const [teacherSearch, changeTeacherSearch, resetTeacherSearch] = useInput("");

  const [selectedTeacherStatuses, setSelectedTeacherStatuses] = useState(["0"]);

  const [selectedCourses, setSelectedCourses] = useState(["0"]);

  const [selectedTeacherIds, setSelectedTeacherIds] = useState([]);

  const [anchorThreeDots, setAnchorThreeDots] = useState(null);
  const threeDotsMenuOpen = Boolean(anchorThreeDots);

  const handleSelectTeacher = (id) => {
    setSelectedTeacherIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((teacherId) => teacherId !== id)
        : [...prevSelected, id]
    );
  };


  const handleSelectAllTeachers = (selectAll) => {
    if (selectAll) {
      setSelectedTeacherIds(filteredTeachers.map((teacher) => teacher.id));
    } else {
      setSelectedTeacherIds([]);
    }
  };

  const handleDeleteSelectedTeachers = (allTeachersIDs) => {
    if (allTeachersIDs.length > 0) {
      selectedTeacherIds.map((teacherID) => (handleDeleteTeacher(teacherID)))
    }
    else {
      console.log("Выберите учеников для удаления")
    }
  }

  const areAllTeachersSelected = filteredTeachers.length > 0 && selectedTeacherIds.length === filteredTeachers.length;

  const handleClearFilters = () => {
    resetTeacherSearch();
    setSelectedTeacherStatuses(["0"]);
    setSelectedCourses(["0"]);
  };

  const handleChangeMultipleSelect = (setter) => (event) => {
    const {
      target: { value },
    } = event;
    setter(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSearchFilter = (searchInput) => {
    const lowerCaseSearchInput = searchInput.toLowerCase().trim().split(" ");
    const filtered = teachers.filter((teacher) => {
      const fullName = [
        teacher.firstName.toLowerCase(),
        teacher.middleName.toLowerCase(),
        teacher.lastName.toLowerCase(),
      ];
      return lowerCaseSearchInput.every((input) =>
        fullName.some((name) => name.includes(input))
      );
    });
    setFilteredTeacheres(filtered);
  };
  const [isGrid, setIsGrid] = useState(false);

  const goBack = () => {
    navigate(-1); // This navigates one step back in history
  };

  useDebounce(
    () => {
      if (teacherSearch !== "") {
        handleSearchFilter(teacherSearch);
      } else {
        setFilteredTeacheres(teachers);
      }
    },
    1000,
    [teacherSearch, teachers]
  );

  useEffect(() => setFilteredTeacheres(teachers), [teachers]);

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
            <Title>Учителя</Title>
            <div className="flex items-stretch gap-xxs full-height">
              <InputBaseStyledV2
                value={teacherSearch}
                onChange={changeTeacherSearch}
                placeholder="Поиск по учителю..."
                sx={{
                  position: "relative",
                  minWidth: "240px",
                  width: "240px",
                  color: theme.typography.color.darkBlue,
                  "& .MuiInputBase-input": { paddingLeft: "36px" },
                }}
                startAdornment={
                  <Icons.Search
                    color="#AEB2BA"
                    width="20px"
                    style={{ position: "absolute", left: "8px", zIndex: "1" }}
                  />
                }
              />
              <Select
                multiple
                required
                value={selectedTeacherStatuses}
                onChange={handleChangeMultipleSelect(
                  setSelectedTeacherStatuses
                )}
                renderValue={(selected) => {
                  if (selected.length === 1) return "Статус учителя";
                  return selected.slice(1).join(", ");
                }}
                MenuProps={customMenuProps}
                sx={{ ...selectStylesV2({ theme }), minWidth: "240px" }}
                input={<InputBaseStyledV2 />}
                IconComponent={Icons.ArrowDBold}
              >
                {[
                  "Действующие учители",
                  "Teacher status 1",
                  "Teacher status 2",
                  "Teacher status 3",
                ].map((groupStatus) => (
                  <MenuItem key={groupStatus} value={groupStatus}>
                    <CustomCheckbox
                      checked={
                        selectedTeacherStatuses.indexOf(groupStatus) > -1
                      }
                    />
                    <ListItemText primary={groupStatus} />
                  </MenuItem>
                ))}
              </Select>
              <Select
                multiple
                required
                value={selectedCourses}
                onChange={handleChangeMultipleSelect(setSelectedCourses)}
                renderValue={(selected) => {
                  if (selected.length === 1) return "Все курсы";
                  return selected.slice(1).join(", ");
                }}
                MenuProps={customMenuProps}
                sx={{ ...selectStylesV2({ theme }), minWidth: "200px" }}
                input={<InputBaseStyledV2 />}
                IconComponent={Icons.ArrowDBold}
              >
                {allCourseNames.map((courseName) => (
                  <MenuItem key={courseName} value={courseName}>
                    <CustomCheckbox
                      checked={selectedCourses.indexOf(courseName) > -1}
                    />
                    <ListItemText primary={courseName} />
                  </MenuItem>
                ))}
              </Select>
              <ButtonStyled
                variant="outlined"
                color="purpleBlue"
                onClick={handleClearFilters}
              >
                Сбросить фильтр
              </ButtonStyled>
            </div>
          </div>

          <div className="flex items-center gap-sm">
            {selectedTeacherIds.length <= 0 ? (
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
                  <Link to={`${routes.CABINET}${routes.TEACHERS}${routes.NEW}`}>
                    <ButtonStyled variant="contained" color="purpleBlue">
                      <div className="flex items-center gap-x3s">
                        <Icons.UserAdd />
                        <span>Добавить учителя</span>
                      </div>
                    </ButtonStyled>
                  </Link>
                </>
              ) : (
                <Box className="flex flex-row items-center" gap="25px">
                  <Box className="flex flex-row" gap="5px">
                    <Icons.ListSelected />
                    <TypographyStyled sx={{ color: "#6574D8", fontSize: "14px"}}>
                      Выбрано {selectedTeacherIds.length}
                    </TypographyStyled>
                  </Box>
                  <Box className="flex flex-row items-center" gap="5px" >
                    <ButtonStyled
                      variant="contained"
                      onClick={() => setSelectedTeacherIds([])}
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
                      onClick={() => handleDeleteSelectedTeachers(selectedTeacherIds)}>
                      Удалить
                    </ButtonStyled>
                  </Box>
                </Box>
              )}
          </div>
        </div>
        <div
          style={{
            maxHeight: "100%",
            paddingRight: "32px",
            overflowY: "auto",
          }}
        >
         {!isGrid ? <Grid
            container
            justifyContent="start"
            // spacing={`${12}px`}
            columnSpacing={"32px"}
            rowSpacing={"18px"}
            marginBottom={`${theme.custom.spacing.sm}px`}
          >
            {filteredTeachers.map((teacher, i) => (
              <Grid item xs="auto" md="auto" lg={3} key={i}>
                <TeacherCard
                  {...teacher}
                  handleDeleteTeacher={handleDeleteTeacher}
                />
              </Grid>
            ))}
          </Grid>
        : <Box className="flex flex-col" backgroundColor="white"  border="1px solid #E5E7EB" borderRadius="20px" paddingX="30px" >
              <Box className="flex flew-row justify-between" sx={{ paddingY:"15px", paddingRight:"34px", paddingLeft:"51px", background:"#F9F9F9", borderRadius:"29px",
                          marginRight:"60px", marginLeft:"20px", marginTop:"40px", fontFamily: "Poppins", fontStyle: "normal",fontWeight: "600", fontSize: "12px", textAlign:  "center", color: "#7D8594" }}>
                <Box className="flex flex-row justify-between items-center" position="relative"  >
                  <CustomCheckbox checked={areAllTeachersSelected} onChange={(e) => handleSelectAllTeachers(e.target.checked)}/>
                  <Typography>
                    ФИО
                  </Typography>
                </Box>
                <Box className="flex flex-row items-center" width="100%" position="relative">
                  <Typography position="absolute" right="810px">
                    Направление
                  </Typography>
                  <Typography position="absolute" right="645px">
                    Количество групп
                  </Typography>
                  <Typography position="absolute" right="555px">
                    Номер
                  </Typography>
                  <Typography position="absolute" right="345px">
                    Учеников всего
                  </Typography>
                  <Typography position="absolute" right="165px">
                    Дата трудоустройства
                  </Typography>
                  <Typography position="absolute" right="85px">
                    Филиал
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ position:"relative", overflowX:"hidden", overflowY:"scroll", marginBottom:"15px", maxHeight:"65vh" }}>
              {filteredTeachers.map((teacher, i)  => (
                <TeachersList
                  keyId={i}  
                  {...teacher}
                  handleDeleteTeacher={handleDeleteTeacher}
                  selectedTeacherIds={selectedTeacherIds} 
                  handleSelectTeacher={handleSelectTeacher} 
                  handleSelectAllTeachers={handleSelectAllTeachers}
                  areAllTeachersSelected={areAllTeachersSelected} 
                  />
              ))}
              </Box>
            </Box> 
            }
        </div>
      </Main>
    </Root>
  );
};

export default TeachersMain;
