import type {Lesson} from "../../type/lesson.ts";
import React from "react";


interface PropsLesson {
    test:Lesson
    handleChage: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

function LessonCard({
                test,handleChage
                }: PropsLesson) {
    return (
        <>
            <div key={test.id} className="lesson-box schedule">
                <span className="time" style={{ marginRight: '12px' }}>
                    <input
                        name="time_start"
                        type="time"
                        className="search-input"
                        value={test.time_start}
                        onChange={handleChage}
                        style={{ width: '150px', height: '45px' }}
                    />

                    <span style={{ margin: '10px' }}> – </span>

                    <input
                        name="time_end"
                        type="time"
                        className="search-input"
                        value={test.time_end}
                        onChange={handleChage}
                        style={{ width: '150px', height: '45px' }}
                    />
                </span>

                <h3 className="subject" style={{ marginRight: '12px' }}>
                    <input
                        name="subject"
                        className="search-input"
                        value={test.subject}
                        onChange={handleChage}
                        placeholder="Введите название предмета"
                    />
                </h3>

                <span className="type" style={{ marginRight: '12px' }}>
                    <select
                        name="type_name"
                        className="search-input"
                        value={test.type_name}
                        onChange={handleChage}
                    >
                        <option value="">Выберите тип</option>
                        <option value="Лекция">Лекция</option>
                        <option value="Практика">Практика</option>
                        <option value="Лабораторная">Лабораторная</option>
                    </select>
                </span>

                <span className="teacher" style={{ marginRight: '12px' }}>
                    <input
                        name="teacher"
                        className="search-input"
                        value={test.teacher}
                        onChange={handleChage}
                        placeholder="Введите преподавателя"
                    />
                </span>

                <span className="auditorium" style={{ marginLeft: '12px' }}>
                    <input
                        name="auditorium"
                        className="search-input"
                        value={test.auditorium}
                        onChange={handleChage}
                        placeholder="Введите аудиторию"
                    />
                </span>
            </div>
        </>
    )
}

export default LessonCard;