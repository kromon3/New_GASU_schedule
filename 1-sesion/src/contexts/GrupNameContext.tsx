// contexts/GrupNameContext.js
import { createContext, useState } from 'react';

export const GrupNameContext = createContext();

export const GrupNameProvider = ({ children }) => {
    const [grupName, setGrupName] = useState('Группа не выбрана');

    return (
        <GrupNameContext.Provider value={{ grupName, setGrupName }}>
    {children}
    </GrupNameContext.Provider>
);
};