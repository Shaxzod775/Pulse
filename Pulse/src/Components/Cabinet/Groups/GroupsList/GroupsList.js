import React, { useState, useEffect } from 'react'
import { Icons } from "../../../../Assets/Icons/icons";
import { MenuItem } from "@mui/material";
import { ButtonStyled, MenuStyled } from "../../CabinetStyles";
import { weekDaysText } from "../../../../Constants/dateLocales";
import { format } from "date-fns";
import { getRussianWord } from "../../../../helpers/helpers";
import styles from './GroupsList.module.css'

const GroupsList = ({ groupsList }) => {
    const [anchorThreeDots, setAnchorThreeDots] = useState(null);
    const threeDotsMenuOpen = Boolean(anchorThreeDots);
    const [checked, setChecked] = useState(false);


    const handleClickThreeDots = (event) => {
    setAnchorThreeDots(event.currentTarget);
    };

    const handleCloseThreeDotsMenu = () => {
    setAnchorThreeDots(null);
    };


    const handleChangeCheckBox = (event) => {
        setChecked(event.target.checked);
    };

        const calculateLessonCount = (startDate, endDate, classDaysPerWeek) => {
          const start = new Date(startDate);
          const end = new Date(endDate);
  
          const differenceInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  
          const lessonsPerWeek = classDaysPerWeek.length;
  
          const totalLessons = Math.floor(differenceInDays / 7) * lessonsPerWeek;
  
          const remainingDays = differenceInDays % 7;
          for (let i = 0; i < remainingDays; i++) {
              const currentDay = (start.getDay() + i) % 7;
              if (classDaysPerWeek.includes(currentDay)) {
                  totalLessons++;
              }
          }
  
          return totalLessons;
      };



    return (
        <div className={styles["list-container"]}>
        <div className={styles["headers"]}>
          <div className={styles["headers-fullname-container"]}>
            <input type='checkbox' checked={checked} onChange={handleChangeCheckBox} />
            <h2 className={styles["headers-fullname"]}>Название группы</h2>
          </div>
          <div className={styles["otherHeaders-container"]}>
            <h2 className={styles["header-startDate"]}>Дата начала</h2>
            <h2 className={styles["header-endDate"]}>Дата завершения</h2>
            <h2 className={styles["header-classDays"]}>Дни урока</h2>
            <h2 className={styles["header-teacher"]}>Учитель</h2>
            <h2 className={styles["header-duration"]}>Продолжительность</h2>
            <h2 className={styles["header-roomNumber"]}>Кабинет</h2>
            <h2 className={styles["header-studentsNumber"]}>Учеников</h2>
          </div>
        </div>
          <div className={styles["groups-list"]}>
            <div className={"list-wrapper"}>
              {groupsList.map((group, index) => (
              <div key={index} className={`${styles.item} ${index % 2 !== 0 ? 'grey-background' : ''}`}>
                <div className={styles["groupName-container"]}>
                  <input type='checkbox' />
                  <p className={styles["groupName"]}>{`${group.name !== "" ? group.name : "GR000-00"} `}</p>
                </div>
                <div className={styles["otherInfo-container"]}>
                  <p className={styles["startDate"]}>{format(new Date(group.startDate), "dd.MM.yyyy")}</p>
                  <p className={styles["endDate"]}>{format(new Date(group.endDate), "dd.MM.yyyy")}</p>
                  <p className={styles["classDays"]}>{group.classDays.map((weekDay, i) =>`${weekDaysText[weekDay]}${i < group.classDays.length - 1 ? ", " : ""}`)}</p>                              
                  <p className={styles["teacher"]}>{group.teacher.firstName} {group.teacher.lastName}</p>
                  <p className={styles["duration"]}>{group.course.duration}{" "}{getRussianWord(group.duration, "месяц", "месяца", "месяцев")} / {calculateLessonCount(group.startDate, group.endDate, group.classDays)} уроков</p>
                  <p className={styles["roomNumber"]}>{group.roomNumber} кабинет</p>
                  <p className={styles["studentsNumber"]}>10 {getRussianWord(10, "ученик", "ученика", "учеников")}</p>
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

export default GroupsList;