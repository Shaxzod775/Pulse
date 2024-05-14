import { socialMediaWithIcons } from "../Constants/testData";

import { Icons } from "../Assets/Icons/icons";

export function getRussianWord(num, form1, form2, form3) {
  if (num % 10 === 1 && num % 100 !== 11) {
    return form1; // for "месяц"
  } else if (
    num % 10 >= 2 &&
    num % 10 <= 4 &&
    (num % 100 < 10 || num % 100 >= 20)
  ) {
    return form2; // for "месяца"
  } else {
    return form3; // for "месяцев"
  }
}

export function formattedPhoneNumber(phoneNumber) {
  if (typeof phoneNumber !== "string" || phoneNumber.length !== 13) {
    console.error(`Invalid phone number: ${phoneNumber}`);
    return phoneNumber;
  }

  return (
    phoneNumber.slice(0, 4) +
    " (" +
    phoneNumber.slice(4, 6) +
    ") " +
    phoneNumber.slice(6, 9) +
    "-" +
    phoneNumber.slice(9, 11) +
    "-" +
    phoneNumber.slice(11)
  );
}

export function calculateMonthDifference(startDate, endDate) {
  // Handle invalid dates or missing values
  if (!startDate || !endDate) {
    return 0; // Or handle it differently as needed
  }

  const yearsDifference = endDate.getFullYear() - startDate.getFullYear();
  const monthsDifference = endDate.getMonth() - startDate.getMonth();

  // Floor the month difference considering years difference
  return monthsDifference + yearsDifference * 12;
}

export function formatFileName(fileName) {
  const dotIndex = fileName.lastIndexOf(".");
  const name = fileName.substring(0, dotIndex);
  const lastDigitsToBeSeen = 2;
  const extension = fileName.substring(dotIndex - lastDigitsToBeSeen);

  const maxLength = 20; // adjust as needed
  const formattedName =
    name.length > maxLength
      ? `${name.substring(0, maxLength - 4)}...${extension}`
      : fileName;

  return formattedName;
}

export function getSocialIconByName(name) {
  // Convert the name to lowercase and remove any whitespace
  const formattedName = name.toLowerCase().trim();

  // Create a new object with all keys in lowercase
  const formattedIcons = Object.keys(socialMediaWithIcons).reduce(
    (result, key) => {
      result[key.toLowerCase()] = socialMediaWithIcons[key];
      return result;
    },
    {}
  );

  // Return the icon, or Icons.Globe if the icon doesn't exist
  return formattedIcons[formattedName] || Icons.Globe;
}
