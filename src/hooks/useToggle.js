import { useState } from "react";

export default function useToggle(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const toggleValue = (newValue) => {
    setValue((currentValue) =>
      typeof newValue === "boolean" ? newValue : !currentValue
    );
  };
  return [value, toggleValue];
}
