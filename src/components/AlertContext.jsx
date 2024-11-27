import React, { createContext, useState, useContext } from 'react';

// יצירת Context לשיתוף המיקום
const AlertContext = createContext();

export const useAlertContext = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alertPosition, setAlertPosition] = useState(null); // מיקום ההתראה

  const updateAlertPosition = (position) => {
    setAlertPosition(position);
  };

  return (
    <AlertContext.Provider value={{ alertPosition, updateAlertPosition }}>
      {children}
    </AlertContext.Provider>
  );
};