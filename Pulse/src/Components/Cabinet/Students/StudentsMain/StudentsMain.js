import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as routes from "../../../../Constants/routes";
import {
  Box,
  Button,
  ButtonBase,
  Collapse,
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
  customMenuProps,
  CustomCheckbox,
  selectStyles,
  InputBaseStyled,
  selectStylesV2,
  InputBaseStyledV2,
  AutocompleteStyled,
  AutocompleteField,
  MenuStyled,
  AutocompleteMenuProps,
  AutocompleteStyledV2,
  AutocompleteFieldV2,
  TypographyStyled,
  textFieldStylesV2,
} from "../../CabinetStyles";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import StudentCard from "../StudentCard/StudentCard";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ru } from "date-fns/locale";
import { russianLocale } from "../../../../Constants/dateLocales";
import { Icons } from "../../../../Assets/Icons/icons";
import { useCourses } from "../../../../contexts/Courses.context";
import useInput from "../../../../hooks/useInput";
import { teacherNames } from "../../../../Constants/testData";
import StudentsList from '../StudentsList/StudentsList';

import useToggle from "../../../../hooks/useToggle";
import useDebounce from "../../../../hooks/useDebounce";

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
  const { allCourseNames } = useCourses();
  const navigate = useNavigate();

  const [filteredStudents, setFilteredStudents] = useState(students);

  const [allFiltersOpen, toggleAllfiltersOpen] = useToggle(false);

  const [student, changeStudent, resetStudent] = useInput("");

  const [teacher, setTeacher] = useState("");

  const [anchorCourseSelect, setAnchorCourseSelect] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [selectedGroup, changeSelectedGroup] = useInput("0");

  const [selectedStatuses, setSelectedStatuses] = useState(["0"]);

  const [selectedFinancialStatuses, setSelectedFinancialStatuses] = useState([
    "0",
  ]);

  const [selectedTags, setSelectedTags] = useState(["0"]);

  const [additionalId, changeAdditionalId, resetAdditionalId] = useInput("");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [isGrid, setIsGrid] = useState(false);

  const [anchorThreeDots, setAnchorThreeDots] = useState(null);
  const threeDotsMenuOpen = Boolean(anchorThreeDots);

  const handleClearFilters = () => {
    resetStudent();
    setTeacher("");
    setSelectedCourses([]);
    changeSelectedGroup({ target: { value: "0" } });
    setSelectedStatuses(["0"]);
    setSelectedFinancialStatuses(["0"]);
    setSelectedTags(["0"]);
    resetAdditionalId();
    setStartDate(null);
    setEndDate(null);
  };

  const handleTeacherChange = (event, newValue) => {
    setTeacher(newValue);
  };

  const handleClickCourseSelect = (e) => {
    setAnchorCourseSelect(e.currentTarget);
  };
  const handleCloseCourseSelect = (e) => {
    e.stopPropagation();
    setAnchorCourseSelect(null);
  };

  const handleChangeCourse = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCourses(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // Function to handle change in select with multiple property
  const handleChangeMultipleSelect = (setter) => (event) => {
    const {
      target: { value },
    } = event;
    setter(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // Function to handle change in date
  const handleDateChange = (setter) => (newDate) => {
    if (newDate instanceof Date && !isNaN(newDate)) {
      setter(newDate);
    } else {
      // Handle invalid input date here
      setter(null);
    }
  };

  const handleSearchFilter = (searchInput) => {
    const lowerCaseSearchInput = searchInput.toLowerCase().trim().split(" ");
    const filtered = students.filter((student) => {
      const fullName = [
        student.firstName.toLowerCase(),
        student.middleName.toLowerCase(),
        student.lastName.toLowerCase(),
      ];
      return lowerCaseSearchInput.every((input) =>
        fullName.some((name) => name.includes(input))
      );
    });
    setFilteredStudents(filtered);
  };

  const handleClickThreeDots = (event) => {
    setAnchorThreeDots(event.currentTarget);
  };
  const handleCloseThreeDotsMenu = () => {
    setAnchorThreeDots(null);
  };

  const goBack = () => {
    navigate(-1); // This navigates one step back in history
  };

  useDebounce(
    () => {
      if (student !== "") {
        handleSearchFilter(student);
      } else {
        setFilteredStudents(students);
      }
    },
    1000,
    [student, students]
  );

  useEffect(() => setFilteredStudents(students), [students]);

  useEffect(
    () => {
      const handleClickOutside = (event) => {
        // if (
        //   anchorTeacher &&
        //   !anchorTeacher.parentElement.contains(event.target)
        // ) {
        //   handleCloseTeacherSelect();
        // } else
        if (anchorCourseSelect && !anchorCourseSelect.contains(event.target)) {
          handleCloseCourseSelect();
        }
      };
      // const handleClickInside = (event) => {}

      document.addEventListener("mousedown", handleClickOutside);

      console.log(`filtered: ${filteredStudents}`);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    },
    [
      // anchorTeacher,
      // handleCloseTeacherSelect,
      // anchorCourse,
      // handleCloseCourseSelect,
    ]
  );

  return (
    <Root
    // sx={{ maxHeight: "calc(100% - 122px)", display: "flex" }}
    >
      <Main sx={{ maxHeight: "calc(100vh - 42px)" }}>
        <Box className="flex flex-col" rowGap="16px">
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
                <InputBaseStyledV2
                  value={student}
                  onChange={changeStudent}
                  placeholder="Поиск по ученику..."
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
                <AutocompleteStyledV2
                  options={teacherNames}
                  value={teacher}
                  onChange={handleTeacherChange}
                  renderInput={(params) => (
                    <AutocompleteFieldV2
                      {...params}
                      required
                      id="subject"
                      variant="outlined"
                      placeholder="Учитель"
                    />
                  )}
                  popupIcon={<Icons.ArrowDBold color="#9CA3AF" />}
                  clearIcon={<Icons.Delete color="#9CA3AF" />}
                  slotProps={{ paper: AutocompleteMenuProps }}
                  // open={true}
                />
                <HeaderDiv
                  sx={{
                    position: "relative",
                    cursor: "pointer",
                    label: { cursor: "pointer" },
                  }}
                  className="flex items-stretch full-height p-xxs2"
                  onClick={handleClickCourseSelect}
                >
                  <label
                    htmlFor="course-select"
                    className="flex items-center full-height"
                  >
                    <Icons.NotebookBookmark color="#b4b7c3" />
                    <span style={{ margin: "0 -8px 0 8px", color: "#1C274C" }}>
                      {(selectedCourses.length < 1 ||
                        selectedCourses.length === allCourseNames.length) &&
                        "Все курсы"}
                    </span>
                  </label>
                  <SelectStyled
                    id="course-select"
                    autoWidth
                    multiple
                    value={selectedCourses}
                    onChange={handleChangeCourse}
                    renderValue={(selected) => {
                      if (selected.length > 1) {
                        if (selected.length === allCourseNames.length) {
                          return "";
                        }
                        return "..."; // Render "..." if multiple courses are selected
                      }
                      return selected;
                    }}
                    IconComponent={
                      Boolean(anchorCourseSelect)
                        ? Icons.ArrowUBold
                        : Icons.ArrowDBold
                    }
                    onClose={handleCloseCourseSelect}
                    MenuProps={{
                      ...customMenuProps,
                      anchorEl: anchorCourseSelect,
                      open: Boolean(anchorCourseSelect),
                      onClose: handleCloseCourseSelect,
                    }}
                    sx={{
                      "& > svg": { transform: "none !important" },
                    }}
                  >
                    {allCourseNames.map((course, i) => (
                      <MenuItem value={course} key={i}>
                        <CustomCheckbox
                          checked={selectedCourses.indexOf(course) > -1}
                        />
                        <ListItemText primary={course} />
                        {/* {course} */}
                      </MenuItem>
                    ))}
                  </SelectStyled>
                </HeaderDiv>
                <Select
                  required
                  value={selectedGroup}
                  onChange={changeSelectedGroup}
                  MenuProps={customMenuProps}
                  sx={selectStylesV2({ theme })}
                  input={<InputBaseStyledV2 />}
                  IconComponent={Icons.ArrowDBold}
                >
                  <MenuItem value="0">
                    <ListItemText>Все группы</ListItemText>
                  </MenuItem>
                  {["GR-0010", "GR-0100", "GR-0022"].map((group) => (
                    <MenuItem key={group} value={group}>
                      <ListItemText primary={group} />
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
              <ButtonStyled onClick={() => setIsGrid(!isGrid)} variant="contained" sx={{
                            color: 'white', 
                            backgroundColor: 'white', 
                            '&:hover': {
                              backgroundColor: 'white', 
                              }
                            }}>
                <div className="flex items-center gap-x3s">
                  <Icons.ListIcon />
                </div>
                </ButtonStyled>
              <Link to={routes.CABINET + routes.STUDENTS + routes.NEW}>
                <ButtonStyled variant="contained" color="purpleBlue">
                  <div className="flex items-center gap-x3s">
                    <Icons.UserAdd />
                    <span>Добавить ученика</span>
                  </div>
                </ButtonStyled>
              </Link>
              {/* <ButtonStyled variant="outlined" color="purpleBlue">
              <div className="flex items-center gap-x3s">
                <Icons.InboxIn />
                <span>Скачать список</span>
              </div>
            </ButtonStyled> */}

              <ButtonStyled
                onClick={handleClickThreeDots}
                variant="outlined"
                color="purpleBlue"
                sx={{ minWidth: "0" }}
              >
                <Icons.MenuDots />
              </ButtonStyled>
              <MenuStyled
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorThreeDots}
                open={threeDotsMenuOpen}
                onClose={handleCloseThreeDotsMenu}
              >
                <MenuItem onClick={handleCloseThreeDotsMenu} disableRipple>
                  <ButtonStyled color="purpleBlue">
                    <Icons.Pen />
                    <span>Скачать список</span>
                  </ButtonStyled>
                </MenuItem>
                <MenuItem
                  onClick={handleCloseThreeDotsMenu}
                  disableRipple
                ></MenuItem>
              </MenuStyled>
            </div>
          </div>
          <Box>
            <Box
              className="flex items-center"
              columnGap="4px"
              maxWidth="max-content"
              sx={{ cursor: "pointer" }}
              onClick={toggleAllfiltersOpen}
            >
              <TypographyStyled colorFromTheme="purpleBlue">
                Показать все фильтры
              </TypographyStyled>
              <TypographyStyled colorFromTheme="purpleBlue" display="flex">
                <Icons.ArrowDBold
                  style={{
                    transform: `rotate(${allFiltersOpen ? "180deg" : "0deg"})`,
                    transition: "all .2s ease-in-out",
                  }}
                />
              </TypographyStyled>
            </Box>
            <Collapse orientation="vertical" in={allFiltersOpen}>
              <Box display="flex" columnGap="10px" paddingTop="16px">
                <Select
                  multiple
                  required
                  value={selectedStatuses}
                  onChange={handleChangeMultipleSelect(setSelectedStatuses)}
                  renderValue={(selected) => {
                    if (selected.length === 1) return "Статус ученика";
                    return selected.slice(1).join(", ");
                  }}
                  MenuProps={customMenuProps}
                  sx={{ ...selectStylesV2({ theme }), minWidth: "240px" }}
                  input={<InputBaseStyledV2 />}
                  IconComponent={Icons.ArrowDBold}
                >
                  {[
                    "Активные студенты",
                    "Закончившие курс",
                    "Ушли после пробных",
                    "Засороженные студентыне",
                    "Не добавлены в группу",
                  ].map((status) => (
                    <MenuItem key={status} value={status}>
                      <CustomCheckbox
                        checked={selectedStatuses.indexOf(status) > -1}
                      />
                      <ListItemText primary={status} />
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  multiple
                  required
                  value={selectedFinancialStatuses}
                  onChange={handleChangeMultipleSelect(
                    setSelectedFinancialStatuses
                  )}
                  renderValue={(selected) => {
                    if (selected.length === 1) return "Финансовый статус";
                    return selected.slice(1).join(", ");
                  }}
                  MenuProps={customMenuProps}
                  sx={{ ...selectStylesV2({ theme }), minWidth: "240px" }}
                  input={<InputBaseStyledV2 />}
                  IconComponent={Icons.ArrowDBold}
                >
                  {[
                    "Оплатившие студенты",
                    "Должники",
                    "Бесплатно обучающиеся",
                    "Обучающиеся со скидкой",
                  ].map((financialStatus) => (
                    <MenuItem key={financialStatus} value={financialStatus}>
                      <CustomCheckbox
                        checked={
                          selectedFinancialStatuses.indexOf(financialStatus) >
                          -1
                        }
                      />
                      <ListItemText primary={financialStatus} />
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  multiple
                  required
                  value={selectedTags}
                  onChange={handleChangeMultipleSelect(setSelectedTags)}
                  renderValue={(selected) => {
                    if (selected.length === 1) return "Теги";
                    return selected.slice(1).join(", ");
                  }}
                  MenuProps={customMenuProps}
                  sx={{ ...selectStylesV2({ theme }), minWidth: "150px" }}
                  input={<InputBaseStyledV2 />}
                  IconComponent={Icons.ArrowDBold}
                >
                  {["Тег 0", "Тег 1", "Тег 2", "Тег 3"].map((groupTag) => (
                    <MenuItem key={groupTag} value={groupTag}>
                      <CustomCheckbox
                        checked={selectedTags.indexOf(groupTag) > -1}
                      />
                      <ListItemText primary={groupTag} />
                    </MenuItem>
                  ))}
                </Select>
                <InputBaseStyledV2
                  value={additionalId}
                  onChange={changeAdditionalId}
                  placeholder="Дополнительный ID"
                  sx={{
                    position: "relative",
                    minWidth: "240px",
                    width: "240px",
                    color: theme.typography.color.darkBlue,
                  }}
                />
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={ru}
                  localeText={russianLocale}
                >
                  <DatePicker
                    id="date-start"
                    value={startDate}
                    onChange={handleDateChange(setStartDate)}
                    sx={{ ...textFieldStylesV2({ theme }), maxWidth: "180px" }}
                    slots={{
                      openPickerIcon: Icons.CalendarContained,
                    }}
                    slotProps={{
                      field: { clearable: true, placeholder: "Начало даты" },
                      openPickerButton: { color: "purpleBlue" },
                    }}
                  />
                </LocalizationProvider>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={ru}
                  localeText={russianLocale}
                >
                  <DatePicker
                    id="date-start"
                    value={endDate}
                    onChange={handleDateChange(setEndDate)}
                    sx={{ ...textFieldStylesV2({ theme }), maxWidth: "180px" }}
                    slots={{
                      openPickerIcon: Icons.CalendarContained,
                    }}
                    slotProps={{
                      field: { clearable: true, placeholder: "Конец даты" },
                      openPickerButton: { color: "purpleBlue" },
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Collapse>
          </Box>
        </Box>
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
            columnSpacing={"32px"}
            rowSpacing={"18px"}
            marginBottom={`${theme.custom.spacing.sm}px`}
          >
            {filteredStudents.map((student, i) => (
              <Grid item xs="auto" md="auto" lg={3} key={i}>
                <StudentCard
                  {...student}
                  handleDeleteStudent={handleDeleteStudent}
                />
              </Grid>
            ))}
          </Grid>
          : <StudentsList students={filteredStudents} handleDeleteStudent={handleDeleteStudent}/>}
        </div>
      </Main>
    </Root>
  );
};

export default StudentsMain;
