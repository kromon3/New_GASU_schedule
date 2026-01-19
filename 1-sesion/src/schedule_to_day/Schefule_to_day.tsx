import Header from "../Header/header.tsx";
import { scheduleData } from '../db/db.ts';
import '../schedule/schedule.css';
import { GrupNameContext } from '../contexts/GrupNameContext.tsx';
import React, { useContext, useEffect, useState } from "react";

interface TodoItem {
    id: number;
    text: string;
    isDone: boolean;
    lesson?: string;
}

function Schefule_to_day() {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const today = new Date();
    const dayName = days[today.getDay()];
    const { grupName } = useContext(GrupNameContext);
    const filteredSchedule = scheduleData.filter(lesson => lesson.time.weekday === dayName);
    const filteredSchedule_day = filteredSchedule.filter(lesson => lesson.group === grupName);

    const [value, setValue] = useState<TodoItem[]>(() => {
        const save = localStorage.getItem("base");
        if (!save) return [];
        try {
            return JSON.parse(save);
        } catch (e) {
            console.error("Failed to parse todos from localStorage", e);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("base", JSON.stringify(value));
    }, [value]);

    const [inputValue, setInputValue] = useState<string>('');
    const [startHome, setStartHome] = useState<boolean>(false);
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const handleRemove = (id: number) => {
        setValue(prev => prev.filter(item => item.id !== id));
    };
    const addHomeWork = () => {
        if (inputValue.trim() === '' || !selectedSubject) return;

        const newItem: TodoItem = {
            id: Date.now(),
            text: inputValue,
            isDone: false,
            lesson: selectedSubject,
        };

        setValue(prev => [...prev, newItem]);
        setInputValue('');
    };

    if (filteredSchedule_day.length === 0) {
        return (
            <>
                <Header />
                <div className="schedule-page">
                    <h1>Расписание на {dayName}</h1>
                    <h2>Сегодня нет занятий</h2>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="page-layout">
                <div className="main-content">
                    <div className="schedule-page">
                        <h1>Расписание на {dayName}</h1>
                        {filteredSchedule_day.map(lesson => (
                            <div key={lesson.id} className="lesson-box schedule_to_day">
                                <div style={{ flex: 1 }}>
                                    <div className="lesson-header">
                    <span className="time" style={{ marginRight: "12px" }}>
                      {lesson.time.start} - {lesson.time.end}
                    </span>
                                    </div>
                                    <div className="lesson-main">
                                        <h3 className="subject">{lesson.subject}</h3>
                                        <div className="details">
                                            <span className="type" style={{ marginRight: "12px" }}>{lesson.type}</span>
                                            <span className="teacher">{lesson.teacher}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', marginLeft: '16px'}}>
                                    <button onClick={() => {setSelectedSubject(lesson.subject);setStartHome(!startHome);}}>
                                        <img src="/free-icon-article-8173239.png" alt="" style={{ height: "40px" }} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {startHome && (
                    <div className="sidebar">
                        <h1>Домашняя работа</h1>
                        <div className="input-container">
                            <input
                                className="search-input"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Введите задачу"
                            />
                            <button
                                onClick={addHomeWork}
                                className={"btn"}
                            >
                                Добавить
                            </button>
                        </div>

                        <div style={{ marginTop: '16px' }}>
                            {startHome && (
                                <>
                                    {value
                                        .filter(item => item.lesson === selectedSubject)
                                        .map(day => (
                                            <div className="item" key={day.id}>
                                                <input
                                                    type="checkbox"
                                                    checked={day.isDone}
                                                    onChange={() => {
                                                        setValue(prev =>
                                                            prev.map(v =>
                                                                v.id === day.id ? { ...v, isDone: !v.isDone } : v
                                                            )
                                                        );
                                                    }}
                                                />
                                                <h1 className={day.isDone ? "text-content Done" : "text-content NoDone"} style={{ marginRight: 20 }}>
                                                    {day.text}
                                                </h1>
                                                <div className="button-group">
                                                    {day.isDone && (
                                                        <h1 style={{ marginLeft: 21.44 }}>Выполнено</h1>
                                                    )}
                                                    <button className="btn delete-btn">
                                                        <img src="/free-icon-close-151882.png" alt="Удаление" style={{ width: 25 }} onClick={()=>handleRemove(day.id)} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Schefule_to_day;