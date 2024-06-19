import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
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
  selectStylesV2,
  InputBaseStyledV2,
  AutocompleteStyledV2,
  AutocompleteFieldV2,
  AutocompleteMenuProps,
  selectStyles,
  InputBaseStyled,
  CustomCheckbox,
  TypographyStyled,
  textFieldStyles,
  textFieldStylesV2,
} from "../../CabinetStyles";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import GroupCard from "../GroupCard/GroupCard";
import { Icons } from "../../../../Assets/Icons/icons";
import NewGroupDialog from "../NewGroupDialog/NewGroupDialog";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ru } from "date-fns/locale";
import { russianLocale } from "../../../../Constants/dateLocales";
import { teacherNames } from "../../../../Constants/testData";
import {
  weekDaysTextFull,
  weekDaysTextFullToShort,
} from "../../../../Constants/dateLocales";
import { useCourses } from "../../../../contexts/Courses.context";
import useToggle from "../../../../hooks/useToggle";
import useInput from "../../../../hooks/useInput";
import useDebounce from "../../../../hooks/useDebounce";
import useCounter from "../../../../hooks/useCounter";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCourseNames } from "../../../../Slices/coursesSlice";
import {
  selectTeachersIdNameCombined,
  selectTeachersName,
} from "../../../../Slices/teachersSlice";
import GroupsList from "../GroupsList/GroupsList";
import { deleteGroup, selectAllGroups } from "../../../../Slices/groupsSlice";

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

const GroupsMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const groups = useSelector(selectAllGroups);
  const allCourseNames = useSelector(selectAllCourseNames);
  const allTeacherNames = useSelector(selectTeachersName);
  const [open, setOpen] = useState(false);
  const [groupDialogKey, increaseGroupDialogKey] = useCounter(0);

  const [filteredGroups, setFilteredGroups] = useState(groups);

  const [allFiltersOpen, toggleAllfiltersOpen] = useToggle(false);

  const [groupSearch, changeGroupSearch, resetGroupSearch] = useInput("");

  const [anchorTeacher, setAnchorTeacher] = useState(null);

  const [teacher, setTeacher] = useState("");

  const [anchorCourseSelect, setAnchorCourseSelect] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [selectedWeekDays, setSelectedWeekDays] = useState(["0"]);

  const [selectedGroupStatuses, setSelectedGroupStatuses] = useState(["0"]);

  const [selectedTags, setSelectedTags] = useState(["0"]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [isGrid, setIsGrid] = useState(true);
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);
  const areAllGroupsSelected =
    filteredGroups.length > 0 &&
    selectedGroupIds.length === filteredGroups.length;

  const handleClearFilters = () => {
    resetGroupSearch();
    setTeacher("");
    setSelectedCourses([]);
    setSelectedWeekDays(["0"]);
    setSelectedGroupStatuses(["0"]);
    setSelectedTags(["0"]);
    setStartDate(null);
    setEndDate(null);
  };

  const handleTeacherChange = (event, newValue) => {
    setTeacher(newValue);
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

  const handleClickTeacherSelect = (e) => {
    setAnchorTeacher(e.currentTarget);
  };
  const handleCloseTeacherSelect = (e) => {
    e.stopPropagation();
    setAnchorTeacher(null);
  };
  const handleClickCourseSelect = (e) => {
    setAnchorCourseSelect(e.currentTarget);
  };
  const handleCloseCourseSelect = (e) => {
    e.stopPropagation();
    setAnchorCourseSelect(null);
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

  const handleGroupSearchFilter = (searchInput, currentGroups) => {
    if (searchInput !== "") {
      const lowerCaseSearchInput = searchInput.toLowerCase().trim().split(" ");
      const filtered = currentGroups.filter((group) => {
        const groupName = group.name.toLowerCase().split(" ");
        return lowerCaseSearchInput.every((input) =>
          groupName.some((name) => name.includes(input))
        );
      });
      return filtered;
    } else {
      return currentGroups;
    }
  };

  const handleTeacherSearchFilter = (searchInput, currentGroups) => {
    if (searchInput !== "") {
      const lowerCaseSearchInput = searchInput.toLowerCase().trim().split(" ");
      const filtered = currentGroups.filter((group) => {
        const teacherName =
          `${group.teacher.lastName} ${group.teacher.firstName} ${group.teacher.middleName}`
            .toLowerCase()
            .split(" ");
        return lowerCaseSearchInput.every((input) =>
          teacherName.some((name) => name.includes(input))
        );
      });
      return filtered;
    } else {
      return currentGroups;
    }
  };

  const handleCoursesSelectFilter = (selectedCourseNames, currentGroups) => {
    if (selectedCourseNames.length > 0) {
      const filtered = currentGroups.filter((group) =>
        selectedCourseNames.includes(group.course.name)
      );
      return filtered;
    } else {
      return currentGroups;
    }
  };

  const handleDeleteSelectedGroups = (allGroupsIDs) => {
    if (allGroupsIDs.length > 0) {
      selectedGroupIds.map((groupID) => dispatch(deleteGroup(groupID)));
    } else {
      console.log("Выберите группы для удаления");
    }
  };

  const handleSelectGroup = (id) => {
    setSelectedGroupIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((groupId) => groupId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAllGroups = (selectAll) => {
    if (selectAll) {
      setSelectedGroupIds(filteredGroups.map((group) => group.id));
    } else {
      setSelectedGroupIds([]);
    }
  };

  const goBack = () => {
    navigate(-1); // This navigates one step back in history
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    increaseGroupDialogKey();
  };

  useDebounce(
    () => {
      let filtered = groups;
      if (groupSearch !== "") {
        filtered = handleGroupSearchFilter(groupSearch, filtered);
      }
      if (selectedCourses.length > 0) {
        filtered = handleCoursesSelectFilter(selectedCourses, filtered);
      }
      if (teacher && teacher !== "") {
        filtered = handleTeacherSearchFilter(teacher, filtered);
      }
      setFilteredGroups(filtered);
    },
    1000,
    [groupSearch, teacher, selectedCourses, groups]
  );

  // Function to update URL parameters based on current filters
  const updateUrlParams = () => {
    const params = {
      ...(groupSearch && { groupSearch }),
      ...(teacher && { teacher }),
      ...(selectedCourses.length > 0 && { courses: selectedCourses.join(",") }),
      // Add other filters as needed
    };
    navigate({
      pathname: location.pathname,
      search: new URLSearchParams(params).toString(),
    });
  };
  // Call this function whenever filters change
  useEffect(() => {
    updateUrlParams();
  }, [groupSearch, teacher, selectedCourses]);

  // Function to read URL parameters and set filters on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const groupSearchParam = params.get("groupSearch");
    const teacherParam = params.get("teacher");
    const coursesParam = params.get("courses");

    if (groupSearchParam) changeGroupSearch(groupSearchParam);
    if (teacherParam) setTeacher(teacherParam);
    if (coursesParam) setSelectedCourses(coursesParam.split(","));

    // Add other filters as needed
  }, []);

  useEffect(() => {
    setFilteredGroups(groups);
  }, [groups]);

  useEffect(
    () => {
      const handleClickOutside = (event) => {
        if (
          anchorTeacher &&
          !anchorTeacher.parentElement.contains(event.target)
        ) {
          handleCloseTeacherSelect();
        } else if (
          anchorCourseSelect &&
          !anchorCourseSelect.contains(event.target)
        ) {
          handleCloseCourseSelect();
        }
      };
      // const handleClickInside = (event) => {}

      document.addEventListener("mousedown", handleClickOutside);

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
              <Title>Группы</Title>
              <div className="flex items-stretch gap-xxs full-height">
                <InputBaseStyledV2
                  value={groupSearch}
                  onChange={changeGroupSearch}
                  placeholder="Поиск по группам..."
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
                  freeSolo
                  options={allTeacherNames}
                  value={teacher}
                  onChange={handleTeacherChange}
                  renderInput={(params) => (
                    <AutocompleteFieldV2
                      {...params}
                      required
                      id="subject"
                      variant="outlined"
                      placeholder="Учителя"
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
                    onChange={handleChangeMultipleSelect(setSelectedCourses)}
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
                      </MenuItem>
                    ))}
                  </SelectStyled>
                </HeaderDiv>
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
              {selectedGroupIds.length <= 0 ? (
                <>
                  <ButtonStyled
                    onClick={() => setIsGrid(!isGrid)}
                    variant="contained"
                    sx={{
                      color: "white",
                      backgroundColor: "white",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                    }}
                  >
                    <div className="flex items-center gap-x3s">
                      {isGrid ? <Icons.ListIcon /> : <Icons.List />}
                    </div>
                  </ButtonStyled>
                  <ButtonStyled
                    variant="contained"
                    color="purpleBlue"
                    onClick={handleClickOpen}
                  >
                    <div className="flex items-center gap-x3s">
                      <Icons.AddCircle />
                      <span>Добавить группу</span>
                    </div>
                  </ButtonStyled>
                </>
              ) : (
                <Box className="flex flex-row items-center" gap="25px">
                  <Box className="flex flex-row" gap="5px">
                    <Icons.ListSelected />
                    <TypographyStyled
                      sx={{ color: "#6574D8", fontSize: "14px" }}
                    >
                      Выбрано {selectedGroupIds.length}
                    </TypographyStyled>
                  </Box>
                  <Box className="flex flex-row items-center" gap="5px">
                    <ButtonStyled
                      variant="contained"
                      onClick={() => setSelectedGroupIds([])}
                      sx={{
                        color: "#6574D8",
                        border: "1px solid #6574D8",
                        backgroundColor: "white",
                        width: "100px",
                        paddingX: "20px",
                        paddingY: "10px",
                        fontSize: "14px",
                        "&:hover": {
                          backgroundColor: "white",
                        },
                      }}
                    >
                      Отменить
                    </ButtonStyled>
                    <ButtonStyled
                      variant="contained"
                      sx={{
                        color: "white",
                        backgroundColor: "#6574D8",
                        width: "100px",
                        paddingX: "20px",
                        paddingY: "10px",
                        fontSize: "14px",
                        "&:hover": {
                          backgroundColor: "#6574D8",
                        },
                      }}
                      onClick={() =>
                        handleDeleteSelectedGroups(selectedGroupIds)
                      }
                    >
                      Удалить
                    </ButtonStyled>
                  </Box>
                </Box>
              )}
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
                  value={selectedGroupStatuses}
                  onChange={handleChangeMultipleSelect(
                    setSelectedGroupStatuses
                  )}
                  renderValue={(selected) => {
                    if (selected.length === 1) return "Статус группы";
                    return selected.slice(1).join(", ");
                  }}
                  MenuProps={customMenuProps}
                  sx={{ ...selectStylesV2({ theme }), minWidth: "240px" }}
                  input={<InputBaseStyledV2 />}
                  IconComponent={Icons.ArrowDBold}
                >
                  {[
                    "Активные группы",
                    "Архивные status 1",
                    "Заверщенные status 2",
                  ].map((groupStatus) => (
                    <MenuItem key={groupStatus} value={groupStatus}>
                      <CustomCheckbox
                        checked={
                          selectedGroupStatuses.indexOf(groupStatus) > -1
                        }
                      />
                      <ListItemText primary={groupStatus} />
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  multiple
                  required
                  value={selectedWeekDays}
                  onChange={handleChangeMultipleSelect(setSelectedWeekDays)}
                  renderValue={(selected) => {
                    if (selected.length === 1) return "Дни недели";
                    return selected
                      .slice(1)
                      .map((day) => weekDaysTextFullToShort[day])
                      .join(", ");
                  }}
                  MenuProps={customMenuProps}
                  sx={{ ...selectStylesV2({ theme }), minWidth: "180px" }}
                  input={<InputBaseStyledV2 />}
                  IconComponent={Icons.ArrowDBold}
                >
                  {weekDaysTextFull.map((weekDayFull) => (
                    <MenuItem key={weekDayFull} value={weekDayFull}>
                      <CustomCheckbox
                        checked={selectedWeekDays.indexOf(weekDayFull) > -1}
                      />
                      <ListItemText primary={weekDayFull} />
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
          {isGrid ? (
            <Grid
              container
              justifyContent="start"
              rowSpacing={"18px"}
              columnSpacing={"32px"}
              marginBottom={`${theme.custom.spacing.sm}px`}
            >
              {filteredGroups.map((group, i) => (
                <Grid item xs="auto" md="auto" lg={3} key={i}>
                  <GroupCard {...group} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              className="flex flex-col"
              backgroundColor="white"
              border="1px solid #E5E7EB"
              borderRadius="20px"
              paddingX="30px"
            >
              <Box
                className="flex flew-row justify-between"
                sx={{
                  paddingY: "15px",
                  paddingRight: "34px",
                  paddingLeft: "51px",
                  background: "#F9F9F9",
                  borderRadius: "29px",
                  marginRight: "60px",
                  marginLeft: "20px",
                  marginTop: "40px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "11px",
                  textAlign: "center",
                  color: "#7D8594",
                  width: "auto",
                }}
              >
                <Box
                  className="flex flex-row justify-between items-center"
                  position="relative"
                >
                  <CustomCheckbox
                    checked={areAllGroupsSelected}
                    onChange={(e) => handleSelectAllGroups(e.target.checked)}
                  />
                  <Typography>Название Группы</Typography>
                </Box>
                <Box className="flex flex-row items-center" position="relative">
                  <Box width="auto" position="relative" right="495px">
                    <Typography>Дата начала</Typography>
                  </Box>
                  <Typography position="relative" right="435px">
                    Дата завершения
                  </Typography>
                  <Typography position="relative" right="365px">
                    Дни урока
                  </Typography>
                  <Typography position="relative" right="305px">
                    Учитель
                  </Typography>
                  <Typography position="relative" right="225px">
                    Продолжительность
                  </Typography>
                  <Typography position="relative" right="140px">
                    Кабинет
                  </Typography>
                  <Typography position="relative" right="55px">
                    Учеников
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  position: "relative",
                  overflowX: "hidden",
                  overflowY: "scroll",
                  marginBottom: "15px",
                  maxHeight: "75vh",
                }}
              >
                {filteredGroups.map((group, i) => (
                  <GroupsList
                    keyId={i}
                    {...group}
                    selectedGroupIds={selectedGroupIds}
                    handleSelectGroup={handleSelectGroup}
                    handleSelectAllGroups={handleSelectAllGroups}
                    areAllGroupsSelected={areAllGroupsSelected}
                  />
                ))}
              </Box>
            </Box>
          )}
        </div>
      </Main>

      <NewGroupDialog
        key={groupDialogKey}
        open={open}
        handleClose={handleClose}
      />
    </Root>
  );
};

export default GroupsMain;
