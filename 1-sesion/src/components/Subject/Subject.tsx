import Header from "../Header/header.tsx";
import {useContext, useEffect, useState, useRef} from "react";
import '../../style/schedule.css'
import {ItemPortal} from "../../contexts/GrupName.tsx";
import {ThemeContext} from "../../contexts/Background.tsx";

function Subject() {
    const [selected, setSelected] = useState<string | null>(null);
    const { grupName } = useContext(ItemPortal);
    const [scheduleData, setScheduleData] = useState([]);
    const focusRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:8000/lessons')
            .then(res => res.json())
            .then(data => setScheduleData(data));
    }, []);

    const { themeType } = useContext(ThemeContext);
    const dontInvertStyle = {
        filter: themeType ? 'invert(1)' : 'invert(0)',
    };

    const uniqueLessons = Array.from(new Set(scheduleData));
    const filteredSchedule = uniqueLessons.filter(lesson => lesson.group === grupName);
    const selectedLesson = filteredSchedule.find((el) => el.subject === selected);

    // Фокус на сайдбаре при выборе предмета
    useEffect(() => {
        if (selected && focusRef.current) {
            focusRef.current.focus();
            // Прокрутка к элементу (опционально)
            focusRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }, [selected]);


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
                    <h2 style={{color:'white'}}>Предметы группы {grupName}</h2>
                    <div className="subject-layout">
                        <div className="subjects-list">
                            {filteredSchedule.map(lesson => (
                                <div
                                    key={lesson.id}
                                    className={`lesson-box ${selected === lesson.subject ? 'selected' : ''}`}
                                    onClick={() => setSelected(lesson.subject)}
                                    style={{ marginBottom: "12px", marginTop: "12px" }}
                                    role="button" // Для доступности
                                    tabIndex={0} // Делаем элемент фокусируемым
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setSelected(lesson.subject);
                                        }
                                    }}
                                >
                                    <div className="lesson-main">
                                        <h3 className="subject">{lesson.subject}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div
                            ref={focusRef}
                            tabIndex={-1}

                        >
                            {selectedLesson && (
                                <div className={selected ? "info-sidebar" : "info-sidebar.false"} style={{ color:'white'}}>
                                    <img src="/avatar.png" alt="harry potter" style={{ width: '50px' }} />
                                    <h3 style={{ marginLeft: "12px" ,color:'white'}}>{selectedLesson.subject}</h3>
                                    <h3 style={{ marginLeft: "12px" ,color:'white' }}> Преподаватель: {selectedLesson.teacher}</h3>
                                    <h3 style={{ marginLeft: "12px" ,color:'white' }}> Тип: {selectedLesson.type}</h3>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Subject;