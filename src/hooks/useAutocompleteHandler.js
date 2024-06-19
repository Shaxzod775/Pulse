import { useState } from "react";

export default function useAutocompleteInput(initial) {
  const [input, setInput] = useState(initial);
  const changeInput = (e, newValue) => {
    setInput(newValue);
  };
  const resetInput = () => {
    setInput("");
  };
  return [input, changeInput, resetInput];
}
