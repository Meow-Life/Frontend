import React, { useState } from 'react';
import AppContext from './Context';

const ContextProvider = ({ children }) => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState('')
  const [pswd, setPswd] = useState('')
  const [catName, setCatName] = useState('')
  const [hungerLvl, updateHunger] = useState(0);
  const [thirstLvl, updateThirst] = useState(0);
  const [catHearts, updateHearts] = useState(3);
  const [userPoints, updatePoints] = useState(200);


  const data = {
    name, 
    setName,
    email, 
    setEmail,
    pswd,
    setPswd,
    catName, 
    setCatName,
    hungerLvl,
    updateHunger,
    thirstLvl, 
    updateThirst,
    catHearts,
    updateHearts,
    userPoints, 
    updatePoints
  };

  return (
    <AppContext.Provider value={ data }> 
      {children}
    </AppContext.Provider>
  );
}

export default ContextProvider;