import { Button, IconButton, InputBase, styled } from "@mui/material";
import React from "react";
import { Icons } from "../../../../Assets/Icons/icons";
import { ButtonStyled, Root, Title, theme } from "../../Cabinet";
import { Link, useNavigate } from "react-router-dom";

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
  minWidth: "150px",
  borderRadius: theme.custom.spacing.xxs,
  padding: theme.custom.spacing.xxs,
  font: "inherit",
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.fontSize.sm,
  textTransform: "capitalize",
  boxShadow: "none",
  "&:hover": { boxShadow: "none" },
}));

const NewTeacher = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This navigates one step back in history
  };
  return (
    <Root>
      <div className="full-width">
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
            <Title>Добавить учителя</Title>
          </div>
          <div className="flex items-center gap-sm">
            <DialogButton
              variant="contained"
              color="purpleBlue"
              // onClick={handleClickOpen}
            >
              <span>Добавить</span>
            </DialogButton>
          </div>
        </div>
      </div>
    </Root>
  );
};

export default NewTeacher;
