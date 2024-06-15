import React, { useState, useEffect } from 'react'
import { Icons } from "../../../../Assets/Icons/icons";
import { MenuItem } from "@mui/material";
import { ButtonStyled, MenuStyled } from "../../CabinetStyles";

import styles from './StudentsList.module.css'

const StudentsList = ({ students, handleDeleteStudent }) => {
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
          <div className={styles["headers-fullname-container"]}>
            <input type='checkbox' checked={checked} onChange={handleChangeCheckBox} />
            <h2 className={styles["headers-fullname"]}>ФИО</h2>
          </div>
          <div className={styles["otherHeaders-container"]}>
            <h2 className={styles["header-specialization"]}>Направление</h2>
            <h2 className={styles["header-group"]}>Группа</h2>
            <h2 className={styles["header-phoneNumber"]}>Номер</h2>
            <h2 className={styles["header-mail"]}>Почта</h2>
            <h2 className={styles["header-teacher"]}>Учитель</h2>
          </div>
        </div>
          <div className={styles["students-list"]}>
            <div className={"list-wrapper"}>
              {students.map((student, index) => (
              <div key={index} className={`${styles.item} ${index % 2 !== 0 ? 'grey-background' : ''}`}>
                <div className={styles["fullname-container"]}>
                  <input type='checkbox' />
                  <p className={styles["fullname"]}>{`${student.firstName} ${student.lastName}`}</p>
                </div>
                <div className={styles["otherInfo-container"]}>
                  <p className={styles["specialization"]}>Frontend, UX/UI</p>
                  <p className={styles["group"]}>UX/UI GR011-62</p>
                  <p className={styles["phoneNumber"]}>{formatUzbekPhoneNumber(student.phoneNumber)}</p>
                  <p className={styles["mail"]}>{student.email}</p>
                  <p className={styles["teacher"]}>Arslan Koptleulov</p>
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
                        <ButtonStyled color="error" onClick={() => handleDeleteStudent(student.id)}>
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

export default StudentsList;