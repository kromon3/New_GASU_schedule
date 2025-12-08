import Header from "../Header/header.tsx";
import { scheduleData } from '../db/db.ts'
import { GrupNameContext } from '../contexts/GrupNameContext.tsx';
import {useContext} from "react";
import '../schedule/schedule.css'
function Subject() {
    const uniqueLessons = Array.from(new Set(scheduleData));
    const { grupName } = useContext(GrupNameContext);
    const filteredSchedule = uniqueLessons.filter(lesson => lesson.group === grupName);
    return (
        <>
            <div>
                <Header />
                <div className="schedule-page">

                <h2>Предметы группы {grupName}</h2>

                {filteredSchedule.map(lesson => {
                    return (
                        <div key={lesson.id} className="lesson-box">
                            <div className="lesson-main">
                                <h3 className="subject">{lesson.subject}</h3>
                                </div>
                        </div>
                    )
                })}
                </div>
            </div>
        </>)
}

export default Subject;