import {useState} from "react";

export default function useVisualMode(initMode) {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode]);


  const transition = (mode, replace = false) => {
    if (replace) {
      setHistory(prev => {
        prev[prev.length - 1] = mode;
        return prev;
      })
    } else {
      setHistory(prev => [...prev, mode]);
    }
    setMode(mode);
  }

  
  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  }

  return {mode, transition, back}
}