import Header from "../Header/header.tsx";
import '../../style/schedule.css';
import  { useContext, useState,useEffect,useMemo } from "react";
import {ItemPortal} from "../../contexts/GrupName.tsx";
import type {TodoItem} from '../../service/TodoItem.ts'
import {useLocalStorage} from "../../hooks/useLocalStorage.ts";
import {useTodo} from "../../hooks/useTodo.ts";
import {ThemeContext} from "../../contexts/Background.tsx";
function getCurrentWeekType() {
    const referenceDate = new Date(2025, 0, 27);

    const now = new Date();

    const refStart = new Date(referenceDate);
    refStart.setHours(0, 0, 0, 0);

    const nowStart = new Date(now);
    nowStart.setHours(0, 0, 0, 0);

    const diffMs = nowStart - refStart;

    const msInWeek = 1000 * 60 * 60 * 24 * 7;

    const weeksPassed = Math.floor(diffMs / msInWeek);

    return weeksPassed % 2 === 0 ? 'Четная' : 'НеЧетная';
}
function ScheduleToDay() {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const today = new Date();
    const dayName = days[today.getDay()];


    const { grupName } = useContext(ItemPortal);

    const [value, setValue] = useLocalStorage('base');
    const {inpValue, setInpValue,handleAdd, handleRemove} = useTodo(value, setValue);
    const [startHome, setStartHome] = useState<boolean>(false);
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [currentWeekType, setCurrentWeekType] = useState('Четная');
    const [scheduleData, setScheduleData] = useState([]);
    const { themeType } = useContext(ThemeContext);
    useEffect(() => {
        fetch('http://localhost:8000/lessons')
            .then(res => res.json())
            .then(data => setScheduleData(data));
    }, []);
    useEffect(() => {
        const weekType = getCurrentWeekType();
        setCurrentWeekType(weekType);},[])
    const filteredSchedule = scheduleData.filter(lesson => lesson.time.weekday === dayName);
    const filteredSchedule_day = filteredSchedule.filter(lesson => lesson.group === grupName);
    const filteredSchedule_day_type = useMemo(() =>
            filteredSchedule_day.filter(lesson => lesson.weekType === currentWeekType),
        [filteredSchedule_day, currentWeekType]
    );

    const dontInvertStyle = {
        filter: themeType ? 'invert(1)' : 'invert(0)',
    };
    if (filteredSchedule_day_type.length === 0) {
        return (
            <>
                <div className="schedule-background"
                     style={{
                         filter: themeType ? 'invert(1)' : 'invert(0)',
                         transition: 'filter 0.5s ease-in-out'
                     }}
                >
                    <div style={dontInvertStyle}>
                        <Header />
                    </div>

                <div className="schedule-page">
                    <div style={{color:'white',fontSize:40}}><strong>Расписание на {dayName}</strong></div>
                    <p></p>
                    <div style={{color:'white',fontSize:30}}><strong>Сегодня нет занятий</strong></div>
                </div>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="schedule-background"
                 style={{
                     filter: themeType ? 'invert(1)' : 'invert(0)',
                     transition: 'filter 0.5s ease-in-out'
                 }}
            >
                <div style={dontInvertStyle}><Header /></div>

            <div className="page-layout">
                <div className="main-content">
                    <div className="schedule-page">
                        <h1 style={{color:'white'}}>Расписание на {dayName} ({currentWeekType} Неделя)</h1>

                        {filteredSchedule_day_type.map(lesson => (
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
                                <span className="time">{lesson.auditorium}</span>
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
                                value={inpValue}
                                onChange={(e) => setInpValue(e.target.value)}
                                placeholder="Введите задачу"
                            />
                            <button onClick={() => handleAdd(inpValue, selectedSubject) }className={'btn'}>
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
                </div>
        </>
    );
}

export default ScheduleToDay;