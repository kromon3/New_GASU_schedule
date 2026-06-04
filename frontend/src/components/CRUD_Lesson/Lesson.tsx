import React from "react";

interface PropsLesson {
    inpValueName: string;
    setInpValueName: (value: string) => void;
    inpValueGroup: string;
    setInpValueGroup: (value: string) => void;
    inpValueTeacher: string;
    setInpValueTeacher: (value: string) => void;
    inpValueType: string;
    setInpValueType: (value: string) => void;
    inpValueWeekType: string;
    setInpValueWeekType: (value: string) => void;
    inpValueAuditori: string;
    setInpValueAuditori: (value: string) => void;
    startTime: string;
    setStartTime: (value: string) => void;
    endTime: string;
    setEndTime: (value: string) => void;
    weekday: string;
    setWeekday: (value: string) => void;
    lesson_test: { id: string | number }; // Добавлено
}

function Lesson({
                    startTime,
                    setStartTime,
                    endTime,
                    setEndTime,
                    inpValueName,
                    setInpValueName,
                    inpValueType,
                    setInpValueType,
                    inpValueTeacher,
                    setInpValueTeacher,
                    inpValueAuditori,
                    setInpValueAuditori,
                    lesson_test
                }: PropsLesson) {
    return (
        <>
            <div key={lesson_test.id} className="lesson-box schedule">
                <span className="time" style={{ marginRight: '12px' }}>
                    <input
                        type="time"
                        className="search-input"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        style={{ width: '150px', height: '45px' }}
                    />

                    <span style={{ margin: '10px' }}> – </span>

                    <input
                        type="time"
                        className="search-input"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        style={{ width: '150px', height: '45px' }}
                    />
                </span>

                <h3 className="subject" style={{ marginRight: '12px' }}>
                    <input
                        className="search-input"
                        value={inpValueName}
                        onChange={(e) => setInpValueName(e.target.value)}
                        placeholder="Введите название предмета"
                    />
                </h3>

                <span className="type" style={{ marginRight: '12px' }}>
                    <select
                        className="search-input"
                        value={inpValueType}
                        onChange={(e) => setInpValueType(e.target.value)}
                    >
                        <option value="">Выберите тип</option>
                        <option value="Лекция">Лекция</option>
                        <option value="Практика">Практика</option>
                        <option value="Лабораторная">Лабораторная</option>
                    </select>
                </span>

                <span className="teacher" style={{ marginRight: '12px' }}>
                    <input
                        className="search-input"
                        value={inpValueTeacher}
                        onChange={(e) => setInpValueTeacher(e.target.value)}
                        placeholder="Введите преподавателя"
                    />
                </span>

                <span className="auditorium" style={{ marginLeft: '12px' }}>
                    <input
                        className="search-input"
                        value={inpValueAuditori}
                        onChange={(e) => setInpValueAuditori(e.target.value)}
                        placeholder="Введите аудиторию"
                    />
                </span>
            </div>
        </>
    )
}

export default Lesson;