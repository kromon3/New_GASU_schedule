// Schedule.js
import Header from "../Header/header.tsx";
import './schedule.css'
import { scheduleData } from '../db/db.ts'
import { useContext } from "react";
import { GrupNameContext } from '../contexts/GrupNameContext.tsx';

function Schedule() {

    const { grupName } = useContext(GrupNameContext);

    // Теперь grupName - это строка
    const filteredSchedule = scheduleData.filter(lesson => lesson.group === grupName);

    return (
        <>
            <Header />
            <div className="schedule-page">
                <h1 className="page-title">Полное расписание для группы: {grupName}</h1>
                <div className="all-lessons">
                    {filteredSchedule.map(lesson => (
                        <div key={lesson.id} className="lesson-box">
                            <div className="lesson-header">
                                <span className="weekday">{lesson.time.weekday}</span>
                                <span className="time">{lesson.time.start} - {lesson.time.end}</span>
                            </div>
                            <div className="lesson-main">
                                <h3 className="subject">{lesson.subject}</h3>
                                <div className="details">
                                    <span className="type">{lesson.type}</span>
                                    <span className="teacher">{lesson.teacher}</span>
                                    <span className="group">{lesson.group}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Schedule;