import React from "react";
import type {Lesson} from "../../type/lesson.ts";

interface ConfigLessonProps {
    test:Lesson
    handleChage: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}
function ConfigLesson({test,handleChage}:ConfigLessonProps){
    return (
        <>
            <div>
                <h3 style={{color:'white'}}>Группа</h3>
                <input
                    className="search-input"
                    name="group_name"
                    value={test.group_name}
                    onChange={handleChage}
                    placeholder="Введите группу"
                />
            </div>

            <div>
                <h3 style={{color:'white'}}>Тип недели</h3>
                <select
                    name="weektype"
                    className="search-input"
                    value={test.weektype}
                    onChange={handleChage}
                >
                    <option value="">Выберите тип недели</option>
                    <option value="Четная">Четная</option>
                    <option value="НеЧетная">НеЧетная</option>
                    <option value="Обе">Обе</option>
                </select>
            </div>

            <div>
                <h3 style={{color:'white'}}>День недели</h3>
                <select
                    name="weekday"
                    className="search-input"
                    value={test.weekday}
                    onChange={handleChage}
                >
                    <option value="Понедельник">Понедельник</option>
                    <option value="Вторник">Вторник</option>
                    <option value="Среда">Среда</option>
                    <option value="Четверг">Четверг</option>
                    <option value="Пятница">Пятница</option>
                    <option value="Суббота">Суббота</option>
                </select>
            </div>

        </>
    )
}
export default ConfigLesson;
