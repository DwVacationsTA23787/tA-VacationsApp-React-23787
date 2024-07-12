import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();
const URL = "https://dw2378720240712201935.azurewebsites.net/api/v1";

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default language is English
  const [ImageDir, setImageDir] = useState('');

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await fetch(`${URL}/list`);
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await res.text();
            setImageDir(data);
  
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    fetchData();
}, []);

  return (
    <AppContext.Provider value={{ language, changeLanguage, ImageDir }}>
      {children}
    </AppContext.Provider>
  );
};
