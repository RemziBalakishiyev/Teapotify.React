import React, { useState } from "react";

function useInput(onValid) {
  const [inputValue, setinputValue] = useState("");

  const valueIsValid = onValid(inputValue);
  const hasError = !valueIsValid;

  const valueChangeHandler = (event) => {
    setinputValue(event.target.value);
  };

  const reset = () => {
    setinputValue("");
    setIsTouched(false);
  };

  return {
    value: inputValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    reset,
  };
}

export default useInput;
