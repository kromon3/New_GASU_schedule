import React from "react";

interface ConfigLessonProps {
    lessonData: {
        group_name: string;
        weektype: string;
        weekday: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

function ConfigLesson({ lessonData, handleChange }: ConfigLessonProps) {
    return (
        <div style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', marginBottom: '20px' }}>
            <h3 style={{ color: 'white', marginBottom: '15px' }}> Настройки нового урока:</h3>

            <div>
                <h4 style={{ color: 'white' }}>Группа</h4>
                <input
                    className="search-input"
                    name="group_name"
                    value={lessonData.group_name}
                    onChange={handleChange}
                    placeholder="Введите группу"
                />
            </div>

            <div>
                <h4 style={{ color: 'white' }}>Тип недели</h4>
                <select
                    name="weektype"
                    className="search-input"
                    value={lessonData.weektype}
                    onChange={handleChange}
                >
                    <option value="Четная">Четная</option>
                    <option value="Нечетная">Нечетная</option>
                    <option value="Обе">Обе</option>
                </select>
            </div>

            <div>
                <h4 style={{ color: 'white' }}>День недели</h4>
                <select
                    name="weekday"
                    className="search-input"
                    value={lessonData.weekday}
                    onChange={handleChange}
                >
                    <option value="Понедельник">Понедельник</option>
                    <option value="Вторник">Вторник</option>
                    <option value="Среда">Среда</option>
                    <option value="Четверг">Четверг</option>
                    <option value="Пятница">Пятница</option>
                    <option value="Суббота">Суббота</option>
                </select>
            </div>
        </div>
    );
}

export default ConfigLesson;