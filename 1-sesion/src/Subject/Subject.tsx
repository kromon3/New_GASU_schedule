import Header from "../Header/header.tsx";
import { scheduleData } from '../db/db.ts'
import { GrupNameContext } from '../contexts/GrupNameContext.tsx';
import {useContext,useState} from "react";
import '../schedule/schedule.css'
function Subject() {
    const [selected, setSelected] = useState<string | null>(null);
    const uniqueLessons = Array.from(new Set(scheduleData));
    const { grupName } = useContext(GrupNameContext);
    const filteredSchedule = uniqueLessons.filter(lesson => lesson.group === grupName);
    const selectedLesson = filteredSchedule.find((el) => el.subject === selected)
    return (
        <>
            <Header />
            <div className="schedule-page">
                <h2>Предметы группы {grupName}</h2>
                <div className="subject-layout">
                    <div className="subjects-list">
                        {filteredSchedule.map(lesson => (
                            <div
                                key={lesson.id}
                                className={`lesson-box ${selected === lesson.subject ? 'selected' : ''}`}
                                onClick={() => setSelected(lesson.subject)}
                                style={{ marginBottom: "12px", marginTop: "12px" }}
                            >
                                <div className="lesson-main">
                                    <h3 className="subject">{lesson.subject}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                        {selectedLesson && (
                                <div className={selected ? "info-sidebar" : "info-sidebar.false"}>
                                    <img src="/avatar.png" alt="harry potter" style={{ width: '50px' }} />
                                    <h3 style={{ marginLeft: "12px" }}>{selectedLesson.subject}</h3>
                                    <h3 style={{ marginLeft: "12px" }}> Преподаватель: {selectedLesson.teacher}</h3>
                                    <h3 style={{ marginLeft: "12px" }}> Тип: {selectedLesson.type}</h3>
                                </div>
                        )}
                </div>
            </div>
        </>
    );
}

export default Subject;