import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //Refactor transition and back functions with Mentor

  const transition = (mode, replace = false) => {
    if (replace === true) {
      const tempHistory = [...history];
      tempHistory.pop();
      tempHistory.push(mode);
      setHistory([...tempHistory]);
      setMode(mode);
    } else {
      setHistory([...history, mode]);
      setMode(mode);
    }
  };

  const back = () => {
    if (history.length) {
      const tempHistory = [...history];
      tempHistory.pop();
      const prev = tempHistory.slice(-1)[0];
      setMode(prev);
      setHistory(tempHistory);
    }
  };

  return { mode, transition, back };
}
