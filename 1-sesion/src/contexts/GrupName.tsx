import { createContext, useState, ReactNode } from 'react';
export const ItemPortal = createContext({
    grupName: '',
});

function GrupName({ children }: { children: ReactNode }) {
    const [grupName, setGrupName] = useState(' не выбрана');

    return (
        <ItemPortal.Provider value={{ grupName, setGrupName }}>
            {children}
        </ItemPortal.Provider>
    );
}

export default GrupName;