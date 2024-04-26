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
