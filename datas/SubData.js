import React, { createContext, useState } from 'react';

const SubData = createContext();
export default SubData;

export const DataProvider = ({ children }) => {
  const [subEmail, setSubEmails] = useState([
    "ydliou2003@gmail.com", 
    "utliou2005@gmail.com"
  ]);

  const addEmail = (item) => {
    setSubEmails([...subEmail, item]);
  };

  const removeEmail = (index) => {
    let subCopy = [...subEmail];
    subCopy.splice(index, 1);
    setSubEmails(subCopy);
  }

  return (
    <SubData.Provider value={{ subEmail, setSubEmails, addEmail, removeEmail }}>
      {children}
    </SubData.Provider>
  );
};
