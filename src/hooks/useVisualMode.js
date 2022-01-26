import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

 
  function transition(secondary, replace = false) {
    if (replace) {
      setMode(secondary);
      setHistory((prevArray) => [...prevArray.slice(0, prevArray.length - 1), secondary]);
    } else {
    setMode(secondary);
    setHistory((prevArray) => [...prevArray, secondary]);
    }
  }



  function back() { 
    
    if(history[history.length-1] !== initial){
      history.pop(history.length-1);    
      setMode(history[history.length-1])
    }  
  }
    return { mode, transition, back };
};


  

// export default function useVisualMode(initial, secondary) {
//   const [mode, setMode] = useState(initial);
//   if (secondary) {
//   return function transition(secondary) {
//     setMode(secondary)
//     return { mode };
//   }
// }
//   return { mode };
// }