import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogContent,
  FormControl,
  InputAdornment,
  InputBase,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  duration,
  keyframes,
  styled,
  textFieldClasses,
} from "@mui/material";
import {
  theme,
  Root,
  Title,
  TextFieldStyled,
  AutocompleteStyled,
  SelectStyled,
  AutocompleteField,
  textFieldStyles,
  muiTelInputStyles,
  customMenuProps,
  selectStyles,
  InputBaseStyled,
} from "../../CabinetStyles";
import { Icons } from "../../../../Assets/Icons/icons";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import useInput from "../../../../hooks/useInput";
import { createLead } from "../Leads";
import Dropzone from "react-dropzone";
import { calculateMonthDifference } from "../../Courses/NewCourseDialog/NewCourseDialog";
import { useCourses } from "../../../../contexts/Courses.context";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ru } from "date-fns/locale";
import { russianLocale } from "../../../../Constants/dateLocales";
import { MuiTelInput } from "mui-tel-input";
import _ from "lodash"; // lodash library
import {
  languagesFullRu,
  leadSources,
  leadStatuses,
} from "../../../../Constants/testData";

const DialogButton = styled(Button)(({ theme, variant, color }) => ({
  minHeight: "44px",
  minWidth: "150px",
  borderRadius: theme.custom.spacing.xxs,
  border:
    variant === "contained" ? `1px solid ${theme.palette[color].main}` : "",
  padding: "10px 30px",
  font: "inherit",
  fontWeight: "400",
  textTransform: "none",
  boxShadow: "none",
  "&:hover": { boxShadow: "none" },
}));

const FormLabel = styled(Typography)(({ theme }) => ({
  padding: "0",
  color: theme.typography.color.darkBlue,
  fontSize: theme.typography.fontSize.xs,
  lineHeight: "normal",
  paddingBottom: "12px",
  letterSpacing: "0.32px",
  fontWeight: "600",
}));

const teacherNames = [
  "Koptleulov Arslan",
  "Ilya Starodubtsev",
  "Aziz Mamajonov",
  "Muhammad Matchonov",
];

const NewLeadDialog = ({ open, handleClose, handleAddLead, ...otherProps }) => {
  const { courses, findCourseByName, allCourseNames } = useCourses();

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [middleNameError, setMiddleNameError] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [leadSource, setLeadSource] = useState("");

  const [selectedCourseNames, setSelectedCourseNames] = useState([]);

  const [courseLanguages, setCourseLanguages] = useState([]);

  const [comment, changeComment] = useInput("");

  const [selectedStatus, changeSelectedStatus] = useInput("");

  const handleChangeName = (event, setter, setHelperText) => {
    const { value } = event.target;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setter(value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()); // Capitalize the first letter and make the rest lowercase
      setHelperText(false);
    } else {
      setHelperText(true);
    }
  };

  const handleChangePhoneNumber = (newPhone, phoneNumberSetter) => {
    // Remove all non-digit characters
    const digits = newPhone.replace(/\D/g, "");

    // Check if the new phone number starts with "+998" and does not exceed 12 digits
    if (newPhone.startsWith("+998") && digits.length <= 12) {
      phoneNumberSetter(`+${digits}`);
    } else if (digits.length <= 3) {
      // If the new phone number is "+99" or "+9", reset it to "+998"
      phoneNumberSetter("+998");
    }
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handleBlurEmail = useCallback(
    _.debounce((event) => {
      const email = event.target.value;
      if (email === "") return;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setEmailError(!emailRegex.test(email));
    }, 500),
    [setEmailError]
  );

  const handleLeadSourceChange = (event, newValue) => {
    setLeadSource(newValue);
  };

  const handleChangeCourses = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCourseNames(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeCourseLanguages = (event) => {
    const {
      target: { value },
    } = event;
    setCourseLanguages(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const fullName = `${lastName} ${firstName} ${middleName}`;
    const newLead = createLead({
      name: fullName,
      phoneNumber: phoneNumber,
      additionalPhoneNumber: additionalPhoneNumber,
      email: email,
      leadSource: leadSource,
      selectedCourseNames: selectedCourseNames,
      courseLanguages: courseLanguages,
      comment: comment,
    });
    handleAddLead(newLead);
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
        "& .MuiPaper-root.MuiDialog-paper": {
          borderRadius: `${theme.custom.spacing.sm}px`,
          maxWidth: "924px",
          width: "924px",
        },
        // "& *": {
        //   boxSizing: "border-box",
        // },
      }}
    >
      <Root sx={{ width: "100%" }}>
        <DialogContent
          sx={{
            padding: `${theme.custom.spacing.lg}px`,
            width: "100%",
          }}
        >
          <div className="flex flex-col gap-lg">
            {/* MAIN CONTENT OF DIALOG */}
            <div className="flex flex-col gap-sm">
              <div className="flex gap-xxs">
                <FormControl required fullWidth variant="outlined">
                  <label>
                    <FormLabel>Фамилия *</FormLabel>
                  </label>
                  <TextFieldStyled
                    variant="outlined"
                    placeholder="Фамилия"
                    value={lastName}
                    helperText={lastNameError ? "Только латинские буквы!" : ""}
                    onChange={(event) =>
                      handleChangeName(event, setLastName, setLastNameError)
                    }
                  />
                </FormControl>
                <FormControl required fullWidth variant="outlined">
                  <label>
                    <FormLabel>Имя *</FormLabel>
                  </label>
                  <TextFieldStyled
                    variant="outlined"
                    placeholder="Имя"
                    value={firstName}
                    helperText={firstNameError ? "Только латинские буквы!" : ""}
                    onChange={(event) =>
                      handleChangeName(event, setFirstName, setFirstNameError)
                    }
                  />
                </FormControl>
                <FormControl fullWidth variant="outlined">
                  <label>
                    <FormLabel>Отчество</FormLabel>
                  </label>
                  <TextFieldStyled
                    variant="outlined"
                    placeholder="Отчество"
                    value={middleName}
                    helperText={
                      middleNameError ? "Только латинские буквы!" : ""
                    }
                    onChange={(event) =>
                      handleChangeName(event, setMiddleName, setMiddleNameError)
                    }
                  />
                </FormControl>
              </div>
              <div className="flex items-center justify-between">
                <label style={{ maxWidth: "25%" }}>
                  <FormLabel row>Номер телефона:</FormLabel>
                </label>
                <div
                  className="full-width flex gap-xxs"
                  style={{ maxWidth: "75%" }}
                >
                  <FormControl fullWidth variant="outlined">
                    <MuiTelInput
                      variant="outlined"
                      defaultCountry="UZ"
                      onlyCountries={["UZ"]}
                      helperText="Основной номер"
                      value={phoneNumber}
                      onChange={(newPhone) =>
                        handleChangePhoneNumber(newPhone, setPhoneNumber)
                      }
                      sx={muiTelInputStyles({ theme })}
                    />
                  </FormControl>
                  <FormControl fullWidth variant="outlined">
                    <MuiTelInput
                      variant="outlined"
                      defaultCountry="UZ"
                      onlyCountries={["UZ"]}
                      helperText="Дополнительный номер"
                      value={additionalPhoneNumber}
                      onChange={(newPhone) =>
                        handleChangePhoneNumber(
                          newPhone,
                          setAdditionalPhoneNumber
                        )
                      }
                      sx={muiTelInputStyles({ theme })}
                    />
                  </FormControl>
                </div>
              </div>
              <div className="flex gap-lg">
                <FormControl required fullWidth variant="outlined">
                  <label>
                    <FormLabel>E-mail</FormLabel>
                  </label>
                  <TextFieldStyled
                    value={email}
                    error={emailError}
                    helperText={
                      emailError ? "Неверный формат электронной почты" : ""
                    }
                    onChange={handleChangeEmail}
                    onBlur={handleBlurEmail}
                    fullWidth
                    variant="outlined"
                    placeholder="info@gmail.com"
                  />
                </FormControl>
                <FormControl required fullWidth variant="outlined">
                  <label>
                    <FormLabel>Откуда лид</FormLabel>
                  </label>
                  <AutocompleteStyled
                    options={leadSources}
                    value={leadSource}
                    onChange={handleLeadSourceChange}
                    renderInput={(params) => (
                      <AutocompleteField
                        {...params}
                        id="subject"
                        variant="outlined"
                        placeholder=""
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
              <div className="flex gap-lg">
                <FormControl required fullWidth variant="outlined">
                  <label>
                    <FormLabel>Курсы</FormLabel>
                  </label>
                  <Select
                    multiple
                    value={selectedCourseNames}
                    onChange={handleChangeCourses}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={customMenuProps}
                    sx={selectStyles({ theme })}
                    input={<InputBaseStyled />}
                    IconComponent={Icons.ArrowD}
                  >
                    {allCourseNames.map((courseName) => (
                      <MenuItem key={courseName} value={courseName}>
                        <Checkbox
                          checked={selectedCourseNames.indexOf(courseName) > -1}
                        />
                        <ListItemText primary={courseName} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl required fullWidth variant="outlined">
                  <label>
                    <FormLabel>Язык курса</FormLabel>
                  </label>
                  <Select
                    multiple
                    value={courseLanguages}
                    onChange={handleChangeCourseLanguages}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={customMenuProps}
                    sx={selectStyles({ theme })}
                    input={<InputBaseStyled />}
                    IconComponent={Icons.ArrowD}
                  >
                    {languagesFullRu.map((language) => (
                      <MenuItem key={language} value={language}>
                        <Checkbox
                          checked={courseLanguages.indexOf(language) > -1}
                        />
                        <ListItemText primary={language} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="flex gap-lg">
                <FormControl required fullWidth variant="outlined">
                  <label>
                    <FormLabel>Язык курса</FormLabel>
                  </label>
                  <Select
                    value={selectedStatus}
                    onChange={changeSelectedStatus}
                    MenuProps={customMenuProps}
                    sx={selectStyles({ theme })}
                    input={<InputBaseStyled />}
                    IconComponent={Icons.ArrowD}
                  >
                    {leadStatuses.map((leadStatus) => (
                      <MenuItem key={leadStatus} value={leadStatus}>
                        <ListItemText primary={leadStatus} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl required fullWidth variant="outlined">
                  <label>
                    <FormLabel>Комментарий</FormLabel>
                  </label>
                  <TextFieldStyled
                    multiline
                    rows={3}
                    variant="outlined"
                    placeholder="Напишите комментарий"
                    value={comment}
                    onChange={changeComment}
                    sx={{
                      "& .MuiInputBase-multiline": {
                        padding: "0",
                      },
                    }}
                  />
                </FormControl>
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

export default NewLeadDialog;
