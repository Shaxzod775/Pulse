import { useEffect, useReducer } from "react";
import { useLocalStorage } from "./useStorage";

export default function useReducerLocalStorage(reducer, defaultValue, key) {
  const [valueInStorage, setValueInStorage] = useLocalStorage(
    key,
    defaultValue
  );
  const [value, dispatch] = useReducer(reducer, valueInStorage);

  useEffect(() => {
    setValueInStorage(value);
  }, [value]);

  return [value, dispatch];
}
