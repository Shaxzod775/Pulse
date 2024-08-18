import { Box, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Icons } from "../../../../Assets/Icons/icons";
import { deleteCourse } from "../../../../reducers/courses.reducer";
import { ButtonStyled, CustomCheckbox, MenuStyled } from "../../CabinetStyles";

const CoursesList = ({
  keyId,
  id,
  name,
  selectedCoursesIds,
  handleSelectCourse,
}) => {
  const dispatch = useDispatch();
  const [anchorThreeDots, setAnchorThreeDots] = useState(null);
  const threeDotsMenuOpen = Boolean(anchorThreeDots);

  const formatUzbekPhoneNumber = (phoneNumber) => {
    const countryCode = phoneNumber.slice(0, 4);
    const operatorCode = phoneNumber.slice(4, 6);
    const firstPart = phoneNumber.slice(6, 9);
    const secondPart = phoneNumber.slice(9, 11);
    const thirdPart = phoneNumber.slice(11, 13);

    return `${countryCode} (${operatorCode}) ${firstPart}-${secondPart}-${thirdPart}`;
  };

  const handleCloseThreeDotsMenu = () => {
    setAnchorThreeDots(null);
  };

  const handleOpenThreeDotsMenu = (event) => {
    setAnchorThreeDots(event.currentTarget);
  };

  const handleDeleteCourse = () => {
    dispatch(deleteCourse(id));
  };

  return (
    <Box
      className="flex flex-row items-center justify-between"
      sx={{
        height: "75px",
        backgroundColor: `${keyId % 2 !== 0 ? "#F9F9F9" : "white"}`,
        marginLeft: "25px",
        marginRight: "45px",
        fontWeight: "500",
        fontSize: "13px",
        textAlign: "center",
        color: "#7D8594",
        opacity: "0.7",
      }}
    >
      <Box className="flex flex-row" marginLeft="45px" id={id}>
        <CustomCheckbox
          checked={selectedCoursesIds.includes(id)}
          onChange={() => handleSelectCourse(id)}
        />
        <Typography>{name}</Typography>
      </Box>
      <Box
        className="flex flex-row items-center justify-between"
        flexGrow="3"
        maxWidth="70%"
        paddingLeft="20px"
      >
        <Typography display="flex" alignItems="flex-start" width="23%">
          22.05.2024
        </Typography>
        <Typography display="flex" alignItems="flex-start" width="18%">
          UX/UI GR011-62
        </Typography>
        <Typography display="flex" alignItems="flex-start" width="25%">
          {formatUzbekPhoneNumber("+998900331533")}
        </Typography>
        <Typography display="flex" alignItems="flex-start" width="30%">
          example@gmail.com
        </Typography>
        <Typography display="flex" alignItems="flex-start" width="21%">
          Arslan Koptleulov
        </Typography>
        <Box width="7%">
          <ButtonStyled
            className="flex justify-center items-center"
            variant="contained"
            sx={{
              width: "20px",
              height: "20px",
              backgroundColor: "white",
              color: "#6574D8",
              border: "1px solid #6574D8",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
            onClick={handleOpenThreeDotsMenu}
          >
            <Box className="flex items-center">
              <Icons.ThreeDotsHor />
            </Box>
          </ButtonStyled>
        </Box>
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
            <ButtonStyled color="error" onClick={handleDeleteCourse}>
              <Icons.TrashCan />
              <span>Удалить курс</span>
            </ButtonStyled>
          </MenuItem>
          <MenuItem onClick={handleCloseThreeDotsMenu} disableRipple></MenuItem>
        </MenuStyled>
      </Box>
    </Box>
  );
};

export default CoursesList;
