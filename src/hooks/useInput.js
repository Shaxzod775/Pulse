import { useState } from "react";

export default function useInput(initial) {
  const [input, setInput] = useState(initial);
  const changeInput = (e) => {
    setInput(e.target.value);
  };
  const resetInput = () => {
    setInput("");
  };
  return [input, changeInput, resetInput];
}
