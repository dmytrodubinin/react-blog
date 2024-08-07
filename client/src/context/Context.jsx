import { createContext, useEffect, useReducer, useState } from 'react';
import Reducer from './Reducer';

const themes = {
  light: 'winter',
  dark: 'dim',
};

const getInitialTheme = () => {
  const userPrefersTheme = window.matchMedia('(prefers-color-scheme:dark)')
    .matches
    ? themes.dark
    : themes.light;
  const storedTheme = localStorage.getItem('theme');

  return storedTheme || userPrefersTheme;
};

const INITIAL_STATE = {
  theme: getInitialTheme(),
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  const [theme, setTheme] = useState(getInitialTheme());

  const handleTheme = () => {
    const { light, dark } = themes;
    const newTheme = theme === light ? dark : light;
    setTheme(newTheme);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Context.Provider
      value={{
        theme,
        handleTheme,
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
