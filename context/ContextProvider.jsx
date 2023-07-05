'use client';
import React, { createContext, useContext, useState } from "react";
const StateContext = createContext();

import { SessionProvider } from 'next-auth/react';
const ContextProvider = ({ children, session }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [isClicked, setIsClicked] = useState(initialState);


  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  }
  const handleClickClose = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: false });
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
        setScreenSize
      }}
    >
      <SessionProvider session={session} >
        {children}
      </SessionProvider>
    </StateContext.Provider>

  )
}

export default ContextProvider