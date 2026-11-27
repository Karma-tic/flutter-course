import React, { createContext, useContext, useEffect } from 'react';

// Karmatix sites use one dark theme (matches karmatix.in and learn.karmatix.in).
type Theme = 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  const noop = () => {};
  return <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: noop, setTheme: noop }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
