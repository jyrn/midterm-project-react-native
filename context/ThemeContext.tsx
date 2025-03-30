import React, { createContext, useContext, useState } from 'react';

type ThemeContextType = {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    colors: {
      background: string;
      text: string;
      icon: string;
      placeholder: string;
      searchBarBackground: string;
      primary: string;
      error: string;
      cardBackground: string;
      saveButton: string;
      savedButton: string;
      applyButton: string;

      navBackground: string;
      navActiveTint: string;
      navInactiveTint: string;
      navBorder: string;
      navBadgeBackground: string;
      navBadgeText: string;
    };
  };

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
  
    const toggleDarkMode = () => {
      setIsDarkMode((prev) => !prev);
    };
  
  
    const colors = {
      background: isDarkMode ? '#121212' : '#fff',
      text: isDarkMode ? '#fff' : '#000',
      icon: isDarkMode ? '#48cae4' : '#48cae4',
      placeholder: isDarkMode ? '#888' : '#888',
      searchBarBackground: isDarkMode ? '#333' : '#f0f0f0',
      primary: isDarkMode ? '#BB86FC' : '#6200ee',
      error: isDarkMode ? '#CF6679' : '#B00020',
      cardBackground: isDarkMode ? '#1E1E1E' : '#fff',
      saveButton: isDarkMode ? '#48cae4' : '#48cae4',
      savedButton: isDarkMode ? '#ffbc42' : '#ffbc42',
      applyButton: isDarkMode ? '#FFC107' : '#48cae4',

      navBackground: isDarkMode ? '#1E1E1E' : '#48cae4',
      navActiveTint: isDarkMode ? '#48cae4' : '#48cae4',
      navInactiveTint: isDarkMode ? '#888' : '#666',
      navBorder: isDarkMode ? '#333' : '#e0e0e0',
      navBadgeBackground: isDarkMode ? '#90e0ef' : '#023e8a',
      navBadgeText: isDarkMode ? '#121212' : '#fff',
    };
  
    return (
      <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
        {children}
      </ThemeContext.Provider>
    );
  };

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};