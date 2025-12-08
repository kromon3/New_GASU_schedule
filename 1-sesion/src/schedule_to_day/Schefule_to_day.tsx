import Header from "../Header/header.tsx";
import { scheduleData } from '../db/db.ts'
import '../schedule/schedule.css'
import { GrupNameContext } from '../contexts/GrupNameContext.tsx';
import {useContext} from "react";
function Schefule_to_day() {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const today = new Date();
    const dayName = days[today.getDay()];
    const { grupName } = useContext(GrupNameContext);
    const filteredSchedule = scheduleData.filter(lesson => lesson.time.weekday === dayName);
    const filteredSchedule_day = filteredSchedule.filter(lesson => lesson.group === grupName);
    if (filteredSchedule_day.length === 0) {
        return(<div>
            <Header />
            <div className="schedule-page">
                <h1>Рассписание на {dayName}</h1>
                <h2>Сегодня нет занятий</h2>
            </div>
        </div>

        )
    }
    return (
        <>
            <div>
                <Header />
                <div className="schedule-page">
                <h1>Рассписание на {dayName}</h1>
                {filteredSchedule_day.map(lesson => (
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
    )
}
export default Schefule_to_day;