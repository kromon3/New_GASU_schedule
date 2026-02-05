import "../../../style/GroupSelection.css";
import {useEffect, useState} from "react";

function GroupSelection({ onSelectGroup }) {
    const [groups, setGroups] = useState([])
    useEffect(() => {
        fetch('http://localhost:8000/lessons')
            .then(res => res.json())
            .then(data => setGroups(data));
    }, []);
    const uniqueGroupNames = [...new Set(groups.map(item => item.group))];
    return (
        <div className="group-selection-container">
            <div className="group-selection-header">
                <h3>Выберите группу</h3>
                <button className="close-button" onClick={() => onSelectGroup('Группа не выбрана')}>×
                </button>
            </div>
            <div className="groups-list">
                {uniqueGroupNames.map((groupName) => (
                    <div className="group-item" onClick={() => onSelectGroup(groupName)}>
                        {groupName}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GroupSelection;