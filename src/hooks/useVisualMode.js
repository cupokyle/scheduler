import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //Refactor transition and back functions with Mentor

  const transition = (mode, replace = false) => {
    // When replace is true, reset last history item to current mode.
    if (replace === true) {
      const tempHistory = [...history];
      tempHistory.pop();
      tempHistory.push(mode);
      setHistory([...tempHistory]);
      setMode(mode);
      // When replace is false (default), add mode to history and set mode.
    } else {
      setHistory([...history, mode]);
      setMode(mode);
    }
  };

  const back = () => {
    // If mode is not in initial state, run back function
    if (mode !== "FIRST") {
      // If there is history set, create a clone of it and remove the final item
      if (history.length) {
        const tempHistory = [...history];
        tempHistory.pop();
        const newTempHistory = tempHistory.slice(-1)[0];
        // New history is one history item previous
        setMode(newTempHistory);
        // set new history
        setHistory(tempHistory);
      }
    }
  };

  return { mode, transition, back };
}
