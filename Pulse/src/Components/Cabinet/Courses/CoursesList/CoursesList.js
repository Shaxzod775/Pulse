import React, { useState, useEffect } from 'react'
import { Icons } from "../../../../Assets/Icons/icons";
import { MenuItem } from "@mui/material";
import { ButtonStyled, MenuStyled } from "../../CabinetStyles";
import api from "../../../../Core/api";

import styles from './CoursesList.module.css'

const CoursesList = () => {
    const [coursesList, setCoursesList] = useState([]);
    const [anchorThreeDots, setAnchorThreeDots] = useState(null);
    const threeDotsMenuOpen = Boolean(anchorThreeDots);
    const [checked, setChecked] = useState(false);

    
    const formatUzbekPhoneNumber = (phoneNumber) => {
      
      const countryCode = phoneNumber.slice(0, 4); 
      const operatorCode = phoneNumber.slice(4, 6); 
      const firstPart = phoneNumber.slice(6, 9); 
      const secondPart = phoneNumber.slice(9, 11); 
      const thirdPart = phoneNumber.slice(11, 13); 

      return `${countryCode} (${operatorCode}) ${firstPart}-${secondPart}-${thirdPart}`;
    }


    useEffect(() => {
        const fetchCourses = async () => {
        try {
            // Выполняем GET-запрос для получения списка курсов
            const response = await api.get("courses");
            // Обновляем состояние courses данными из ответа
            setCoursesList(response.data);
            // Logging the courses immediately after setting them
            console.log(response.data);
        } catch (error) {
            // Обрабатываем ошибки
            console.error("Error fetching courses:", error);
            // Можно вывести сообщение об ошибке пользователю или предпринять другие действия
        }
        };

    // Вызываем функцию для загрузки курсов при монтировании компонента
    fetchCourses();
  }, []); // Пустой массив зависимостей означает, что эффект будет выполняться только один раз при монтировании компонента



    const handleClickThreeDots = (event) => {
    setAnchorThreeDots(event.currentTarget);
    };

    const handleCloseThreeDotsMenu = () => {
    setAnchorThreeDots(null);
    };


    const handleChangeCheckBox = (event) => {
        setChecked(event.target.checked);
    };


    return (
      <div className={styles["list-container"]}>
        <div className={styles["headers"]}>
          <div className={styles["headers-courseName-container"]}>
            <input type='checkbox' checked={checked} onChange={handleChangeCheckBox} />
            <h2 className={styles["headers-courseName"]}>Название курса</h2>
          </div>
          <div className={styles["otherHeaders-container"]}>
            <h2 className={styles["header-endDate"]}>Дата завершения</h2>
            <h2 className={styles["header-group"]}>Группа</h2>
            <h2 className={styles["header-phoneNumber"]}>Номер</h2>
            <h2 className={styles["header-mail"]}>Почта</h2>
            <h2 className={styles["header-teacher"]}>Учитель</h2>
          </div>
        </div>
          <div className={styles["courses-list"]}>
            <div className={"list-wrapper"}>
              {coursesList.map((course, index) => (
              <div key={index} className={`${styles.item} ${index % 2 !== 0 ? 'grey-background' : ''}`}>
                <div className={styles["courseName-container"]}>
                  <input type='checkbox' />
                  <p className={styles["courseName"]}>{`${course.name}`}</p>
                </div>
                <div className={styles["otherInfo-container"]}>
                  <p className={styles["endDate"]}>22.06.2024</p>
                  <p className={styles["group"]}>UX/UI GR011-62</p>
                  <p className={styles["phoneNumber"]}>{formatUzbekPhoneNumber('+998941172455')}</p>
                  <p className={styles["mail"]}>exsample@gmail.com</p>
                  <p className={styles["teacher"]}>Arslan Koptleulov</p>
                  {/* <p className={styles["teacher"]}>{`${course.teacher.firstName} ${course.teacher.lastName}`}</p> */}
                  <ButtonStyled
                    onClick={handleClickThreeDots}
                    variant="outlined"
                    color="purpleBlue"
                    sx={{ minWidth: "0", position: 'absolute', left: '1465px', width: '30px' }}
                   >
                    <Icons.MenuDots />
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
                        <ButtonStyled color="error">
                            <Icons.TrashCan />
                            <span>Удалить ученика</span>
                        </ButtonStyled>
                        </MenuItem>
                        <MenuItem
                        onClick={handleCloseThreeDotsMenu}
                        disableRipple
                        ></MenuItem>
                    </MenuStyled>
                </div>
              </div>
            ))}
            </div>
          </div>
      </div>
    )
}

export default CoursesList;
