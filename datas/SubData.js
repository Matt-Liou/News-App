import React, { createContext, useState } from 'react';

/**
 * Context for managing subscription email data in the application.
 *
 * `SubData` is a React context that provides and manages the state of the subscription emails.
 * It allows for adding and removing email addresses from the subscription list.
 *
 * @module
 * @returns {React.Context} The SubData context object.
 */
const SubData = createContext();
export default SubData;

/**
 * DataProvider component for the application.
 *
 * This component serves as a context provider for subscription email data. It uses React's Context API to
 * manage and distribute the subscription-related data across the application. The provider has functions to
 * add and remove emails from the subscription list and maintains this list in its state.
 *
 * The state and the functions (addEmail, removeEmail) are exposed to the consumer components via the SubData context.
 *
 * @component
 * @param {ReactNode} children - The child components that will have access to the context.
 * @example
 * return (
 *   <DataProvider>
 *     <App />
 *   </DataProvider>
 * )
 * 
 * @returns {React.Component} The DataProvider component wrapping its children within the SubData.Provider.
 */
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
