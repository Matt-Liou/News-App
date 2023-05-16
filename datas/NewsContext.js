import React, { createContext, useState } from 'react';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [newsData, setNewsData] = useState([]);

  const API_KEY = 'f4d9c81e82e74b42b3bde15062d289f2';

  const fetchNews = async (category) => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
      );
      const responseJson = await response.json();
      setNewsData(responseJson.articles);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NewsContext.Provider value={{ newsData, fetchNews }}>
      {children}
    </NewsContext.Provider>
  );
};
