import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'swapi-theme';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);

  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export const useDarkMode = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const rootElement = document.documentElement;
    rootElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme: Theme) =>
      currentTheme === 'dark' ? 'light' : 'dark',
    );
  }, []);

  return {
    theme,
    isDarkMode: theme === 'dark',
    toggleTheme,
  };
};
