import { useState } from "react";

export default function useCounter(initial) {
  const [counter, setCounter] = useState(Number(initial));
  const counterPlus = (e) => {
    setCounter(counter + 1);
  };
  const resetCounter = () => {
    setCounter(Number(initial));
  };
  return [counter, counterPlus, resetCounter];
}
