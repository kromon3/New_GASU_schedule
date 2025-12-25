// Schedule.js
import Header from "../Header/header.tsx";
import './schedule.css'
import { scheduleData } from '../db/db.ts'
import { useContext } from "react";
import { GrupNameContext } from '../contexts/GrupNameContext.tsx';

function Schedule() {

    const { grupName } = useContext(GrupNameContext);
    const filteredSchedule = scheduleData.filter(lesson => lesson.group === grupName);
    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    if (filteredSchedule.length === 0) {
        return(<div>
                <Header />
                <div className="schedule-page">
                    <h2>Предметы группы Группа не выбрана</h2>
                </div>
            </div>

        )
    }
    return (
        <>
            <Header />
            <div className="schedule-page">
            <div className="all-lessons">
            {days.map(dayName => {
                const lessonsForDay = filteredSchedule.filter(
                    lesson => lesson.time.weekday === dayName
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
        </>

    );
}

export default Schedule;