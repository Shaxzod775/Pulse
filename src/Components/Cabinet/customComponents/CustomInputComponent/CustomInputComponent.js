import { TextFieldStyled } from "../../CabinetStyles";

export const CustomInputComponent = ({
  variant = "outlined",
  placeholder = "Номер телефона",
  value,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => (
  <TextFieldStyled
    variant={variant}
    placeholder={placeholder}
    value={value}
    onChange={(event) => onChange(event.target.value)}
    onFocus={onFocus}
    onBlur={onBlur}
    inputProps={props} // pass the rest of the props to the underlying input element
  />
);
