import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  styled,
} from "@mui/material";
import _ from "lodash"; // lodash library
import { MuiTelInput } from "mui-tel-input";
import React, { useCallback, useState } from "react";
import { Icons } from "../../../../Assets/Icons/icons";
import {
  courseLanguagesFullRu,
  leadSources,
  leadStatusesEnumToText,
} from "../../../../Constants/testData";
import { createEventWithValue } from "../../../../helpers/helpers";
import useInput from "../../../../hooks/useInput";
import useToggle from "../../../../hooks/useToggle";
import {
  AutocompleteField,
  AutocompleteStyled,
  FormLabelStyled,
  InputBaseStyled,
  Root,
  TextFieldStyled,
  customMenuProps,
  muiTelInputStyles,
  selectStyles,
  theme,
} from "../../CabinetStyles";

import { useSelector } from "react-redux";
import {
  selectAllCourseNames,
  selectCourseByName,
} from "../../../../Slices/coursesSlice";

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
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [middleNameError, setMiddleNameError] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, togglePhoneNumberError] = useToggle(false);
  const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [leadSource, setLeadSource] = useState("");

  const [selectedCourseName, changeSelectedCourseName] = useInput(null);

  const [courseLanguages, setCourseLanguages] = useState([]);

  const [comment, changeComment] = useInput("");

  const [selectedStatus, changeSelectedStatus] = useInput("");

  const allCourseNames = useSelector(selectAllCourseNames);
  const selectedCourse = useSelector(selectCourseByName(selectedCourseName));

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
    togglePhoneNumberError(false);
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

  const handleBlurPhoneNumber = () => {
    // Check if the phone number is not valid (not 13 characters length)
    if (phoneNumber.length !== 13 && phoneNumber.length !== 4) {
      // Toggle the phone number error state to true
      togglePhoneNumberError(true);
    } else {
      // If the phone number is valid, ensure the phone number error state is false
      togglePhoneNumberError(false);
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

  // Function to handle change in subject selection
  const handleCourseChange = (event, newValue) => {
    changeSelectedCourseName(createEventWithValue(newValue));
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the phone number is empty or not valid (not 13 characters length)
    if (phoneNumber.length === 0 || phoneNumber.length !== 13) {
      // Toggle the phone number error state to true
      togglePhoneNumberError(true);
      // Exit the function early since the form is not valid
      return;
    }
    // If the phone number is valid, reset the phone number error state
    // togglePhoneNumberError(false);

    const leadData = {
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      email: email,
      phoneNumber: phoneNumber,
      secondPhoneNumber: additionalPhoneNumber,
      comment: comment,
      source: leadSource,
      course_id: selectedCourse.id,
      statusEnum: selectedStatus,
      langEnum: "UZ",
    };

    await handleAddLead(leadData);

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
                  <FormLabelStyled>Фамилия</FormLabelStyled>
                  <TextFieldStyled
                    required
                    variant="outlined"
                    name="family-name"
                    placeholder="Фамилия"
                    value={lastName}
                    helperText={lastNameError ? "Только латинские буквы!" : ""}
                    onChange={(event) =>
                      handleChangeName(event, setLastName, setLastNameError)
                    }
                  />
                </FormControl>
                <FormControl required fullWidth variant="outlined">
                  <FormLabelStyled>Имя</FormLabelStyled>
                  <TextFieldStyled
                    required
                    variant="outlined"
                    name="given-name"
                    placeholder="Имя"
                    value={firstName}
                    helperText={firstNameError ? "Только латинские буквы!" : ""}
                    onChange={(event) =>
                      handleChangeName(event, setFirstName, setFirstNameError)
                    }
                  />
                </FormControl>
                <FormControl fullWidth variant="outlined">
                  <FormLabelStyled>Отчество</FormLabelStyled>
                  <TextFieldStyled
                    variant="outlined"
                    placeholder="Отчество"
                    name="additional-name"
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
                <FormLabelStyled row>Номер телефона</FormLabelStyled>
                <div
                  className="full-width flex gap-xxs"
                  style={{ maxWidth: "75%" }}
                >
                  <FormControl required fullWidth variant="outlined">
                    <MuiTelInput
                      required
                      variant="outlined"
                      defaultCountry="UZ"
                      onlyCountries={["UZ"]}
                      helperText={
                        phoneNumberError
                          ? "Неверный номер телефона"
                          : "Основной номер *"
                      }
                      value={phoneNumber}
                      onChange={(newPhone) =>
                        handleChangePhoneNumber(newPhone, setPhoneNumber)
                      }
                      onBlur={handleBlurPhoneNumber}
                      error={phoneNumberError}
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
                  <FormLabelStyled>E-mail</FormLabelStyled>
                  <TextFieldStyled
                    required
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
                  <FormLabelStyled>Откуда лид</FormLabelStyled>
                  <AutocompleteStyled
                    options={leadSources}
                    value={leadSource}
                    onChange={handleLeadSourceChange}
                    renderInput={(params) => (
                      <AutocompleteField
                        {...params}
                        required
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
                  <FormLabelStyled>Курс</FormLabelStyled>
                  <AutocompleteStyled
                    options={allCourseNames}
                    value={selectedCourseName}
                    onChange={handleCourseChange}
                    renderInput={(params) => (
                      <AutocompleteField
                        {...params}
                        required
                        id="subject"
                        variant="outlined"
                        placeholder="Выберите курс"
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
                <FormControl required fullWidth variant="outlined">
                  <FormLabelStyled>Язык курса</FormLabelStyled>
                  <Select
                    multiple
                    required
                    value={courseLanguages}
                    onChange={handleChangeCourseLanguages}
                    renderValue={(selected) =>
                      selected
                        .map((lang) => courseLanguagesFullRu[lang])
                        .join(", ")
                    }
                    MenuProps={customMenuProps}
                    sx={selectStyles({ theme })}
                    input={<InputBaseStyled />}
                    IconComponent={Icons.ArrowD}
                  >
                    {Object.entries(courseLanguagesFullRu).map(
                      ([key, value]) => (
                        <MenuItem key={key} value={key}>
                          <Checkbox
                            checked={courseLanguages.indexOf(key) > -1}
                          />
                          <ListItemText primary={value} />
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </div>
              <div className="flex gap-lg">
                <FormControl required fullWidth variant="outlined">
                  <FormLabelStyled>Статус</FormLabelStyled>
                  <Select
                    required
                    value={selectedStatus}
                    onChange={changeSelectedStatus}
                    MenuProps={customMenuProps}
                    sx={selectStyles({ theme })}
                    input={<InputBaseStyled />}
                    IconComponent={Icons.ArrowD}
                  >
                    {Object.entries(leadStatusesEnumToText).map(
                      ([key, value]) => (
                        <MenuItem key={key} value={key}>
                          <ListItemText primary={value} />
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
                <FormControl required fullWidth variant="outlined">
                  <FormLabelStyled>Комментарий</FormLabelStyled>
                  <TextFieldStyled
                    multiline
                    required
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
