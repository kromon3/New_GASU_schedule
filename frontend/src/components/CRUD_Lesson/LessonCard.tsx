import React from "react";

interface Lesson {
    id: string;
    subject: string;
    time_start: string;
    time_end: string;
    teacher: string;
    type_name: string;
    auditorium: string;
    weekday: string;
    group_name: string;
    weektype: string;
}

interface PropsLesson {
    lesson: Lesson;
    onChange: (id: string, field: string, value: string) => void;
    onDelete: (id: string) => void;
}

function LessonCard({ lesson, onChange, onDelete }: PropsLesson) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onChange(lesson.id, name, value);
    };

    return (
        <div className="lesson-box schedule" style={{ marginBottom: '15px', position: 'relative' }}>
            <button
                onClick={() => onDelete(lesson.id)}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    fontSize: '18px'
                }}
            >
                ✕
            </button>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', paddingRight: '40px' }}>
                <span className="time">
                    <input
                        name="time_start"
                        type="time"
                        className="search-input"
                        value={lesson.time_start}
                        onChange={handleInputChange}
                        style={{ width: '140px', height: '40px' }}
                    />
                    <span style={{ margin: '0 8px' }}>–</span>
                    <input
                        name="time_end"
                        type="time"
                        className="search-input"
                        value={lesson.time_end}
                        onChange={handleInputChange}
                        style={{ width: '140px', height: '40px' }}
                    />
                </span>

                <input
                    name="subject"
                    className="search-input"
                    value={lesson.subject}
                    onChange={handleInputChange}
                    placeholder="Предмет"
                    style={{ width: '200px', height: '50px' }}
                />

                <select
                    name="type_name"
                    className="search-input"
                    value={lesson.type_name}
                    onChange={handleInputChange}
                    style={{ width: '150px', height: '50px' }}
                >
                    <option value="Лекция">Лекция</option>
                    <option value="Практика">Практика</option>
                    <option value="Лабораторная">Лабораторная</option>
                </select>

                <input
                    name="teacher"
                    className="search-input"
                    value={lesson.teacher}
                    onChange={handleInputChange}
                    placeholder="Преподаватель"
                    style={{ width: '180px', height: '50px' }}
                />

                <input
                    name="auditorium"
                    className="search-input"
                    value={lesson.auditorium}
                    onChange={handleInputChange}
                    placeholder="Аудитория"
                    style={{ width: '180px', height: '50px' }}
                />
            </div>
        </div>
    );
}

export default LessonCard;