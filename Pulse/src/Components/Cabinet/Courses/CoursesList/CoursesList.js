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

const CoursesList = ({
  keyId,
  id,
  name,
  handleDeleteCourse,
  selectedCoursesIds,
  handleSelectCourse,
}) => {
  const [anchorThreeDots, setAnchorThreeDots] = useState(null);
  const threeDotsMenuOpen = Boolean(anchorThreeDots);
  
  const formatUzbekPhoneNumber = (phoneNumber) => {
      
    const countryCode = phoneNumber.slice(0, 4); 
    const operatorCode = phoneNumber.slice(4, 6); 
    const firstPart = phoneNumber.slice(6, 9); 
    const secondPart = phoneNumber.slice(9, 11); 
    const thirdPart = phoneNumber.slice(11, 13); 

    return `${countryCode} (${operatorCode}) ${firstPart}-${secondPart}-${thirdPart}`;
  }

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
          <CustomCheckbox checked={selectedCoursesIds.includes(id)} onChange={() => handleSelectCourse(id)}/>
          <Typography>
            {name}
          </Typography>
        </Box>
        <Box className="flex flex-row items-center align-center" postition="absolute">
          <Typography position="absolute" left="663px" >
              22.05.2024
          </Typography>
          <Typography position="absolute" left="818px">
             UX/UI GR011-62
          </Typography>
          <Typography position="absolute" left="953px">
              {formatUzbekPhoneNumber('+998900331533')}
          </Typography>
          <Typography position="absolute" left="1108px">
              example@gmail.com
          </Typography>
          <Typography position="absolute" left="1300px">
              Arslan Koptleulov
          </Typography>
          <ButtonStyled className="flex justify-center items-center" variant="contained" 
                        sx={{ width:"20px", height:"20px", backgroundColor: "white", 
                        color:"#6574D8" , position:"absolute", left:"1415px", border:"1px solid #6574D8", borderRadius:"5px",
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
                  <ButtonStyled color="error" onClick={() => handleDeleteCourse(id)}>
                    <Icons.TrashCan />
                    <span>Удалить курс</span>
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

export default CoursesList;
