import "./header.css"
import { useState } from 'react';
import GroupSelection from "./GroupSelection/GroupSelection.tsx";
import {Link} from "react-router-dom";

function Header() {
    const [grupName, setGrupName] = useState('ИТ-201');
    const [showGroupSelection, setShowGroupSelection] = useState(false);

    const handleClearGroup = () => {
        setGrupName('Группа не выбрана');
    }

    const handleSelectGroup = (selectedGroup) => {
        setGrupName(selectedGroup);
        setShowGroupSelection(false); // Скрываем после выбора
    }

    return (
        <>
            <div className={'main_Module'}>
                <div className={'Header-contener_button'}>
                    <span><button className={'Header-button'}><Link to="/schedule_to_day" className={'link_a'}>Расписание на сегодня</Link></button></span>
                    <span><button className={'Header-button'}><Link to="/schedule" className={'link_a'}>Расписание</Link></button></span>
                    <span><button className={'Header-button'}><Link to="/subject" className={'link_a'}>Предметы</Link></button></span>
                </div>

                <div className={'Header-contener_grop'}>
                    <span
                        className={'Header-contener_grop_Name'}
                        onClick={() => {
                            if(grupName === 'Группа не выбрана'){
                                setShowGroupSelection(true);
                            }
                        }}
                        style={{ cursor: grupName === 'Группа не выбрана' ? 'pointer' : 'default' }}
                    >
                        Группа: <strong>{grupName}</strong>
                    </span>
                    <span>
                        <button className={'Header-contener_grop_button'} onClick={handleClearGroup}>
                            <img src="/1483063.png" alt="Очистить группу" className={'Header-contener_grop_img'}/>
                        </button>
                    </span>
                </div>
            </div>
            {showGroupSelection && (
                <div className="group-selection-modal">
                    <GroupSelection onSelectGroup={handleSelectGroup} />
                </div>
            )}
        </>
    )
}

export default Header;