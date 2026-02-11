// Schedule.js
import Header from "../../components/Header/header.tsx";
import '../../style/schedule.css'
import { useContext, useRef, useEffect, useState } from "react";
import { ItemPortal } from '../../contexts/GrupName.tsx';
import {ThemeContext} from "../../contexts/Background.tsx";
// Функция для определения типа недели
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

function Schedule() {
    const { grupName } = useContext(ItemPortal);
    const [currentWeekType, setCurrentWeekType] = useState('Четная');
    const sliderRef = useRef(null);
    const [scheduleData, setScheduleData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/lessons')
            .then(res => res.json())
            .then(data => setScheduleData(data));
    }, []);
    useEffect(() => {
        const weekType = getCurrentWeekType();
        setCurrentWeekType(weekType);

        setTimeout(() => {
            if (sliderRef.current) {
                const slideIndex = weekType === 'Четная' ? 0 : 1;
                const slideWidth = sliderRef.current.children[0]?.offsetWidth || 0;
                sliderRef.current.scrollTo({
                    left: slideWidth * slideIndex,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }, []);
    const { themeType } = useContext(ThemeContext);
    const filteredSchedule = scheduleData.filter(lesson => lesson.group === grupName);
    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    const handleScroll = (slideIndex) => {
        if (!sliderRef.current) return;
        const slideWidth = sliderRef.current.children[0]?.offsetWidth || 0;
        sliderRef.current.scrollTo({
            left: slideWidth * slideIndex,
            behavior: 'smooth'
        });
    };
    const dontInvertStyle = {
        filter: themeType ? 'invert(1)' : 'invert(0)',
    };

    if (grupName === ' не выбрана') {
        return (
            <>
                <div className="schedule-background"
                     style={{
                         filter: themeType ? 'invert(1)' : 'invert(0)',
                         transition: 'filter 0.5s ease-in-out'
                     }}
                >
                    <div style={dontInvertStyle}><Header /></div>
                <div className="schedule-page">
                    <h2 style={{color:'white' }}>Выберите группу</h2>
                </div>
                    </div>
                </>
        )
    }
    if (filteredSchedule.length === 0) {
        return (
            <div>
                <div style={dontInvertStyle}><Header /></div>
                <div className="schedule-page">
                    <h2>Предметы группы отсутствуют</h2>
                </div>
            </div>
        )
    }
    return (<>

            <div className="schedule-background"
                 style={{
                     filter: themeType ? 'invert(1)' : 'invert(0)',
                     transition: 'filter 0.5s ease-in-out'
                 }}
            >
                <div style={dontInvertStyle}><Header /></div>

                <div style={{ position: 'relative', minHeight: '100vh' }}>


            <div className="week-info" style={dontInvertStyle}>
                <div className="week-type-buttons">
                    <button
                        onClick={() => handleScroll(0)}
                        className={currentWeekType === 'Четная' ? 'week-type-button active' : 'week-type-button'}
                        style={{ marginRight: 5 }}
                    >
                        Четная неделя
                    </button>

                    <button
                        onClick={() => handleScroll(1)}
                        className={currentWeekType === 'Нечетная' ? 'week-type-button active' : 'week-type-button'}
                    >
                        Нечетная неделя
                    </button>
                </div>
            </div>

            <div className="slider-container">
                <div className="slider" ref={sliderRef}>
                    {/* Чётная неделя */}
                    <div className="slide">
                        {days.map(dayName => {
                            const lessonsForDay = filteredSchedule.filter(
                                lesson => lesson.time.weekday === dayName && lesson.weekType === 'Четная'
                            );

                            if (lessonsForDay.length === 0) return null;

                            return (
                                <div key={dayName} className="day-section">
                                    <h2
                                        style={{
                                            color: 'white',
                                            marginRight: "12px",
                                            padding: '8px 16px',
                                            borderRadius: '5px',
                                            display: 'inline-block',
                                            fontSize: '1.5rem',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {dayName}
                                    </h2>
                                    {lessonsForDay.map(lesson => (
                                        <div key={lesson.id} className="lesson-box schedule">
                    <span className="time" style={{ marginRight: "12px" }}>
                      {lesson.time.start} – {lesson.time.end}
                    </span>
                                            <h3 className="subject" style={{ marginRight: "12px" }}>{lesson.subject}</h3>
                                            <span className="type" style={{ marginRight: "12px" }}>{lesson.type}</span>
                                            <span className="teacher" style={{ marginRight: "12px" }}>{lesson.teacher}</span>
                                            <span className="time" style={{ marginLeft: "12px" }}>{lesson.auditorium}</span>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>

                    {/* Нечётная неделя */}
                    <div className="slide">
                        {days.map(dayName => {
                            const lessonsForDay = filteredSchedule.filter(
                                lesson => lesson.time.weekday === dayName && lesson.weekType === 'НеЧетная'
                            );

                            if (lessonsForDay.length === 0) return null;

                            return (
                                <div key={dayName} className="day-section">
                                    <h2
                                        style={{
                                            color: 'white',
                                            marginRight: "12px",
                                            padding: '8px 16px',
                                            borderRadius: '5px',
                                            display: 'inline-block',
                                            fontSize: '1.5rem',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {dayName}
                                    </h2>
                                    {lessonsForDay.map(lesson => (
                                        <div key={lesson.id} className="lesson-box schedule">
                    <span className="time" style={{ marginRight: "12px" }}>
                      {lesson.time.start} – {lesson.time.end}
                    </span>
                                            <h3 className="subject" style={{ marginRight: "12px" }}>{lesson.subject}</h3>
                                            <span className="type" style={{ marginRight: "12px" }}>{lesson.type}</span>
                                            <span className="teacher" style={{ marginRight: "12px" }}>{lesson.teacher}</span>
                                            <span className="time" style={{ marginLeft: "12px" }}>{lesson.auditorium}</span>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>

    );
}

export default Schedule;