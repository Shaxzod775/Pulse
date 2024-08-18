import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as routes from "../../../../Constants/routes";

import api from "../../../../Core/api";

import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  ListItemText,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
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
import {
  socialMediaTypes,
  uzbekEducationLevels,
} from "../../../../Constants/testData";
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
import { createTeacher, editTeacher } from "../../../../Slices/teachersSlice";
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

const NewTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL
  const [teacher, setTeacher] = useState(null); // Add a new state variable for the teacher

  const goBack = () => {
    navigate(-1); // This navigates one step back in history
  };

  //Фото профиля
  const [selectedImage, setSelectedImage] = useState(null);

  //Имя
  const [firstName, setFirstName] = useState("");
  //Отчество
  const [middleName, setMiddleName] = useState("");
  //Фамилия
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [middleNameError, setMiddleNameError] = useState(false);

  //Номер телефона
  const [phoneNumber, setPhoneNumber] = useState("");
  const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState("");

  //Пол
  const [gender, changeGender] = useInput("MALE");

  //Дата рождения
  const [dateOfBirth, setDateOfBirth] = useState(null);

  //ID или Свидетельство о рождении
  const [passportSeries, setPassportSeries] = useState("");
  const [passportNumber, setPassportNumber] = useState("");

  //Адрес проживания
  const [region, changeRegion, resetRegion] = useAutocompleteInput("");
  const [district, changeDistrict, resetDistrict] = useAutocompleteInput("");
  const [location, changeLocation] = useInput("");

  //Ссылки
  const [links, setLinks] = useState([{ url: "", type: "" }]);

  //E-mail
  const [email, changeEmail] = useInput("");
  const [emailError, setEmailError] = useState(false);
  //E-mail (корпоративный)
  const [emailCorp, changeEmailCorp] = useInput("");
  const [emailErrorCorp, setEmailErrorCorp] = useState(false);

  //ID/Номер договора

  //ПИНФЛ
  const [pinfl, changePinfl] = useInput("");

  //ИНПС
  const [inps, changeInps] = useInput("");

  //Направления
  const [selectedCourseNames, setSelectedCourseNames] = useState([]);

  //Дата начала работы
  const [dateOfEmployment, setDateOfEmployment] = useState(null);

  //Вид контракта
  const [typeOfContrat, changeTypeOfContract] = useInput("");

  //Должность
  const [jobPositions, setJobPositions] = useState([]);

  //Филиалы
  const [branches, setBranches] = useState([]);

  //Добавить тег
  const [tags, setTags] = useState([{tag: "Тег", color: "#E5E7EB"}, {tag: "Тег", color: "#E5E7EB"}]);
  const [tagFormOpen, setTagFormOpen] = useState(false);

  //Документы
  const [fileName, changeFileName, resetFileName] = useInput("");
  const [files, setFiles] = useState([]);
  const [editingFileIndex, setEditingFileIndex] = useState(null);
  const [filesError, setFilesError] = useState(null);

  //Описание
  const [description, changeDescription] = useState("");

  // Открытие палитры тэгов
  const [isOpen, setIsOpen] = useState([]);

  const handleImageSelection = useCallback((acceptedFiles) => {
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
  }, []);

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

  const handleChangeTextField = (setter) => (event) => {
    if (event.target.value.length <= 500) {
      setter(event.target.value)
    } 
  }

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

  const handleClickColorPicker = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpen(newIsOpen);
  };

  
  const handleAddNewTag = () => {
    const newTags = [...tags, {tag: "Тег", color: "#E5E7EB"}];
    setTags(newTags);
  }

  const handleDeleteTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  }
  
  const handleChangeColorPicker = (newColor, index) => {
    const newTags = [...tags];
    newTags[index].color = newColor;
    setTags(newTags);
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

  const handleBlurEmail = useCallback(
    _.debounce((event) => {
      const email = event.target.value;
      if (email === "") return;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setEmailError(!emailRegex.test(email));
    }, 500),
    [setEmailError]
  );

  const handleBlurEmailCorp = useCallback(
    _.debounce((event) => {
      const emailCorp = event.target.value;
      if (emailCorp === "") return;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setEmailErrorCorp(!emailRegex.test(emailCorp));
    }, 500),
    [setEmailErrorCorp]
  );

  const handleLinkChange = useCallback((index, event) => {
    setLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      newLinks[index].url = event.target.value;
      return newLinks;
    });
  }, []);

  const handleTypeChange = useCallback(
    (index) => (event, newValue) => {
      setLinks((prevLinks) => {
        const newLinks = [...prevLinks];
        newLinks[index].type = newValue;
        return newLinks;
      });
    },
    []
  );

  const addLink = () => {
    setLinks([...links, { url: "", type: "" }]);
  };

  const handleChangeMultipleSelect = useCallback(
    (setter) => (event) => {
      const {
        target: { value },
      } = event;
      setter(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    },
    []
  );

  const handleClickAdd = async (e) => {
    e.preventDefault();

    dateOfBirth.setDate(dateOfBirth.getDate() + 1);
    //cz I don't know why but date is one day different when it goes to the database like

    const teacherData = {
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      email: email,
      corporateEmail: emailCorp,
      phoneNumber: phoneNumber,
      secondPhoneNumber: additionalPhoneNumber,
      gender: gender,
      dateOfBirth: dateOfBirth,
      passportSeries: passportSeries,
      passportNumber: passportNumber,
      contacts: [
        { name: "alwi", phoneNumber: "1231321123" },
        { name: "annaa", phoneNumber: "123212312" },
      ],
      education: null,
      contractNumber: "1223",
      description: description,
      inps: inps,
      pnfl: pinfl,
      tags: tags,
      address: {
        region: region,
        state: district,
        location: location,
      },
    };
    if (id) {
      teacherData.teacherId = id;
    }
    console.log("teacherData:");
    console.log(teacherData);
    if (id) {
      // If an id is present, update the teacher
      dispatch(editTeacher(teacherData));
    } else {
      // Otherwise, create a new teacher
      dispatch(createTeacher(teacherData));
    }
    navigate("/cabinet/teachers");
  };

  useEffect(() => {
    // If an id is present, fetch the teacher data
    if (id) {
      const fetchTeacher = async () => {
        try {
          const response = await api.get(`teachers/getById/${id}`);
          setTeacher(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching teacher:", error);
        }
      };

      fetchTeacher();
    }
  }, [id]);

  // Fill the inputs with the teacher data
  useEffect(() => {
    if (teacher) {
      setFirstName(teacher.firstName);
      setMiddleName(teacher.middleName);
      setLastName(teacher.lastName);
      changeEmail(createEventWithValue(teacher.email));
      changeEmailCorp(createEventWithValue(teacher.corporateEmail));
      setPhoneNumber(teacher.phoneNumber);
      setAdditionalPhoneNumber(teacher.secondPhoneNumber);
      changeGender(createEventWithValue(teacher.gender));
      setDateOfBirth(new Date(teacher.dateOfBirth));
      setPassportSeries(teacher.passportSeries);
      setPassportNumber(teacher.passportNumber);
      //no parent contacts, education, contractNumber (for now I guess) for teacher
      changeDescription(createEventWithValue(teacher.description));
      changeInps(createEventWithValue(teacher.inps));
      changePinfl(createEventWithValue(teacher.pnfl));
      setTags(teacher.tags);
      changeRegion({}, teacher.address.region);
      changeDistrict({}, teacher.address.state);
      changeLocation(createEventWithValue(teacher.address.location));
    }
  }, [teacher]);

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
              <Title>{id ? "Изменить" : "Добавить"} учителя</Title>
              <div className="flex items-center gap-x3s">
                <Link to={routes.CABINET + routes.TEACHERS} className="link">
                  <Typography fontSize="0.75rem">Учителя</Typography>
                </Link>
                <Icons.ArrowL
                  width="1rem"
                  style={{ transform: "rotate(180deg)" }}
                />
                <Typography fontSize="0.75rem">
                  {id ? "Изменить" : "Добавить"} учителя
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
        <Box className="flex justify-between" columnGap="20px">
          <PaperStyled
            className="full-width"
            sx={{ maxWidth: "calc(50% - 10px)", padding: "30px" }}
          >
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
                <Title fontSize="1.2rem">Персональная информация</Title>
              </div>
              <div className="flex flex-col gap-md">
                <div>
                  <div className="flex flex-row gap-xxs">
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
                      <div className="flex items-center">
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
                        helperText={<span style={{ display: "flex" }}>Основной номер<TypographyStyled color="red">*</TypographyStyled></span>}
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
                        <div className="flex items-center">
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
                          <Icons.MaleSymbol />
                        </div>
                        <div className="flex items-center gap-xxs2">
                          <FormControlLabel
                            value="FEMALE"
                            control={<RadioStyled />}
                            label="Женский"
                          />
                          <Icons.FemaleSymbol />
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
                      <div
                        className="full-width flex gap-xxs"
                        style={{ maxWidth: "75%" }}
                      >
                        <FormControl fullWidth variant="outlined">
                          <AutocompleteStyled
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
                                // error={!city}
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
                      </div>
                    </div>

                    {/* <div className="flex gap-xxs" style={{ marginLeft: "25%" }}> */}
                    <TextFieldStyled
                      fullWidth
                      variant="outlined"
                      placeholder="Место проживания"
                      value={location}
                      onChange={changeLocation}
                      sx={{ marginLeft: "25%", maxWidth: "75%" }}
                    />
                    {/* </div> */}
                  </div>
                </FormControl>
              </div>
              <Box className="flex flex-col" rowGap="30px">
                <Box className="flex justify-center">
                  <Title fontSize="1.2rem">Социальная информация</Title>
                </Box>
                <Box className="flex flex-col" rowGap="20px">
                  {links[0] && (
                    <Box className="flex items-center justify-between">
                      <Box maxWidth="25%">
                        <FormLabel row>Ссылки</FormLabel>
                      </Box>
                      <Box className="full-width flex gap-xxs" maxWidth="75%">
                        <FormControl fullWidth variant="outlined">
                          <TextFieldStyled
                            fullWidth
                            variant="outlined"
                            placeholder="Введите"
                            value={links[0].url}
                            onChange={(event) => handleLinkChange(0, event)}
                          />
                        </FormControl>
                        <FormControl fullWidth variant="outlined">
                          <AutocompleteStyled
                            freeSolo // enables user to enter their own option, by default hides popup icon
                            forcePopupIcon // forces popup icon to appear again
                            options={socialMediaTypes}
                            value={links[0].type}
                            onChange={handleTypeChange[0]}
                            renderInput={(params) => (
                              <AutocompleteField
                                {...params}
                                id="subject"
                                variant="outlined"
                                helperText="Выберите или введите свой вариант"
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
                      </Box>
                    </Box>
                  )}
                  {links.slice(1, links.length).map((link, index) => (
                    <Box
                      className="full-width flex gap-xxs"
                      maxWidth="75%"
                      marginLeft="25%"
                    >
                      <FormControl fullWidth variant="outlined">
                        <TextFieldStyled
                          fullWidth
                          variant="outlined"
                          placeholder="Введите"
                          value={links[index + 1].url}
                          onChange={(event) =>
                            handleLinkChange(index + 1, event)
                          }
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined">
                        <AutocompleteStyled
                          freeSolo // enables user to enter their own option, by default hides popup icon
                          forcePopupIcon // forces popup icon to appear again
                          options={socialMediaTypes}
                          value={links[index + 1].type}
                          onChange={handleTypeChange[index + 1]}
                          renderInput={(params) => (
                            <AutocompleteField
                              {...params}
                              id="subject"
                              variant="outlined"
                              placeholder="Выберите или введите"
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
                    </Box>
                  ))}
                  <Box maxWidth="75%" marginLeft="25%">
                    <DialogButton
                      variant="outlined"
                      color="purpleBlue"
                      onClick={addLink}
                      disabled={links.length >= 10}
                    >
                      Добавить ещё
                    </DialogButton>
                  </Box>
                </Box>
              </Box>
            </div>
          </PaperStyled>

          <PaperStyled
            className="full-width"
            sx={{ maxWidth: "calc(50% - 10px)", padding: "30px" }}
          >
            <div className="flex flex-col gap-md">
              <FormControl fullWidth variant="outlined">
                <div className="flex items-center justify-between">
                  <label style={{ maxWidth: "25%" }}>
                    <FormLabel row>E-mail</FormLabel>
                  </label>
                  <TextFieldStyled
                    name="email"
                    value={email}
                    error={emailError}
                    helperText={
                      emailError ? "Неверный формат электронной почты" : ""
                    }
                    onChange={changeEmail}
                    onBlur={handleBlurEmail}
                    onFocus={() => setEmailError(false)}
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
                    <FormLabel row>E-mail (корпоративный)</FormLabel>
                  </label>
                  <TextFieldStyled
                    name="additional-email"
                    value={emailCorp}
                    error={emailErrorCorp}
                    helperText={
                      emailErrorCorp ? "Неверный формат электронной почты" : ""
                    }
                    onChange={changeEmailCorp}
                    onBlur={handleBlurEmailCorp}
                    onFocus={() => setEmailErrorCorp(false)}
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
              <FormControl fullWidth variant="outlined">
                <div className="flex items-center justify-between">
                  <label style={{ maxWidth: "25%" }}>
                    <FormLabel row>ПИНФЛ</FormLabel>
                  </label>
                  <TextFieldStyled
                    fullWidth
                    value={pinfl}
                    onChange={changePinfl}
                    variant="outlined"
                    // placeholder="Пример: 011/256"
                    sx={{ maxWidth: "75%" }}
                  />
                </div>
              </FormControl>
              <FormControl fullWidth variant="outlined">
                <div className="flex items-center justify-between">
                  <label style={{ maxWidth: "25%" }}>
                    <FormLabel row>ИНПС</FormLabel>
                  </label>
                  <TextFieldStyled
                    fullWidth
                    value={inps}
                    onChange={changeInps}
                    variant="outlined"
                    // placeholder="Пример: 011/256"
                    sx={{ maxWidth: "75%" }}
                  />
                </div>
              </FormControl>
              <FormControl required fullWidth variant="outlined">
                <div className="flex items-center justify-between">
                  <label style={{ maxWidth: "25%" }}>
                    <FormLabel row>Образование</FormLabel>
                  </label>
                  <Box width="100%" maxWidth="75%">
                    <Select
                      fullWidth
                      multiple
                      required
                      value={selectedCourseNames}
                      onChange={handleChangeMultipleSelect(
                        setSelectedCourseNames
                      )}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={customMenuProps}
                      sx={selectStyles({ theme })}
                      input={<InputBaseStyled />}
                      IconComponent={Icons.ArrowD}
                    >
                      {uzbekEducationLevels.map((educationalLevel) => (
                        <MenuItem
                          key={educationalLevel}
                          value={educationalLevel}
                        >
                          <Checkbox
                            checked={
                              selectedCourseNames.indexOf(educationalLevel) > -1
                            }
                          />
                          <ListItemText primary={educationalLevel} />
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </div>
              </FormControl>
              <FormControl required fullWidth variant="outlined">
                <div className="flex items-center justify-between">
                  <label style={{ maxWidth: "25%" }}>
                    <FormLabel row>Дата начала работы</FormLabel>
                  </label>
                  <Box width="100%" maxWidth="75%">
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
                        value={dateOfEmployment}
                        onChange={handleDateChange(setDateOfEmployment)}
                        slots={{
                          openPickerIcon: Icons.CalendarContained,
                        }}
                        slotProps={{
                          field: { clearable: true },
                          openPickerButton: { color: "purpleBlue" },
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                </div>
              </FormControl>
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
                        placeholder={tag.tag}
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

              <FormControl fullWidth variant="outlined">
                <div className="flex items-center justify-between">
                  <label style={{ maxWidth: "25%" }}>
                    <FormLabel row>Вид контракта</FormLabel>
                  </label>
                  <Select
                    fullWidth
                    required
                    value={typeOfContrat}
                    onChange={changeTypeOfContract}
                    MenuProps={customMenuProps}
                    sx={{ ...selectStyles({ theme }), maxWidth: "75%" }}
                    input={<InputBaseStyled />}
                    IconComponent={Icons.ArrowD}
                  >
                    {["ГПХ", "ГПХ", "ГПХ", "ГПХ"].map((leadStatus) => (
                      <MenuItem key={leadStatus} value={leadStatus}>
                        <ListItemText primary={leadStatus} />
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </FormControl>
              <FormControl required fullWidth variant="outlined">
                <div className="flex items-center justify-between">
                  <label style={{ maxWidth: "25%" }}>
                    <FormLabel row>Должность</FormLabel>
                  </label>
                  <Box width="100%" maxWidth="75%">
                    <Select
                      fullWidth
                      multiple
                      required
                      value={jobPositions}
                      onChange={handleChangeMultipleSelect(setJobPositions)}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={customMenuProps}
                      sx={selectStyles({ theme })}
                      input={<InputBaseStyled />}
                      IconComponent={Icons.ArrowD}
                    >
                      {uzbekEducationLevels.map((educationalLevel) => (
                        <MenuItem
                          key={educationalLevel}
                          value={educationalLevel}
                        >
                          <Checkbox
                            checked={
                              jobPositions.indexOf(educationalLevel) > -1
                            }
                          />
                          <ListItemText primary={educationalLevel} />
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </div>
              </FormControl>
              <FormControl required fullWidth variant="outlined">
                <div className="flex items-center justify-between">
                  <label style={{ maxWidth: "25%" }}>
                    <FormLabel row>Филиалы</FormLabel>
                  </label>
                  <Box width="100%" maxWidth="75%">
                    <Select
                      fullWidth
                      multiple
                      required
                      value={branches}
                      onChange={handleChangeMultipleSelect(setBranches)}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={customMenuProps}
                      sx={selectStyles({ theme })}
                      input={<InputBaseStyled />}
                      IconComponent={Icons.ArrowD}
                    >
                      {uzbekEducationLevels.map((educationalLevel) => (
                        <MenuItem
                          key={educationalLevel}
                          value={educationalLevel}
                        >
                          <Checkbox
                            checked={branches.indexOf(educationalLevel) > -1}
                          />
                          <ListItemText primary={educationalLevel} />
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
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
                    <Dropzone onDrop={handleFileUpload}>
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
                    placeholder="Описание учителя"
                    sx={{
                      maxWidth: "75%",
                      "& .MuiInputBase-multiline": {
                        padding: "0",
                      },
                    }}
                  />
                </div>
              </FormControl>
            </div>
          </PaperStyled>
        </Box>
      </Main>
    </Root>
  );
};

export default NewTeacher;
