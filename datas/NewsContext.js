import React, { createContext, useState } from 'react';

export const NewsContext = createContext();

/**
 * NewsProvider component for the NewsNest app.
 *
 * This component is a context provider for news data within the app. It uses React's Context API to
 * manage and distribute news-related data across the application. The provider fetches news articles
 * from a news API based on the specified category and updates its state with the fetched data.
 *
 * The state and the fetchNews function are exposed to the consumer components via the NewsContext.
 *
 * @component
 * @param {ReactNode} children - The child components that will have access to the context.
 * 
 * @returns {React.Component} The NewsProvider component wrapping its children within the NewsContext.Provider.
 */
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
