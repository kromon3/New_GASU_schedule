import "./GroupSelection.css";
import { useState } from 'react';

function GroupSelection({ onSelectGroup }) {
    const groups = ['2-ПМИ-2', "1-ПМИ-2", "ПИ-1"];

    return (
        <div className="group-selection-container">
            <div className="group-selection-header">
                <h3>Выберите группу</h3>
                <button className="close-button" onClick={() => onSelectGroup('Группа не выбрана')}>×
                </button>
            </div>
            <div className="groups-list">
                {groups.map((group, index) => (
                    <div key={index} className="group-item" onClick={() => onSelectGroup(group)}>
                        {group}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GroupSelection;