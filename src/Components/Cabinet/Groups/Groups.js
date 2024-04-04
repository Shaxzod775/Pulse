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
import GroupCard from "./GroupCard/GroupCard";
import { Icons } from "../../../Assets/Icons/icons";
import NewGroupDialog from "./NewGroupDialog/NewGroupDialog";
import { useNavigate } from "react-router-dom";

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

export function createGroup({
  id = uuidv4(),
  name = "GR0000-00",
  subject = "Front-end",
  startDate = new Date(2024, 4, 3),
  endDate = new Date(2024, 7, 3),
  thumbnail = null,
} = {}) {
  return {
    id,
    name,
    subject,
    startDate,
    endDate,
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
  const [open, setOpen] = useState(false);

  const [groups, setGroups] = useState([
    createGroup({ name: "Javascript", duration: 3 }),
    createGroup({ name: "Python", duration: 3 }),
    createGroup({ name: "Node.js", duration: 3 }),
    createGroup({ name: "Front-end", duration: 6 }),
    createGroup({ name: "Back-end", duration: 9 }),
    createGroup({ name: "Javascript", duration: 3 }),
    createGroup({ name: "Python", duration: 3 }),
    createGroup({ name: "Node.js", duration: 3 }),
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

  return (
    <Root>
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
                sx={{ position: "relative" }}
                className="flex items-stretch full-height p-xxs2"
              >
                <label htmlFor="teacher-select" className="full-height">
                  <Typography color="#b4b7c3">Учителя</Typography>
                </label>
                <SelectStyled
                  id="teacher-select"
                  autoWidth
                  IconComponent={Icons.ArrowDBold}
                  defaultValue={0}
                >
                  <MenuItem value={0}>Все</MenuItem>
                  <MenuItem value={1}>Eshmatov Toshmat</MenuItem>
                  <MenuItem value={2}>Aliyev Shohrux</MenuItem>
                  <MenuItem value={3}>Azizova Aziza</MenuItem>
                </SelectStyled>
              </HeaderDiv>
              <HeaderDiv
                sx={{ position: "relative" }}
                className="flex items-stretch full-height p-xxs2"
              >
                <label
                  htmlFor="teacher-select"
                  className="flex items-center full-height"
                >
                  <Icons.NotebookBookmark color="#b4b7c3" />
                </label>
                <SelectStyled
                  id="teacher-select"
                  autoWidth
                  IconComponent={Icons.ArrowDBold}
                  defaultValue={0}
                >
                  <MenuItem value={0}>Все</MenuItem>
                  <MenuItem value={1}>Eshmatov Toshmat</MenuItem>
                  <MenuItem value={2}>Aliyev Shohrux</MenuItem>
                  <MenuItem value={3}>Azizova Aziza</MenuItem>
                </SelectStyled>
              </HeaderDiv>

              {/* <CustomSelect
                menuItems={[
                  "Eshmatov Toshmat",
                  "Aliyev Shohrux",
                  "Azizova Aziza",
                ]}
              /> */}
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
            <Grid item xs="auto" md="auto" lg={3} key={i}>
              <GroupCard {...groups[i]} />
            </Grid>
          ))}
        </Grid>
        {/* </Paper> */}
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
