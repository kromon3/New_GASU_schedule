// src/contexts/GrupName.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import { useCookies } from 'react-cookie';

type ItemPortalContextType = {
    grupName: string;
    setGrupName: (name: string) => void;
};

export const ItemPortal = createContext<ItemPortalContextType>({
    grupName: 'Группа не выбрана',
    setGrupName: () => {},
});
function GrupName({ children }: { children: ReactNode }) {
    const [grupName, _setGrupName] = useState<string>('Группа не выбрана');
    const [cookies, setCookie, removeCookie] = useCookies(['grupName']);
    useEffect(() => {
        const savedGroup = cookies.grupName;
        if (typeof savedGroup === 'string' && savedGroup !== 'Группа не выбрана') {
            _setGrupName(savedGroup);
        }
    }, []);

    const setGrupName = (name: string) => {
        _setGrupName(name);
        if (name === 'Группа не выбрана') {
            removeCookie('grupName', { path: '/' });
        } else {
            setCookie('grupName', name, { path: '/', maxAge: 30 * 24 * 60 * 60 }); // на 30 дней
        }
    };

    return (
        <ItemPortal.Provider value={{ grupName, setGrupName }}>
            {children}
        </ItemPortal.Provider>
    );
}

export default GrupName;