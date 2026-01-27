// Schedule.js
import Header from "../Header/header.tsx";
import '../../style/schedule.css'
import { scheduleData } from '../../service/db.ts'
import { useContext, useRef, useEffect, useState } from "react";
import { ItemPortal } from '../../contexts/GrupName.tsx';

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

    const filteredSchedule = scheduleData.filter(lesson => lesson.group === grupName);
    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

    if (filteredSchedule.length === 0) {
        return (
            <div>
                <Header />
                <div className="schedule-page">
                    <h2>Предметы группы Группа не выбрана</h2>
                </div>
            </div>
        )
    }

    const handleScroll = (slideIndex) => {
        if (!sliderRef.current) return;
        const slideWidth = sliderRef.current.children[0]?.offsetWidth || 0;
        sliderRef.current.scrollTo({
            left: slideWidth * slideIndex,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <Header />

            <div className="week-info">


                <div className="week-type-buttons">
                    <button
                        onClick={() => handleScroll(0)}
                        className={currentWeekType==='Четная' ?'week-type-button' :'week-type-button active' }
                        style={{marginRight:5}}
                    >
                        Четная неделя
                    </button>

                    <button
                        onClick={() => handleScroll(1)}
                        className={currentWeekType==='Нечетная' ?'week-type-button' :'week-type-button active'}
                    >
                        Нечетная неделя
                    </button>
                </div>
            </div>

            <div className="slider-container">
                <div className="slider" ref={sliderRef}>
                    <div className='slide'>
                        {days.map(dayName => {
                            const lessonsForDay = filteredSchedule.filter(
                                lesson => lesson.time.weekday === dayName && lesson.weekType === 'Четная'
                            );

                            if (lessonsForDay.length === 0) return null;

                            return (
                                <div key={dayName} className="day-section">
                                    <h2>{dayName}</h2>
                                    {lessonsForDay.map(lesson => (
                                        <div key={lesson.id} className="lesson-box schedule">
                                            <span className="time" style={{ marginRight: "12px" }}>
                                                {lesson.time.start} – {lesson.time.end}
                                            </span>
                                            <h3 className="subject">{lesson.subject}</h3>
                                            <span className="type" style={{ marginRight: "12px" }}>{lesson.type}</span>
                                            <span className="teacher">{lesson.teacher}</span>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>

                    {/* Слайд для нечетной недели */}
                    <div className='slide'>
                        {days.map(dayName => {
                            const lessonsForDay = filteredSchedule.filter(
                                lesson => lesson.time.weekday === dayName && lesson.weekType === 'НеЧетная'
                            );

                            if (lessonsForDay.length === 0) return null;

                            return (
                                <div key={dayName} className="day-section">
                                    <h2>{dayName}</h2>
                                    {lessonsForDay.map(lesson => (
                                        <div key={lesson.id} className="lesson-box schedule">
                                            <span className="time" style={{ marginRight: "12px" }}>
                                                {lesson.time.start} – {lesson.time.end}
                                            </span>
                                            <h3 className="subject">{lesson.subject}</h3>
                                            <span className="type" style={{ marginRight: "12px" }}>{lesson.type}</span>
                                            <span className="teacher">{lesson.teacher}</span>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Schedule;