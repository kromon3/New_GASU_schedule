import { createContext, useState, ReactNode } from 'react';

// Добавляем setGrupName в начальное значение контекста
export const ItemPortal = createContext({
  grupName: ' не выбрана',
  setGrupName: (value: string) => {}, // Добавляем заглушку для setGrupName
});

function GrupName({ children }: { children: ReactNode }) {
  const [grupName, setGrupName] = useState(' не выбрана');

  return <ItemPortal.Provider value={{ grupName, setGrupName }}>{children}</ItemPortal.Provider>;
}

export default GrupName;
