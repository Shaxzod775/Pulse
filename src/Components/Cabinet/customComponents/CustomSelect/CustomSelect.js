import React, { useEffect, useRef, useState } from "react";
import {
  ButtonBase,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { theme } from "../../Cabinet";
import { Icons } from "../../../../Assets/Icons/icons";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import { styled } from "@mui/system";

const Root = styled("div")(({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: "#fff",
  border: "1px solid #E5E7EB",
}));

const CustomSelect = ({ menuItems }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const handleClickOutside = (event) => {
    if (rootRef.current && !rootRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]); // Re-add listener on open state change
  return (
    <Root
      ref={rootRef}
      sx={{
        position: "relative",
        color: theme.typography.color.darkBlue,
        cursor: "pointer",
      }}
      className="flex items-stretch full-height p-xxs2"
      onClick={() => setOpen(!open)}
    >
      <div className="flex">
        <label htmlFor="teacher-select" className="full-height">
          <Typography color="#b4b7c3">Учителя</Typography>
        </label>
        <Typography paddingLeft="8px" paddingRight="8px">
          Все
        </Typography>
        <Icons.ArrowDBold
          color="#b4b7c3"
          width={theme.typography.fontSize.sm}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: "8px",
          left: "0",
          height: "100%",
          overflow: "visible",
          transform: "translateY(100%)",
          zIndex: "1",
        }}
      >
        <Collapse in={open}>
          <Paper
            sx={{
              minMidth: "fit-content",
              color: "inherit",
              overflow: "hidden",
              borderRadius: "8px",
            }}
          >
            <List sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
              {menuItems.map((menuItem, i) => (
                <ButtonBase className="full-width">
                  <ListItem
                    sx={{
                      padding: "8px 16px",
                      "& .MuiListItemText-root": { margin: "0" },
                      backgroundColor: "#eff8fb",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                      cursor: "pointer",
                    }}
                  >
                    <ListItemText
                      sx={{
                        whiteSpace: "nowrap",
                        maxHeight: "max-content",
                      }}
                    >
                      {menuItem}
                    </ListItemText>
                  </ListItem>
                  <TouchRipple />
                </ButtonBase>
              ))}
            </List>
          </Paper>
        </Collapse>
      </div>
    </Root>
  );
};

export default CustomSelect;
