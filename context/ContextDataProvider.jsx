'use client'


import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();



export  const ContextDataProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(false);
    const [screenSize, setScreenSize] = useState(undefined);





    const handleClick = (clicked) => {
      setIsClicked({...initialState, [clicked]:true});
    }
    const handleClickClose = (clicked) => {
      setIsClicked({...initialState, [clicked]:false});
    }
  return (
  <StateContext.Provider
    value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        handleClickClose,
        screenSize,
        setScreenSize,


    }}
  >
    {children}
  </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext)