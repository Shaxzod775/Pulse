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
