import { useState } from "react";

function useToggleState(initialValue = false): [boolean, () => void] {
  const [state, setState] = useState(initialValue);
  const toggleState = () => {
    setState((state) => !state);
  };

  return [state, toggleState];
}

export default useToggleState;
