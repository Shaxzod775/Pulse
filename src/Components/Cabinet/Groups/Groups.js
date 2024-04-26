import React, { useEffect, useRef, useState } from "react";
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
import Checkbox from "@mui/material/Checkbox";
import {
  theme,
  ButtonStyled,
  ContentHeader,
  Main,
  Root,
  Title,
  TextFieldStyled,
  SelectStyled,
} from "../CabinetStyles";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import GroupCard from "./GroupCard/GroupCard";
import { Icons } from "../../../Assets/Icons/icons";
import NewGroupDialog from "./NewGroupDialog/NewGroupDialog";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../customComponents/CustomSelect/CustomSelect";

const customMenuProps = {
  // onClick: (e) => e.stopPropagation(),
  // MenuListProps: {
  //   onClik: (e) => e.stopPropagation(),
  // },
  sx: {
    maxHeight: "500px",
    top: "10px",
    "& .MuiPaper-root.MuiPopover-paper.MuiMenu-paper": {
      minWidth: "240px",
      boxShadow:
        "0px 2px 4px 0px rgba(31, 41, 55, 0.06), 0px 4px 6px 0px rgba(31, 41, 55, 0.10)",
    },
    "& .MuiList-root.MuiMenu-list": {
      padding: "8px",

      "& .MuiButtonBase-root.MuiMenuItem-root": {
        padding: "8px",
        borderRadius: "4px",
      },
    },
  },
  elevation: 0,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "right",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "right",
  },
};

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  padding: "0 8px 0 0",
  color: "grey",
  "&.Mui-checked": {
    color: "grey",
  },
  "&:hover": {
    backgroundColor: "transparent", // remove hover background color
  },
}));

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

function TagCheckbox({
  children,
  selected,
  setSelected,
  variant,
  ...otherProps
}) {
  //I will just seperate variant from other props so it does't interfere with dynamic variant
  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <Button
      variant={selected ? "contained" : "outlined"}
      onClick={handleClick}
      sx={{
        boxSizing: "border-box",
        boxShadow: "none",
        "&:hover": { boxShadow: "none" },
        minWidth: "unset",
        padding: "6px",
        lineHeight: "inherit",
        border: `${selected ? `1px solid ${theme.palette.darkBlue.main}` : ""}`,
      }}
      {...otherProps}
    >
      {children}
    </Button>
  );
}

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
const courses = ["Frontend", "UI/UX", "Backend", "Flutter", "IT English"];

export function createGroup({
  id = uuidv4(),
  name = "GR0000-00",
  subject = "Frontend",
  teacher = "Koptleulov Arslan",
  weekDays = [0, 1, 2],
  startDate = new Date(2024, 4, 3),
  endDate = new Date(2024, 7, 3),
  roomNumber = "11",
  duration = 0,
  thumbnail = null,
} = {}) {
  return {
    id,
    name,
    subject,
    teacher,
    weekDays,
    startDate,
    endDate,
    roomNumber,
    duration,
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

const Groups = () => {
  const [anchorTeacher, setAnchorTeacher] = useState(null);
  const [anchorCourse, setAnchorCourse] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleChangeCourse = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCourses(
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
    setAnchorCourse(e.currentTarget);
  };
  const handleCloseCourseSelect = (e) => {
    e.stopPropagation();
    setAnchorCourse(null);
  };

  const [open, setOpen] = useState(false);

  const [groups, setGroups] = useState([
    createGroup({ name: "GR011-62", duration: 3 }),
    createGroup({ name: "GR011-61", duration: 3 }),
    createGroup({ name: "GR011-63", duration: 3 }),
    createGroup({ name: "GR011-64", duration: 6 }),
    createGroup({ name: "GR011-65", duration: 9 }),
    createGroup({ name: "GR011-66", duration: 3 }),
    createGroup({ name: "GR011-67", duration: 3 }),
    createGroup({ name: "GR011-68", duration: 3 }),
  ]);

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

  const handleAddGroup = (newGroup) => {
    setGroups([...groups, newGroup]);
    console.log(newGroup);
  };

  const handleDeleteGroup = (idToDelete) => {
    setGroups(groups.filter((group) => group.id !== idToDelete));
  };

  useEffect(
    () => {
      const handleClickOutside = (event) => {
        if (
          anchorTeacher &&
          !anchorTeacher.parentElement.contains(event.target)
        ) {
          handleCloseTeacherSelect();
        } else if (anchorCourse && !anchorCourse.contains(event.target)) {
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
            <Title>Группы</Title>
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
              <HeaderDiv
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  label: { cursor: "pointer" },
                }}
                className="flex items-stretch full-height p-xxs2"
                onClick={handleClickTeacherSelect}
              >
                <label htmlFor="teacher-select" className="full-height">
                  <Typography color="#b4b7c3">Учителя</Typography>
                </label>
                <SelectStyled
                  id="teacher-select"
                  autoWidth
                  IconComponent={
                    Boolean(anchorTeacher) ? Icons.ArrowUBold : Icons.ArrowDBold
                  }
                  defaultValue={0}
                  onClose={handleCloseTeacherSelect}
                  MenuProps={{
                    ...customMenuProps,
                    anchorEl: anchorTeacher,
                    open: Boolean(anchorTeacher),
                    onClose: handleCloseTeacherSelect,
                  }}
                  sx={{
                    "& > svg": { transform: "none !important" },
                  }}
                >
                  {teachers.map((teacher, i) => (
                    <MenuItem value={i} key={i}>
                      {teacher}
                    </MenuItem>
                  ))}
                </SelectStyled>
              </HeaderDiv>
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
                      selectedCourses.length === courses.length) &&
                      "Все"}
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
                      if (selected.length === courses.length) {
                        return "";
                      }
                      return "..."; // Render "..." if multiple courses are selected
                    }
                    return selected;
                  }}
                  IconComponent={
                    Boolean(anchorCourse) ? Icons.ArrowUBold : Icons.ArrowDBold
                  }
                  onClose={handleCloseCourseSelect}
                  MenuProps={{
                    ...customMenuProps,
                    anchorEl: anchorCourse,
                    open: Boolean(anchorCourse),
                    onClose: handleCloseCourseSelect,
                  }}
                  sx={{
                    "& > svg": { transform: "none !important" },
                  }}
                >
                  {courses.map((course, i) => (
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
            </div>
          </div>

          <div className="flex items-center gap-sm">
            <ButtonStyled
              variant="contained"
              color="purpleBlue"
              onClick={handleClickOpen}
            >
              <div className="flex items-center gap-xs">
                <Icons.AddCircle />
                <span>Создать группу</span>
              </div>
            </ButtonStyled>
          </div>
        </div>

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
            rowSpacing={"18px"}
            columnSpacing={"32px"}
            marginBottom={`${theme.custom.spacing.sm}px`}
          >
            {groups.map((group, i) => (
              <Grid item xs="auto" md="auto" lg={3} key={i}>
                <GroupCard
                  {...groups[i]}
                  handleDeleteGroup={handleDeleteGroup}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Main>

      <NewGroupDialog
        open={open}
        handleClose={handleClose}
        handleAddGroup={handleAddGroup}
      />
    </Root>
  );
};

export default Groups;
