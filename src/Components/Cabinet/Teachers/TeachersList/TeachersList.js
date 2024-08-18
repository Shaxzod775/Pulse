import { Box, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Icons } from "../../../../Assets/Icons/icons";
import { deleteTeacher } from "../../../../Slices/teachersSlice";
import { ButtonStyled, CustomCheckbox, MenuStyled } from "../../CabinetStyles";

const TeachersList = ({
  keyId,
  id,
  firstName,
  lastName,
  phoneNumber,
  gender,
  secondPhoneNumber,
  selectedTeacherIds,
  handleSelectTeacher,
}) => {
  const dispatch = useDispatch();
  const [anchorThreeDots, setAnchorThreeDots] = useState(null);
  const threeDotsMenuOpen = Boolean(anchorThreeDots);

  const handleCloseThreeDotsMenu = () => {
    setAnchorThreeDots(null);
  };

  const handleDeleteTeacher = () => {
    dispatch(deleteTeacher(id));
  };

  const handleOpenThreeDotsMenu = (event) => {
    setAnchorThreeDots(event.currentTarget);
  };

  const formatUzbekPhoneNumber = (phoneNumber) => {
    const countryCode = phoneNumber.slice(0, 4);
    const operatorCode = phoneNumber.slice(4, 6);
    const firstPart = phoneNumber.slice(6, 9);
    const secondPart = phoneNumber.slice(9, 11);
    const thirdPart = phoneNumber.slice(11, 13);

    return `${countryCode} (${operatorCode}) ${firstPart}-${secondPart}-${thirdPart}`;
  };

  return (
    <Box
      className="flex flex-row items-center text-center justify-between"
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
      <Box
        className="flex flex-row"
        marginLeft="45px"
        position="relative"
        id={id}
      >
        <CustomCheckbox
          checked={selectedTeacherIds.includes(id)}
          onChange={() => handleSelectTeacher(id)}
        />
        <Typography>
          {firstName} {lastName}
        </Typography>
      </Box>
      <Box
        className="flex flex-row items-center"
        flexGrow="3"
        maxWidth="75%"
        paddingLeft="25px"
      >
        <Typography display="flex" alignItems="flex-start" width="15%">
          Frontend, UX/UI
        </Typography>
        <Typography display="flex" alignItems="flex-start" width="14%">
          6
        </Typography>
        <Typography display="flex" alignItems="flex-start" width="17%">
          {formatUzbekPhoneNumber(phoneNumber)}
        </Typography>
        <Typography display="flex" alignItems="flex-start" width="14%">
          333
        </Typography>
        <Typography display="flex" alignItems="flex-start" width="19%">
          28.02.2024
        </Typography>
        <Typography display="flex" alignItems="flex-start" width="15%">
          IT Park Tashkent
        </Typography>
        <ButtonStyled
          className="flex justify-center items-center"
          variant="contained"
          sx={{
            width: "20px",
            height: "20px",
            backgroundColor: "white",
            color: "#6574D8",
            position: "absolute",
            left: "1405px",
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
            <ButtonStyled color="error" onClick={handleDeleteTeacher}>
              <Icons.TrashCan />
              <span>Удалить учителя</span>
            </ButtonStyled>
          </MenuItem>
          <MenuItem onClick={handleCloseThreeDotsMenu} disableRipple></MenuItem>
        </MenuStyled>
      </Box>
    </Box>
  );
};

export default TeachersList;
