import {
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputBase,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { Icons } from "../../../../Assets/Icons/icons";
import {
  ButtonStyled,
  Main,
  Root,
  TextFieldStyled,
  Title,
  theme,
} from "../../CabinetStyles";
import { Link, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";

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

const NewStudent = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This navigates one step back in history
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [tags, setTags] = useState(["Тег 1", "Тег 2", "Тег 3"]);
  const [tagFormOpen, setTagFormOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameHelperText, setFirstNameHelperText] = useState("");
  const [lastNameHelperText, setLastNameHelperText] = useState("");

  const handleChange = (event, setter, setHelperText) => {
    const { value } = event.target;
    if (/^[a-zA-Z]*$/.test(value)) {
      setter(value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()); // Capitalize the first letter and make the rest lowercase
      setHelperText("");
    } else {
      setHelperText("Только латинские буквы!");
    }
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
        console.error("Please upload an image file.");
      }
    }
  };

  const handleUploadClick = () => {
    // Simulate file input click event
    const fileInput = document.getElementById("file-upload-input");
    fileInput.click();
  };

  // Function to handle adding a new tag
  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  // Function to handle deletion of a tag
  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

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
            <Title>Добавить ученика</Title>
          </div>
          <div className="flex items-center gap-sm">
            <DialogButton
              variant="outlined"
              color="purpleBlue"
              // onClick={handleClickOpen}
            >
              <span>Отменить</span>
            </DialogButton>
            <DialogButton
              variant="contained"
              color="purpleBlue"
              // onClick={handleClickOpen}
            >
              <span>Добавить</span>
            </DialogButton>
          </div>
        </div>
        <div className="flex justify-between gap-sm">
          <PaperStyled className="full-width">
            <div className="flex flex-col gap-sm">
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
                          {...getInputProps({ id: "file-upload-input" })}
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
                      Мы рекомендуем изображения не менее 1000 x 1000, вы можете
                      загрузить PNG или JPG размером менее 10 МБ
                    </Typography>
                  </div>
                  <div className="flex gap-xxs">
                    <DialogButton
                      onClick={handleUploadClick}
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
              <div className="flex flex-col gap-sm">
                <div>
                  <label>
                    <FormLabel>Имя и Фамилия</FormLabel>
                  </label>
                  <div className="flex gap-xxs">
                    <FormControl fullWidth variant="outlined">
                      <TextFieldStyled
                        variant="outlined"
                        placeholder="First name"
                        value={firstName}
                        helperText={firstNameHelperText}
                        onChange={(event) =>
                          handleChange(
                            event,
                            setFirstName,
                            setFirstNameHelperText
                          )
                        }
                      />
                    </FormControl>
                    <FormControl fullWidth variant="outlined">
                      <TextFieldStyled
                        variant="outlined"
                        placeholder="Last name"
                        value={lastName}
                        helperText={lastNameHelperText}
                        onChange={(event) =>
                          handleChange(
                            event,
                            setLastName,
                            setLastNameHelperText
                          )
                        }
                      />
                    </FormControl>
                  </div>
                </div>
                <Divider />
                <div className="flex items-center justify-between">
                  <label style={{ maxWidth: "25%" }}>
                    <FormLabel row>Номер телефона:</FormLabel>
                  </label>
                  <div
                    className="full-width flex gap-xxs"
                    style={{ maxWidth: "75%" }}
                  >
                    <FormControl fullWidth variant="outlined">
                      <TextFieldStyled
                        variant="outlined"
                        placeholder="Номер телефона"
                      />
                    </FormControl>
                    <FormControl fullWidth variant="outlined">
                      <TextFieldStyled
                        variant="outlined"
                        placeholder="Доп. номер"
                      />
                    </FormControl>
                  </div>
                </div>
                <Divider />
                <div>
                  <FormControl>
                    <div className="flex items-center gap-md">
                      <FormLabel id="gender-radios" row>
                        Пол
                      </FormLabel>
                      <RadioGroup
                        row
                        defaultValue="male"
                        aria-labelledby="gender-radios"
                        name="gender-radios"
                      >
                        <FormControlLabel
                          value="male"
                          control={<RadioStyled />}
                          label="Мужской"
                        />
                        <FormControlLabel
                          value="female"
                          control={<RadioStyled />}
                          label="Женский"
                        />
                      </RadioGroup>
                    </div>
                  </FormControl>
                </div>
                <Divider />
                <div className="flex gap-lg">
                  <div>
                    <FormControl fullWidth variant="outlined">
                      <label htmlFor="date-start">
                        <FormLabel>Дата рождения</FormLabel>
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
                        />
                      </FormControl>
                    </div>
                  </div>
                </div>
                <Divider />
                <div>
                  <FormControl fullWidth variant="outlined">
                    <div className="flex items-center gap-md">
                      <label>
                        <FormLabel row>Адрес проживания</FormLabel>
                      </label>
                      <TextFieldStyled
                        fullWidth
                        variant="outlined"
                        placeholder="Страна, Город, Место проживания"
                      />
                    </div>
                  </FormControl>
                </div>
              </div>
            </div>
          </PaperStyled>
          <PaperStyled className="full-width">
            <div className="flex flex-col gap-sm">
              <FormControl fullWidth variant="outlined">
                <div className="flex items-center justify-between">
                  <label style={{ maxWidth: "25%" }}>
                    <FormLabel row>Email</FormLabel>
                  </label>
                  <TextFieldStyled
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
                    placeholder="Example id: 011/256"
                    sx={{ maxWidth: "75%" }}
                  />
                </div>
              </FormControl>
              <div className="flex items-center justify-between">
                <label style={{ maxWidth: "25%" }}>
                  <FormLabel row>Телефон родителей</FormLabel>
                </label>
                <div
                  className="full-width flex gap-xxs"
                  style={{ maxWidth: "75%" }}
                >
                  <FormControl fullWidth variant="outlined">
                    <TextFieldStyled
                      variant="outlined"
                      placeholder="Номер телефона"
                    />
                  </FormControl>
                  <FormControl fullWidth variant="outlined">
                    <TextFieldStyled
                      variant="outlined"
                      placeholder="Доп. номер"
                    />
                  </FormControl>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label style={{ maxWidth: "25%" }}>
                  <FormLabel row>Имя и Фамилия родителя</FormLabel>
                </label>
                <div
                  className="full-width flex gap-xxs"
                  style={{ maxWidth: "75%" }}
                >
                  <FormControl fullWidth variant="outlined">
                    <TextFieldStyled variant="outlined" placeholder="Имя" />
                  </FormControl>
                  <FormControl fullWidth variant="outlined">
                    <TextFieldStyled variant="outlined" placeholder="Фамилия" />
                  </FormControl>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label style={{ maxWidth: "25%" }}>
                  <FormLabel row>Добавить тег:</FormLabel>
                </label>
                <div
                  className="full-width flex flex-wrap gap-x3s"
                  style={{ maxWidth: "75%" }}
                >
                  {tags.map((tag, i) => (
                    <Chip
                      label={tag}
                      onDelete={() => handleDeleteTag(tag)}
                      key={i}
                      variant="outlined"
                      color="purpleBlue"
                      sx={{
                        borderRadius: "8px",
                      }}
                      deleteIcon={
                        <Icons.Delete color={theme.typography.color.darkBlue} />
                      }
                    />
                  ))}
                  {tagFormOpen && (
                    <FormControl variant="outlined">
                      <TextFieldStyled
                        autoFocus
                        required
                        onBlur={() => {
                          setTagFormOpen(!tagFormOpen);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            setTagFormOpen(false);
                            handleAddTag(e.target.value);
                          }
                        }}
                        id="info"
                        variant="outlined"
                        sx={{
                          "& .MuiInputBase-input": {
                            height: theme.typography.fontSize.xs,
                            fontSize: theme.typography.fontSize.xs,
                            lineHeight: theme.typography.fontSize.xs,
                            padding: "8px 11px !important",
                            color: "",
                          },
                        }}
                      />
                    </FormControl>
                  )}
                  <Chip
                    label="+"
                    variant="outlined"
                    color="darkBlue"
                    sx={{
                      borderRadius: `${theme.custom.spacing.xxs}px`,
                    }}
                    onClick={() => setTagFormOpen(!tagFormOpen)}
                  />
                </div>
              </div>
              <FormControl fullWidth variant="outlined">
                <div className="flex items-start justify-between">
                  <label style={{ maxWidth: "25%" }}>
                    <FormLabel row>Описание</FormLabel>
                  </label>
                  <TextFieldStyled
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
            </div>
          </PaperStyled>
        </div>
      </Main>
    </Root>
  );
};

export default NewStudent;
