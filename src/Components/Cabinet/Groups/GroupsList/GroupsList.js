import React, { useState } from 'react'
import { Icons } from "../../../../Assets/Icons/icons";
import { weekDaysText } from "../../../../Constants/dateLocales";
import { format } from "date-fns";
import { getRussianWord } from "../../../../helpers/helpers";
import {
  Box,
  MenuItem,
  Typography,
} from "@mui/material";
import { ButtonStyled, CustomCheckbox, MenuStyled } from "../../CabinetStyles";

const GroupsList = ({
  keyId,
  id,
  name,
  startDate,
  endDate,
  course,
  classDays,
  duration,
  courseTime,
  roomNumber,
  teacher,
  handleDeleteGroup,
  selectedGroupIds,
  handleSelectGroup,
}) => {
    const [anchorThreeDots, setAnchorThreeDots] = useState(null);
    const threeDotsMenuOpen = Boolean(anchorThreeDots);

    const calculateLessonCount = (startDate, endDate, classDaysPerWeek) => {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const differenceInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

      const lessonsPerWeek = classDaysPerWeek.length;

      const totalLessons = Math.floor(differenceInDays / 7) * lessonsPerWeek;

      const remainingDays = differenceInDays % 7;
      for (let i = 0; i < remainingDays; i++) {
          const currentDay = (start.getDay() + i) % 7;
          if (classDaysPerWeek.includes(currentDay)) {
              totalLessons++;
          }
      }

      return totalLessons;
  };


    const handleCloseThreeDotsMenu = () => {
      setAnchorThreeDots(null);
    };


    const handleOpenThreeDotsMenu = (event) => {
      setAnchorThreeDots(event.currentTarget);
    };

    return (
      <Box className="flex flex-row items-center text-center justify-between" sx={{ height: "75px" , backgroundColor:`${keyId % 2 !== 0 ? "#F9F9F9" : "white"}`,
                 marginLeft:"25px", marginRight:"45px", fontWeight:"500", fontSize:"10px", textAlign:"center", color:"#7D8594", opacity:"0.7" }}>
        <Box className="flex flex-row" marginLeft="45px" position="relative" id={id} >
          <CustomCheckbox checked={selectedGroupIds.includes(id)} onChange={() => handleSelectGroup(id)}/>
          <Typography>
            {name}
          </Typography>
        </Box>
        <Box className="flex flex-row items-center align-center" postition="absolute">
          <Typography position="absolute" left="465px" >
              {format(new Date(startDate), "dd.MM.yyyy")}
          </Typography>
          <Typography position="absolute" left="595px">
              {format(new Date(endDate), "dd.MM.yyyy")}
          </Typography>
          <Typography position="absolute" left="760px">
            {classDays.map((weekDay, i) =>`${weekDaysText[weekDay]}${i < classDays.length - 1 ? ", " : ""}`)}
          </Typography>
          <Typography position="absolute" left="875px">
             {teacher.firstName} {teacher.lastName}
          </Typography>
          <Typography position="absolute" left="1000px">
            {course.duration}{" "}{getRussianWord(course.duration, "месяц", "месяца", "месяцев")} / {calculateLessonCount(startDate, endDate, classDays)} уроков
          </Typography>
          <Typography position="absolute" left="1194px">
            {roomNumber} кабинет
          </Typography>
          <Typography position="absolute" left="1325px">
            10 {getRussianWord(10, "ученик", "ученика", "учеников")}
          </Typography>
          <ButtonStyled className="flex justify-center items-center" variant="contained" 
                        sx={{ width:"20px", height:"20px", backgroundColor: "white", 
                        color:"#6574D8" , position:"absolute", left:"1395px", border:"1px solid #6574D8", borderRadius:"5px",
                        "&:hover": {
                          backgroundColor: "white",
                        }}} 
                        onClick={handleOpenThreeDotsMenu}>
            <Box className="flex items-center">
              <Icons.ThreeDotsHor />
            </Box>
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
                  <ButtonStyled color="error" onClick={() => handleDeleteGroup(id)}>
                    <Icons.TrashCan />
                    <span>Удалить группу</span>
                  </ButtonStyled>
                </MenuItem>
                <MenuItem
                  onClick={handleCloseThreeDotsMenu}
                  disableRipple
                ></MenuItem>
              </MenuStyled> 
        </Box>
      </Box>
    )
}

export default GroupsList;