import React, { useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  duration,
  styled,
} from "@mui/material";
import {
  theme,
  Root,
  Title,
  TextFieldStyled,
  AutocompleteStyled,
  SelectStyled,
} from "../../Cabinet";
import { Icons } from "../../../../Assets/Icons/icons";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import useInput from "../../../../hooks/useInput";
import { createGroup } from "../Groups";

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

const subjects = ["Front-end", "Back-end", "UI/UX", "Flutter", "IT English"];

const FormLabel = styled(Typography)(({ theme }) => ({
  padding: "0",
  color: theme.typography.color.darkBlue,
  fontSize: theme.typography.fontSize.xs,
  lineHeight: "normal",
  paddingBottom: "12px",
  fontWeight: "600",
}));

const AutocompleteField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "8px",
  },
}));

const NewGroupDialog = ({
  open,
  handleClose,
  handleAddGroup,
  ...otherProps
}) => {
  const [name, changeName, resetName] = useInput("");
  const [subject, changeSubject, resetSubject] = useInput(null);
  const [room, changeRoom, resetRoom] = useInput(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // id,
    // name,
    // subject,
    // startDate,
    // endDate,
    const newGroup = createGroup({
      name,
      subject,
      startDate: Date(2024, 1, 1),
      endDate: Date(2024, 1, 1),
    });
    handleAddGroup(newGroup);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (e) => handleSubmit(e),
      }}
      sx={{
        fontFamily: "Rubik",
        "& .MuiPaper-root.MuiDialog-paper": {
          borderRadius: `${theme.custom.spacing.sm}px`,
          maxWidth: "957px",
          width: "957px",
        },
        "& *": {
          boxSizing: "border-box",
        },
      }}
    >
      <Root sx={{ width: "100%" }}>
        <DialogContent
          sx={{
            fontFamily: "Rubik",
            padding: `${theme.custom.spacing.lg}px`,
            width: "100%",
          }}
        >
          <div className="flex flex-col gap-md">
            {/* MAIN CONTENT OF DIALOG */}
            <div>
              <div className="full-width flex gap-sm">
                <div className="flex flex-grow flex-col gap-sm">
                  <FormControl fullWidth variant="outlined">
                    <label htmlFor="name">
                      <FormLabel>Название группы*</FormLabel>
                    </label>
                    <TextFieldStyled id="name" variant="outlined" />
                  </FormControl>
                  <FormControl fullWidth variant="outlined">
                    <label htmlFor="subject">
                      <FormLabel>Выбрать предмет</FormLabel>
                    </label>
                    <AutocompleteStyled
                      options={subjects}
                      value={subject}
                      // onChange={handleTeacherChange}
                      renderInput={(params) => (
                        <AutocompleteField
                          {...params}
                          id="subject"
                          variant="outlined"
                        />
                      )}
                      popupIcon={
                        <Icons.ArrowD color={theme.typography.color.darkBlue} />
                      }
                      clearIcon={
                        <Icons.Delete color={theme.typography.color.darkBlue} />
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth variant="outlined">
                    <label htmlFor="teacher">
                      <FormLabel>Выбрать кабинет</FormLabel>
                    </label>
                    <AutocompleteStyled
                      options={["1", "2", "3", "4", "5", "6"]}
                      // value={"1"}
                      // onChange={handleTeacherChange}
                      renderInput={(params) => (
                        <AutocompleteField
                          {...params}
                          id="teacher"
                          variant="outlined"
                        />
                      )}
                      popupIcon={
                        <Icons.ArrowD color={theme.typography.color.darkBlue} />
                      }
                      clearIcon={
                        <Icons.Delete color={theme.typography.color.darkBlue} />
                      }
                    />
                  </FormControl>
                </div>
                <div className="flex flex-grow gap-sm">
                  <FormControl fullWidth variant="outlined">
                    <label htmlFor="date-start">
                      <FormLabel>Дата начала</FormLabel>
                    </label>
                    <TextFieldStyled
                      id="date-start"
                      variant="outlined"
                      type="date"
                      // value={
                      //   startDate ? startDate.toISOString().split("T")[0] : ""
                      // }
                      // onChange={handleStartDateChange}
                    />
                  </FormControl>
                  <FormControl fullWidth variant="outlined">
                    <label htmlFor="date-start">
                      <FormLabel>Дата завершения</FormLabel>
                    </label>
                    <TextFieldStyled
                      id="date-start"
                      variant="outlined"
                      type="date"
                      // value={
                      //   startDate ? startDate.toISOString().split("T")[0] : ""
                      // }
                      // onChange={handleStartDateChange}
                    />
                  </FormControl>
                </div>
              </div>
            </div>

            {/* DIALOG ACTIONS */}
            <div className="full-width flex justify-end">
              <div className="flex justify-between gap-xxs">
                <DialogButton
                  onClick={handleClose}
                  variant="outlined"
                  color="purpleBlue"
                >
                  Отмена
                </DialogButton>
                <DialogButton
                  type="submit"
                  variant="contained"
                  color="purpleBlue"
                >
                  Сохранить
                </DialogButton>
              </div>
            </div>
          </div>
        </DialogContent>
      </Root>
    </Dialog>
  );
};

export default NewGroupDialog;
