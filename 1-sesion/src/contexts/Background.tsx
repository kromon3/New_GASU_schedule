import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Создаем тип для контекста - ДОБАВЛЯЕМ ВСЕ ПОЛЯ
interface ThemeContextType {
  theme: string;
  themeType: boolean;
  setTheme: Dispatch<SetStateAction<string>>;
  setThemeType: Dispatch<SetStateAction<boolean>>;
  changeTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  themeType: false,
  setTheme: () => {},
  setThemeType: () => {},
  changeTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('dark');
  const [themeType, setThemeType] = useState(false);

  const changeTheme = () => {
    setThemeType((prev) => !prev);
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themeType,
        setThemeType,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
