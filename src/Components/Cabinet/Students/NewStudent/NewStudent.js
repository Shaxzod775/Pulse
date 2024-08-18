import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../../../../Core/api";

import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  ListItemText,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  InputAdornment,
  Popover,
  styled,
} from "@mui/material";
import { MuiColorInput } from 'mui-color-input'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ru } from "date-fns/locale";
import _ from "lodash"; // lodash library
import { MuiTelInput } from "mui-tel-input";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { Icons } from "../../../../Assets/Icons/icons";
import { russianLocale } from "../../../../Constants/dateLocales";
import * as routes from "../../../../Constants/routes";
import {
  REGIONS,
  REGION_WITH_DISTRICTS,
} from "../../../../Constants/usbekistan";
import {
  createEventWithValue,
  formatFileName,
} from "../../../../helpers/helpers";
import useAutocompleteInput from "../../../../hooks/useAutocompleteHandler";
import useInput from "../../../../hooks/useInput";
import { createStudent, editStudent } from "../../../../Slices/studentsSlice";
import {
  AutocompleteField,
  AutocompleteStyled,
  ButtonStyled,
  InputBaseStyled,
  Main,
  Root,
  SquareContainer,
  TextFieldStyled,
  Title,
  TypographyStyled,
  customMenuProps,
  muiTelInputStyles,
  selectStyles,
  textFieldStyles,
  theme,
} from "../../CabinetStyles";
import { getElementError } from "@testing-library/react";

const headerItemStyles = ({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: "#fff",
  border: "1px solid #E5E7EB",
});

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

const PaperStyled = styled(Paper)(({ theme }) => ({
  borderRadius: "20px",
  padding: "20px",
  boxShadow: "none",
}));

const CircleContainer = styled("div")(
  ({ theme, width, height = 160, bgColor = "#fff", active }) => ({
    width: `${width ? width : 160}px`,
    height: `${height}px`,
    backgroundColor: bgColor,
    borderRadius: `${80}px`,
    border: `${active ? "3px dashed #cccccc" : "1px solid #E5E7EB"}`,
    overflow: "hidden",

    "& img": {
      // Set image to cover the entire container
      width: "100%",
      height: "100%",
      objectFit: "cover", // This resizes the image to fit the container

      // Maintain aspect ratio and prevent overflow
      objectPosition: "center", // Center the image within the container
    },

    // animation: `${rainbowCycle} 6s ${
    //   active ? "infinite" : "1"
    // } alternate ease-in-out`,
    // animationDelay: active ? "0s" : "3s", // Control animation timing
  })
);

const FormLabel = styled(Typography)(({ theme, row }) => ({
  padding: "0",
  color: theme.typography.color.darkBlue,
  fontSize: theme.typography.fontSize.xs,
  lineHeight: "normal",
  paddingBottom: row ? "0" : "12px",
  fontWeight: "600",
}));

const RadioStyled = styled(Radio)(({ theme }) => ({
  color: theme.palette.purpleBlue.main,
  "&.Mui-checked": {
    color: theme.palette.purpleBlue.main,
  },
}));

const timeInputStyles = {
  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    textAlign: "center",
    fontWeight: "500",
    height: "100%",
    width: "100%",
    "::placeholder": { color: "#D1D5DB", opacity: "1" },
  },
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "& input[type=number]": {
    "-moz-appearance": "textfield",
  },
}

const NewStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL
  const [student, setStudent] = useState(null); // Add a new state variable for the student

  const goBack = () => {
    navigate(-1); // This navigates one step back in history
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [middleNameError, setMiddleNameError] = useState(false);

  const [parentFirstName, setParentFirstName] = useState("");
  const [parentMiddleName, setParentMiddleName] = useState("");
  const [parentLastName, setParentLastName] = useState("");
  const [parentFirstNameError, setParentFirstNameError] = useState(false);
  const [parentLastNameError, setParentLastNameError] = useState(false);
  const [parentMiddleNameError, setParentMiddleNameError] = useState(false);

  const [comments, setComments] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState("");

  const [gender, changeGender] = useInput("MALE");

  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [passportSeries, setPassportSeries] = useState("");
  const [passportNumber, setPassportNumber] = useState("");

  const [region, changeRegion, resetRegion] = useAutocompleteInput("");
  const [district, changeDistrict, resetDistrict] = useAutocompleteInput("");
  const [location, changeLocation] = useInput("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [parentsPhoneNumbers, setParentsPhoneNumbers] = useState([
    { phoneNumber: "", name: "" },
    { phoneNumber: "", name: "" },
    { phoneNumber: "", name: "" },
  ]);
  const [visibleCount, setVisibleCount] = useState(1);

  const [group, changeGroup, resetGroup] = useAutocompleteInput("");
  const [dateOfEnrollment, setDateOfEnrollment] = useState(null);

  const [hoursNumber, setHoursNumber] = useState("");
  const [minutesNumber, setMinutesNumber] = useState("");

  const [tags, setTags] = useState([{name: "Тег", color: "#E5E7EB"}, {name: "Тег", color: "#E5E7EB"}]);

  const [studentStatus, setStudentStatus] = useInput("");

  const [fileName, changeFileName, resetFileName] = useInput("");
  const [files, setFiles] = useState([]);
  const [editingFileIndex, setEditingFileIndex] = useState(null);
  const [filesError, setFilesError] = useState(false);

  const [description, changeDescription] = useState("");

  const [isOpen, setIsOpen] = useState([]);

  const handleDeleteTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  }

  const handleAddNewTag = () => {
    const newTags = [...tags, {tag: "Тег", color: "#E5E7EB"}];
    setTags(newTags);
  }

  const handleChangeColorPicker = (newColor, index) => {
    const newTags = [...tags];
    newTags[index].color = newColor;
    setTags(newTags);
  };

  const handleClickColorPicker = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpen(newIsOpen);
  };

  
  const handleChangeTextField = (setter) => (event) => {
    if (event.target.value.length <= 500) {
      setter(event.target.value)
    } 
  }


  const handleHoursChange = (setter) => (event) => {
    let inputValue = parseInt(event.target.value, 10);

    // Ensure the value is between 0 and 23
    if (isNaN(inputValue) || inputValue < 0) inputValue = 0;
    if (inputValue > 23) inputValue = 23;

    // Add leading zero for numbers less than 10
    if (inputValue >= 0 && inputValue < 10) {
      inputValue = `0${inputValue}`;
    } else {
      inputValue = `${inputValue}`;
    }

    setter(inputValue);
  };

  const handleMinutesChange = (setter) => (event) => {
    let inputValue = parseInt(event.target.value, 10);

    // Ensure the value is between 0 and 59
    if (isNaN(inputValue) || inputValue < 0) inputValue = 0;
    if (inputValue > 59) inputValue = 59;

    // Add leading zero for numbers less than 10
    if (inputValue >= 0 && inputValue < 10) {
      inputValue = `0${inputValue}`;
    } else {
      inputValue = `${inputValue}`;
    }

    setter(inputValue);
  };


  const handleImageSelection = (acceptedFiles) => {
    // Assuming acceptedFiles is an array containing file objects
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]; // Get the first file
      if (file && file.type.startsWith("image/")) {
        // Check if it's an image
        const reader = new FileReader();
        reader.onload = (event) => {
          setSelectedImage(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please upload an image file.");
      }
    }
  };

  const handleUploadClick = (idToClick) => () => {
    // Simulate file input click event
    const fileInput = document.getElementById(idToClick);
    fileInput.click();
  };

  const handleFileUpload = useCallback(
    (acceptedFile) => {
      const allowedExtensions = ['doc', 'docx', 'pdf', 'excel', 'xls', 'xlsx', 'png', 'jpeg', 'jpg', 'heic'];

      const fileExtension = acceptedFile[0].name.split('.').pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        setFilesError('Вы не можете загружать файл этого формата! Разрешенными форматами являются doc, docx, pdf, excel, xls, xlsx, png, jpeg, jpg, heic');
      } else {
        setFilesError(null);

        const newFile = { name: fileName, file: acceptedFile[0] };
  
        setFiles((prevFiles) => [...prevFiles, newFile]);
  
        resetFileName();
      }
    },
    [fileName, resetFileName]
  );

  const handleFileEditClick = (index) => () => {
    setEditingFileIndex(index);
    handleUploadClick("file-edit-input")();
  };

  const handleFileEdit = (event) => {
    const file = event.target.files[0];

    const allowedExtensions = ['doc', 'docx', 'pdf', 'excel', 'xls', 'xlsx', 'png', 'jpeg', 'jpg', 'heic'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      setFilesError('Вы не можете загружать файл этого формата! Разрешенными форматами являются doc, docx, pdf, excel, xls, xlsx, png, jpeg, jpg, heic');
    } else {
      setFilesError(null);

      setFiles((prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles[editingFileIndex].file = file;
        return newFiles;
      });
      setEditingFileIndex(null); // reset the editing index
    }
  };

  const handleFileDelete = useCallback(
    (index) => () => {
      let newFiles = [...files]; // create a new copy of files array
      newFiles.splice(index, 1); // remove the file at the specified index
      setFiles(newFiles); // update the state
    },
    [files, setFiles]
  );

  const handleChange = (event, setter, setHelperText) => {
    const { value } = event.target;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setter(value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()); // Capitalize the first letter and make the rest lowercase
      setHelperText(false);
    } else {
      setHelperText(true);
    }
  };

  const handleExistingTags = (tags) => {
    const newTags = [];
    tags.forEach(tag => newTags.push({name: tag, color: "#E5E7EB"}) )
    setTags(newTags)
  }

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

  // Function to handle change in date
  const handleDateChange = (setter) => (newDate) => {
    const today = new Date();

    if (newDate instanceof Date && !isNaN(newDate)) {
      if (setter === setDateOfBirth) {
        if (newDate > today) {
          setter(today);
        } else {
          setter(newDate);
        }
      } else {
        setter(newDate);
      }
    } else {
      setter(null);
    }
  };

  const handleChangePassportSeries = (event) => {
    let input = event.target.value;
    // Remove non-letter characters and limit to 2 characters
    input = input.replace(/[^a-zA-Z]/g, "").substring(0, 2);
    // Convert to uppercase
    input = input.toUpperCase();
    // Now you can set the state or do whatever you need with the input
    setPassportSeries(input);
  };

  const handleChangePassportNumber = (event) => {
    let input = event.target.value;
    // Remove non-digit characters and limit to 7 characters
    input = input.replace(/[^0-9]/g, "").substring(0, 7);
    // Now you can set the state or do whatever you need with the input
    setPassportNumber(input);
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

  const handleChangeParentPhoneNumber =
    // useCallback(
    //   _.debounce(
    (index, newPhone) => {
      // Remove all non-digit characters
      const digits = newPhone.replace(/\D/g, "");
      const newValues = [...parentsPhoneNumbers];

      // Check if the new phone number starts with "+998" and does not exceed 12 digits
      if (newPhone.startsWith("+998") && digits.length <= 12) {
        newValues[index].phoneNumber = `+${digits}`;
        setParentsPhoneNumbers(newValues);
      } else if (digits.length <= 3) {
        // If the new phone number is "+99" or "+9", reset it to "+998"
        newValues[index].phoneNumber = "+998";
        setParentsPhoneNumbers(newValues);
      }
    };
  //   , 0),
  //   [parentsPhoneNumbers]
  // ); // delay of 10ms

  const handleAddFields = () => {
    setVisibleCount(visibleCount + 1);
  };

  const handleRemoveFields = (index) => () => {
    // Create a copy of the parentsPhoneNumbers array
    const newParentsPhoneNumbers = [...parentsPhoneNumbers];

    // Remove the field at the specified index
    newParentsPhoneNumbers.splice(index, 1);

    // Add a new empty field at the end of the array
    newParentsPhoneNumbers.push({ phoneNumber: "", name: "" });

    // Update the state with the modified array
    setParentsPhoneNumbers(newParentsPhoneNumbers);
    if (visibleCount > 1) {
      setVisibleCount(visibleCount - 1);
    }
  };

  // Function to submit the form
  const handleClickAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    dateOfBirth.setDate(dateOfBirth.getDate() + 1);
    const dateOfBirthFormatted = dateOfBirth.toISOString().split("T")[0];

    const studentData = {
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      dateOfBirth: dateOfBirthFormatted,
      phoneNumber: phoneNumber,
      secondPhoneNumber: additionalPhoneNumber,
      gender: gender,
      passportSeries: passportSeries,
      passportNumber: passportNumber,
      address: {
        region: region,
        state: district,
        location: location,
      },
      email: email,
      contractNumber: "string",
      tags: tags,
      contacts: parentsPhoneNumbers.filter(
        (parentPhoneNumber) => parentPhoneNumber.phoneNumber !== ""
      ),
      description: description,
    };
    if (id) {
      studentData.id = id;
    }
    console.log(studentData);

    if (id) {
      // If an id is present, update the student
      dispatch(editStudent(studentData));
    } else {
      // Otherwise, create a new student
      dispatch(createStudent(studentData));
    }
    navigate("/cabinet/students");
  };

  useEffect(() => {
    // If an id is present, fetch the student data
    if (id) {
      const fetchStudent = async () => {
        try {
          const response = await api.get(`students/getById/${id}`);
          setStudent(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching student:", error);
        }
      };

      fetchStudent();
    }
  }, [id]);

  // Fill the inputs with the student data
  useEffect(() => {
    if (student) {
      // Determine the number of empty slots needed
      const uniqueContacts = [];
      student.contacts.forEach((contact) => {
        if (!uniqueContacts.find((c) => c.id === contact.id)) {
          uniqueContacts.push(contact);
        }
      });
      const emptyContactSlots = 3 - uniqueContacts.length;
      // Create an array of empty contact objects
      const emptyContacts = Array(emptyContactSlots).fill({
        phoneNumber: "",
        name: "",
      });
      // Combine student.contacts with emptyContacts
      const parentsPhoneNumbers = [...uniqueContacts, ...emptyContacts];
      // Now you can use setParentsPhoneNumbers to update your state
      setVisibleCount(uniqueContacts.length);

      setFirstName(student.firstName);
      setMiddleName(student.middleName);
      setLastName(student.lastName);
      setDateOfBirth(new Date(student.dateOfBirth));
      setPhoneNumber(student.phoneNumber);
      setAdditionalPhoneNumber(student.secondPhoneNumber);
      changeGender(createEventWithValue(student.gender));
      setPassportSeries(student.passportSeries);
      setPassportNumber(student.passportNumber);
      changeRegion({}, student.address.region);
      changeDistrict({}, student.address.state);
      changeLocation(createEventWithValue(student.address.location));
      setEmail(student.email);
      handleExistingTags(student.tags)
      // need contract number state var
      setParentsPhoneNumbers(parentsPhoneNumbers);
      changeDescription(student.description);
    }
  }, [student]);

  useEffect(() => {
    console.log(tags);
  }, [tags]);



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
            <div className="flex flex-col">
              <Title>{id ? "Изменить" : "Добавить"} ученика</Title>
              <div className="flex items-center gap-x3s">
                <Link to={routes.CABINET + routes.STUDENTS} className="link">
                  <Typography fontSize="0.75rem">Ученики</Typography>
                </Link>
                <Icons.ArrowL
                  width="1rem"
                  style={{ transform: "rotate(180deg)" }}
                />
                <Typography fontSize="0.75rem">
                  {id ? "Изменить" : "Добавить"} ученика
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-sm">
            <DialogButton
              variant="outlined"
              color="purpleBlue"
              onClick={goBack}
            >
              <span>Отменить</span>
            </DialogButton>
            <DialogButton
              variant="contained"
              color="purpleBlue"
              onClick={handleClickAdd}
            >
              <span>{id ? "Сохранить" : "Добавить"}</span>
            </DialogButton>
          </div>
        </div>
        <div className="flex justify-between gap-md">
          <PaperStyled className="full-width" sx={{ padding: "30px 52px" }}>
            <div className="flex flex-col gap-md">
              <div
                className="flex gap-sm"
                style={{ paddingLeft: "20px", paddingRight: "20px" }}
              >
                <div>
                  <Dropzone onDrop={handleImageSelection}>
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <CircleContainer
                        className="flex justify-center items-center"
                        active={isDragActive}
                        {...getRootProps()}
                      >
                        <input
                          {...getInputProps({ id: "image-upload-input" })}
                        />
                        {selectedImage ? (
                          <img src={selectedImage} alt="Uploaded" />
                        ) : (
                          <Icons.GalleryAdd />
                        )}
                      </CircleContainer>
                    )}
                  </Dropzone>
                </div>

                <div className="flex flex-col">
                  <div className="full-width full-height">
                    <Title sx={{ fontSize: "1.2rem" }}>Фото профиля</Title>
                    <Typography
                      color="#AEB2BA"
                      fontSize={".8rem"}
                      fontFamily={"Poppins, Rubik, Roboto, sans-serif"}
                    >
                      Мы рекомендуем изображения не менее 1000x1000, вы можете
                      загрузить фото формата PNG, JPG или HEIC размером не более 10 МБ
                    </Typography>
                  </div>
                  <div className="flex gap-xxs">
                    <DialogButton
                      onClick={handleUploadClick("image-upload-input")}
                      variant="contained"
                      color="purpleBlue"
                    >
                      {selectedImage ? "Изменить" : "Загрузить"}
                    </DialogButton>
                    {selectedImage && (
                      <DialogButton
                        onClick={() => setSelectedImage()}
                        variant="outlined"
                        color="crimson"
                      >
                        Удалить
                      </DialogButton>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Title sx={{ fontSize: "1.2rem" }}>
                  Персональная информация
                </Title>
              </div>
              <div className="flex flex-col gap-md">
                <div>
                  <div className="flex gap-xxs">
                    <FormControl required fullWidth variant="outlined">
                      <label>
                        <FormLabel>
                          <div className="flex items-center">
                            Фамилия <TypographyStyled color="red">*</TypographyStyled>
                          </div>
                        </FormLabel>
                      </label>
                      <TextFieldStyled
                        variant="outlined"
                        placeholder="Фамилия"
                        name="family-name"
                        value={lastName}
                        helperText={
                          lastNameError ? "Только латинские буквы!" : ""
                        }
                        onChange={(event) =>
                          handleChange(event, setLastName, setLastNameError)
                        }
                      />
                    </FormControl>
                    <FormControl required fullWidth variant="outlined">
                      <label>
                        <FormLabel>
                          <div className="flex items-center">
                            Имя <TypographyStyled color="red">*</TypographyStyled>
                          </div>
                        </FormLabel>
                      </label>
                      <TextFieldStyled
                        variant="outlined"
                        placeholder="Имя"
                        name="given-name"
                        value={firstName}
                        helperText={
                          firstNameError ? "Только латинские буквы!" : ""
                        }
                        onChange={(event) =>
                          handleChange(event, setFirstName, setFirstNameError)
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
                        name="additional-name"
                        value={middleName}
                        helperText={
                          middleNameError ? "Только латинские буквы!" : ""
                        }
                        onChange={(event) =>
                          handleChange(event, setMiddleName, setMiddleNameError)
                        }
                      />
                    </FormControl>
                  </div>
                </div>
                <Divider />
                <div className="flex items-center justify-between">
                  <label style={{ maxWidth: "25%" }}>
                    <FormLabel row>
                      <div className="flex">
                        Номер телефона <TypographyStyled color="red">*</TypographyStyled>
                      </div>
                    </FormLabel>
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
                        helperText={<span style={{ display: "flex" }}>Основной номер <TypographyStyled color="red">*</TypographyStyled></span>}
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
                <Divider />
                <div>
                  <FormControl>
                    <div className="flex items-center gap-md">
                      <FormLabel id="gender-radios" row>
                        <div className="flex">
                           Пол <TypographyStyled color="red">*</TypographyStyled>
                        </div>
                      </FormLabel>
                      <RadioGroup
                        row
                        value={gender}
                        onChange={changeGender}
                        aria-labelledby="gender-radios"
                        name="gender-radios"
                        sx={{
                          "& > div": { marginRight: "16px" },
                          "& .MuiFormControlLabel-root": { marginRight: "0" },
                        }}
                      >
                        <div className="flex items-center gap-xxs2">
                          <FormControlLabel
                            value="MALE"
                            control={<RadioStyled />}
                            label="Мужской"
                          />
                          <Icons.MaleSymbol
                            // color={theme.typography.color.purpleBlue}
                            color="#62dbfb"
                          />
                        </div>
                        <div className="flex items-center gap-xxs2">
                          <FormControlLabel
                            value="FEMALE"
                            control={<RadioStyled />}
                            label="Женский"
                          />
                          <Icons.FemaleSymbol
                            // color={theme.typography.color.purpleBlue}
                            color="#fe7ab6"
                          />
                        </div>
                      </RadioGroup>
                    </div>
                  </FormControl>
                </div>
                <Divider />
                <div className="flex gap-lg">
                  <div style={{ maxWidth: "30%" }}>
                    <FormControl fullWidth variant="outlined">
                      <label htmlFor="date-start">
                        <FormLabel>
                          <div className="flex items-center">
                            Дата рождения <TypographyStyled color="red">*</TypographyStyled>
                          </div>
                        </FormLabel>
                      </label>
                      <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        adapterLocale={ru}
                        localeText={russianLocale}
                      >
                        <DatePicker
                          sx={textFieldStyles({ theme })}
                          value={dateOfBirth}
                          onChange={handleDateChange(setDateOfBirth)}
                          slots={{
                            openPickerIcon: Icons.CalendarContained,
                          }}
                          slotProps={{
                            field: { clearable: true },
                            openPickerButton: { color: "purpleBlue" },
                          }}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </div>
                  <div>
                    <label>
                      <FormLabel>ID или Свидетельство о рождении</FormLabel>
                    </label>
                    <div className="flex gap-xxs">
                      <FormControl
                        fullWidth
                        variant="outlined"
                        sx={{ maxWidth: "25%" }}
                      >
                        <TextFieldStyled
                          variant="outlined"
                          placeholder="Серия"
                          value={passportSeries}
                          onChange={handleChangePassportSeries}
                        />
                      </FormControl>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        sx={{ maxWidth: "75%" }}
                      >
                        <TextFieldStyled
                          variant="outlined"
                          placeholder="Номер паспорта"
                          value={passportNumber}
                          onChange={handleChangePassportNumber}
                        />
                      </FormControl>
                    </div>
                  </div>
                </div>
                <Divider />

                <FormControl fullWidth variant="outlined">
                  <div className="flex flex-col gap-sm">
                    <div className="flex items-center">
                      <label className="full-width" style={{ maxWidth: "25%" }}>
                        <FormLabel row>
                          <div className="flex items-center">
                            Адрес проживания <TypographyStyled color="red">*</TypographyStyled>
                          </div>
                        </FormLabel>
                      </label>
                    </div>

                    <div className="full-width flex gap-sm" style={{ minWidth: "100%" }}>
                      <FormControl fullWidth variant="outlined">
                        <AutocompleteStyled
                          sx={{ minWidth: "35%" }}
                          options={REGIONS}
                          value={region}
                          onChange={(event, value) => {
                            changeRegion(event, value);
                            resetDistrict();
                          }}
                          renderInput={(params) => (
                            <AutocompleteField
                              {...params}
                              id="city"
                              variant="outlined"
                              placeholder="Регион"
                            />
                          )}
                          popupIcon={
                            <Icons.ArrowD
                              color={theme.typography.color.darkBlue}
                            />
                          }
                          clearIcon={
                            <Icons.Delete
                              color={theme.typography.color.darkBlue}
                            />
                          }

                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined">
                        <AutocompleteStyled
                          options={REGION_WITH_DISTRICTS[region] || [""]}
                          value={district}
                          onChange={changeDistrict}
                          renderInput={(params) => (
                            <AutocompleteField
                              {...params}
                              id="city"
                              variant="outlined"
                              placeholder="Район"
                              helperText={`${
                                region ? "" : "Сначала выберите регион"
                              }`}
                              sx={{ minWidth: "35%" }}
                            />
                          )}
                          disabled={!region}
                          popupIcon={
                            <Icons.ArrowD
                              color={theme.typography.color.darkBlue}
                            />
                          }
                          clearIcon={
                            <Icons.Delete
                              color={theme.typography.color.darkBlue}
                            />
                          }
                        />
                      </FormControl>

                      <TextFieldStyled
                        value={location}
                        onChange={changeLocation}
                        fullWidth
                        variant="outlined"
                        placeholder="Место проживания"
                        sx={{ minWidth: "35%" }}
                      />
                    </div>
                  </div>
                </FormControl>
              </div>
            </div>
          </PaperStyled>
          <PaperStyled className="full-width" sx={{ padding: "30px 52px" }}>
            <div className="flex flex-col gap-md">
              <FormControl fullWidth variant="outlined">
                <div className="flex items-center justify-between">
                  <label style={{ maxWidth: "25%" }}>
                    <FormLabel row>E-mail</FormLabel>
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
                    sx={{ maxWidth: "75%" }}
                  />
                </div>
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <div className="flex items-center justify-between">
                  <label style={{ maxWidth: "25%" }}>
                    <FormLabel row>ID/Номер договора</FormLabel>
                  </label>
                  <TextFieldStyled
                    fullWidth
                    variant="outlined"
                    placeholder="Пример: 011/256"
                    sx={{ maxWidth: "75%" }}
                  />
                </div>
              </FormControl>
              <div className="full-width flex flex-col gap-xs">
                {/* Render the first item */}
                {parentsPhoneNumbers[0] && (
                  <div className="flex items-center justify-between">
                    <label style={{ maxWidth: "25%" }}>
                      <FormLabel row>Телефон родителей</FormLabel>
                    </label>
                    <div
                      className="full-width flex gap-xxs"
                      style={{ maxWidth: "75%" }}
                    >
                      <FormControl fullWidth variant="outlined">
                        <MuiTelInput
                          variant="outlined"
                          helperText="Основной номер"
                          defaultCountry="UZ" 
                          onlyCountries={["UZ"]}
                          value={parentsPhoneNumbers[0].phoneNumber}
                          onChange={(newPhone) =>
                            handleChangeParentPhoneNumber(0, newPhone)
                          }
                          sx={muiTelInputStyles({ theme })}
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined">
                        <MuiTelInput
                          variant="outlined"
                          helperText="Дополнительный номер"
                          defaultCountry="UZ"
                          onlyCountries={["UZ"]}
                          value={parentsPhoneNumbers[0].phoneNumber}
                          onChange={(newPhone) =>
                            handleChangeParentPhoneNumber(0, newPhone)
                          }
                          sx={muiTelInputStyles({ theme })}
                        />
                      </FormControl>
                      <Box className="flex items-center">
                        <IconButton
                          color="crimson"
                          onClick={handleRemoveFields(0)}
                        >
                          <Icons.TrashCan />
                        </IconButton>
                      </Box>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label style={{ maxWidth: "25%" }}>
                    <FormLabel row>ФИО Родителей</FormLabel>
                </label>

                <div className="flex items-center justify-between" style={{ maxWidth: "75%" }}>
                  <FormControl fullWidth variant="outlined">
                    <div className="flex items-center justify-between gap-sm">
                      <TextFieldStyled
                          variant="outlined"
                          placeholder="Фамилия"
                          value={parentLastName}
                          helperText={
                          parentLastNameError ? "Только латинские буквы!" : ""
                          }
                          onChange={(event) =>
                            handleChange(event, setParentLastName, setParentLastNameError)
                          }
                        />

                        <TextFieldStyled
                          variant="outlined"
                          placeholder="Имя"
                          value={parentFirstName}
                          helperText={
                            parentFirstNameError ? "Только латинские буквы!" : ""
                          }
                          onChange={(event) =>
                            handleChange(event, setParentFirstName, setParentFirstNameError)
                          }
                        />

                        <TextFieldStyled
                          variant="outlined"
                          placeholder="Отчество"
                          value={parentMiddleName}
                          helperText={
                            parentMiddleNameError ? "Только латинские буквы!" : ""
                          }
                          onChange={(event) =>
                            handleChange(event, setParentMiddleName, setParentMiddleNameError)
                          }
                        />
                    </div>
                  </FormControl>
                </div>
              </div>

              <div className="flex justify-between">
                <label style={{ minWidth: "25%" }}>
                    <FormLabel row>Комментарии к родителям</FormLabel>
                </label>

                <div className="full-width flex gap-xxs" style={{ maxWidth: "75%" }}>
                  <FormControl fullWidth variant="outlined" >
                    <div className="flex items-start">
                      <TextFieldStyled
                        value={comments}
                        onChange={handleChangeTextField(setComments)}
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        placeholder="Комментарии к родителям"
                        sx={{
                          "& .MuiInputBase-multiline": {
                            padding: "0",
                          },
                        }}
                       />
                    </div>
                  </FormControl>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label style={{ maxWidth: "25%" }}>
                  <FormLabel row>Добавить тег</FormLabel>
                </label>
                <div
                  className="full-width flex flex-wrap gap-x3s"
                  style={{ maxWidth: "75%" }}
                >
                  {tags.map((tag, i) => (
                    <FormControl variant="outlined">
                      <TextField
                        key={i}
                        placeholder={tag.name !== "Тег" ? "" : `${tag.name}`}
                        defaultValue={tag.name !== "Тег" ? `${tag.name}` : ""}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton color={tag.color} onClick={() => handleClickColorPicker(i)}>
                                  <Icons.Pen /> 
                              </IconButton>
                              {i > 1 && <IconButton color="crimson" onClick={() => handleDeleteTag(i)}>
                                  <Icons.TrashCan /> 
                              </IconButton>}
                            </InputAdornment>
                          ),
                          style: { color: tag.color === "#E5E7EB" ? "black" : tag.color },
                        }}
                        id="info"
                        variant="outlined"
                        sx={{
                          width: "150px",
                          fontSize: theme.typography.fontSize.xs,
                          fontWeight: "400",
                          color: "black",
                          "& .MuiInputBase-root": {
                            borderRadius: "8px",
                            ".MuiInputBase-input": {
                              width: "75px",
                              padding: "4.5px 12px",
                              "::placeholder": {
                                color: tag.color,
                                opacity: "1",
                              },
                            },
                            ".MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, &:focus .MuiOutlinedInput-notchedOutline":
                              {
                                border: `1px solid ${tag.color} !important`,
                                boxShadow:
                                  "0px 1px 2px 0px rgba(31, 41, 55, 0.08) !important",
                              },
                          },
                          "& .MuiFormHelperText-root": {
                            color: "crimson",
                            fontSize: ".8rem",
                            margin: "2px 0 -10px 12px",
                          },
                        }}
                      />
                     {isOpen[i] && <MuiColorInput format="hex" value={tag.color} onChange={(color) => handleChangeColorPicker(color, i)} 
                                                  sx={{ zIndex: 2, position: "absolute", top: 35, backgroundColor: "white"}} />}
                    </FormControl>
                  ))}
                  <Chip
                    label="+"
                    variant="outlined"
                    color="purpleBlue"
                    sx={{
                      borderRadius: `${theme.custom.spacing.xxs}px`,
                    }}
                    onClick= {handleAddNewTag}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label style={{ maxWidth: "25%" }}>
                  <FormLabel row>Добавить в группу</FormLabel>
                </label>
                <div
                  className="full-width flex gap-xxs"
                  style={{ maxWidth: "75%" }}
                >
                  <FormControl fullWidth variant="outlined">
                    <AutocompleteStyled
                      options={[
                        "GR10-1010",
                        "GR10-1011",
                        "GR10-1012",
                        "GR10-1013",
                      ]}
                      value={group}
                      onChange={changeGroup}
                      renderInput={(params) => (
                        <AutocompleteField
                          {...params}
                          id="group"
                          variant="outlined"
                          placeholder="Группа"
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
              </div>

              <div className="flex items-center justify-between gap-sm">
                <label style={{ maxWidth: "25%" }}>
                  <FormLabel row>Дата добавления</FormLabel>
                </label>
                <Box width="100%" maxWidth="75%" display="flex" gap="10px">
                  <FormControl variant="outlined">
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      adapterLocale={ru}
                      localeText={russianLocale}
                    >
                      <DatePicker
                        sx={{
                          ...textFieldStyles({ theme }),
                          maxWidth: "230px",
                        }}
                        value={dateOfEnrollment}
                        onChange={handleDateChange(setDateOfEnrollment)}
                        slots={{
                          openPickerIcon: Icons.CalendarContained,
                        }}
                        slotProps={{
                          field: { clearable: true },
                          openPickerButton: { color: "purpleBlue" },
                        }}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  
                  <FormControl variant="outlined">
                    <Box
                      sx={{
                        aspectRatio: 1,
                        maxWidth: "50px",
                        maxHeight: "50px",
                      }}
                    >
                      <TextFieldStyled
                        type="number"
                        id="name"
                        variant="outlined"
                        placeholder="00"
                        value={hoursNumber}
                        onChange={handleHoursChange(setHoursNumber)}
                        sx={timeInputStyles}
                        autoComplete="off"
                      />
                    </Box>
                  </FormControl>
                  <Typography color="#D1D5DB">:</Typography>
                  <FormControl variant="outlined">
                    <Box
                      sx={{
                        aspectRatio: 1,
                        maxWidth: "50px",
                        maxHeight: "50px",
                      }}
                    >
                      <TextFieldStyled
                        type="number"
                        id="name"
                        variant="outlined"
                        placeholder="00"
                        value={minutesNumber}
                        onChange={handleMinutesChange(setMinutesNumber)}
                        sx={timeInputStyles}
                        autoComplete="off"
                      />
                    </Box>
                  </FormControl>
                </Box>
              </div>

              <FormControl fullWidth variant="outlined">
                <div className="flex items-center justify-between">
                  <label style={{ maxWidth: "25%" }}>
                    <FormLabel row>Статус</FormLabel>
                  </label>
                  <Select
                    fullWidth
                    required
                    value={studentStatus}
                    onChange={setStudentStatus}
                    MenuProps={customMenuProps}
                    sx={{ ...selectStyles({ theme }), maxWidth: "75%" }}
                    input={<InputBaseStyled />}
                    IconComponent={Icons.ArrowD}
                  >
                    {["status 0", "status 1", "status 2", "status 3"].map(
                      (leadStatus) => (
                        <MenuItem key={leadStatus} value={leadStatus}>
                          <ListItemText primary={leadStatus} />
                        </MenuItem>
                      )
                    )}
                  </Select>
                </div>
              </FormControl>

              <FormControl fullWidth variant="outlined">
                <div className="flex items-start justify-between">
                  <label style={{ maxWidth: "25%" }}>
                    <FormLabel row>Описание</FormLabel>
                  </label>
                  <TextFieldStyled
                    value={description}
                    onChange={handleChangeTextField(changeDescription)}
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    placeholder="Описание ученика"
                    sx={{
                      maxWidth: "75%",
                      "& .MuiInputBase-multiline": {
                        padding: "0",
                      },
                    }}
                  />
                </div>
              </FormControl>

              <FormControl required fullWidth variant="outlined">
                <div className="flex items-start justify-between">
                  <label style={{ maxWidth: "25%" }}>
                    <FormLabel row>Документы</FormLabel>
                  </label>

                  <Box
                    width="100%"
                    maxWidth="75%"
                    className="flex flex-col"
                    rowGap="12px"
                  >
                    <TextFieldStyled
                      variant="outlined"
                      placeholder="Добавьте название документа"
                      name="file-name"
                      value={fileName}
                      onChange={changeFileName}
                    />
                    <Dropzone onDrop={handleFileUpload} maxFiles={1}>
                      {({ getRootProps, getInputProps, isDragActive }) => (
                        <SquareContainer
                          {...getRootProps({
                            className: "flex justify-center items-center",
                            active: true,
                          })}
                        >
                          <input
                            {...getInputProps({ id: "file-upload-input" })}
                          />

                          <Box
                            className="flex flex-col items-center"
                            rowGap="6px"
                          >
                            <Icons.GalleryAdd color="#D1D5DB" />
                            <TypographyStyled
                              maxWidth="70%"
                              textAlign="center"
                              colorFromTheme="grey"
                            >
                              Загрузите или перетащите ваши документы
                            </TypographyStyled>
                          </Box>
                        </SquareContainer>
                      )}
                    </Dropzone>
                    <input
                      type="file"
                      id="file-edit-input"
                      style={{ display: "none" }}
                      onChange={handleFileEdit}
                    />
                    {filesError && 
                      <TypographyStyled color="crimson" sx={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                          {filesError}
                      </TypographyStyled>
                    }
                    <Box className="flex flex-col" rowGap="8px">
                      {files.map((file, index) => (
                        <>
                          <Box className="flex flex-col" rowGap="8px">
                            <TypographyStyled
                              whiteSpace="nowrap"
                              maxWidth="300px"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              colorFromTheme="lightGrey"
                            >
                              {file.name}
                            </TypographyStyled>
                            <Box
                              className="flex justify-between"
                              columnGap="10px"
                            >
                              <Box
                                className="flex items-center"
                                columnGap="10px"
                              >
                                <TypographyStyled
                                  display="flex"
                                  colorFromTheme="purpleBlue"
                                >
                                  <Icons.ClipboardText />
                                </TypographyStyled>
                                <TypographyStyled
                                  whiteSpace="nowrap"
                                  maxWidth="300px"
                                  overflow="hidden"
                                  textOverflow="ellipsis"
                                >
                                  {formatFileName(file.file.name)}
                                </TypographyStyled>
                              </Box>
                              <Box
                                className="flex items-center"
                                columnGap="10px"
                              >
                                <TypographyStyled whiteSpace="nowrap">
                                  {(file.file.size / 1024 / 1024).toFixed(2)} MB
                                </TypographyStyled>
                                <ButtonStyled
                                  variant="contained"
                                  color="purpleBlue"
                                  onClick={handleFileEditClick(index)}
                                  sx={{ padding: "5px", borderRadius: "4px" }}
                                >
                                  <Icons.Edit width="18px" height="18px" />
                                </ButtonStyled>
                                <ButtonStyled
                                  variant="outlined"
                                  color="crimson"
                                  onClick={handleFileDelete(index)}
                                  sx={{ padding: "4px", borderRadius: "4px" }}
                                >
                                  <Icons.TrashCan width="18px" height="18px" />
                                </ButtonStyled>
                              </Box>
                            </Box>
                          </Box>
                        </>
                      ))}
                      <Box>
                        <DialogButton
                          variant="contained"
                          color="purpleBlue"
                          onClick={handleUploadClick("file-upload-input")}
                        >
                          {files.length === 0 ? "Загрузить" : "Добавить ещё"}
                        </DialogButton>
                      </Box>
                    </Box>
                  </Box>
                </div>
              </FormControl>
            </div>
          </PaperStyled>
        </div>
      </Main>
    </Root>
  );
};

export default NewStudent;
