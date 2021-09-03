import { useState } from "react"


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(secondary, replace=false) {
    if (replace){
      setHistory((prev) => [...prev.slice(0, prev.length -1)])
    } else {
    setHistory(prev => [...prev, mode]);
  }
  setMode(secondary);
  }

  function back() {
    const historyTemp = [...history];
    setMode(historyTemp[historyTemp.length - 1])
    historyTemp.pop();
    setHistory(historyTemp);
  }

  return { mode , transition, back};
}