import { useState } from 'react';

// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);
  
//   const transition = (mode) => {
//     setMode(mode);
//   }

//   const back = () => {
//     setMode(history.length - 1);
//   }
  
//   return { mode, transition, back };
// }



export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace) => {
    if (replace) {
      back();
    }
    setMode(newMode);
    // setHistory([...history, newMode]); -- this ...history is the original history in const[history, setHistory]
    setHistory(prev => ([...prev, newMode]));
  };

  const back = () => {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
      setHistory(history);
    }
  };
  
  return { mode, transition, back };
}