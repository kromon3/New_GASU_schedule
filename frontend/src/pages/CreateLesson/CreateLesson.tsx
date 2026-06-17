import Header from '../../components/Header/Header';
import { useState } from 'react';
import '../../style/header.css';
import type { Lesson } from '../../../../types/lesson.types.ts';
import { useTheme } from "../../../store/useTheme.ts";
import LessonCard from "../../components/CRUD_Lesson/LessonCard.tsx";
import ConfigLesson from "../../components/CRUD_Lesson/ConfigLesson.tsx";
import {API_CONFIG} from "../../../config/api.config.ts";

const defaultLesson = {
    subject: '',
    time_start: '12:23',
    time_end: '14:24',
    weekday: 'Понедельник',
    teacher: '',
    type_name: 'Лекция',
    group_name: '',
    weektype: 'Обе',
    auditorium: ''
}

function CreateLesson() {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [status, setStatus] = useState<string>('');
    const [newLessonData, setNewLessonData] = useState(defaultLesson); // Для формы создания
    const themeType = useTheme((s) => s.theme);

    // Обработчик для формы создания нового урока
    const handleNewLessonChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewLessonData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Обработчик для изменения существующего урока
    const handleLessonChange = (id: string, field: string, value: string) => {
        setLessons(prev => prev.map(lesson =>
            lesson.id === id ? { ...lesson, [field]: value } : lesson
        ));
    };

    const addLesson = () => {
        const newLesson: Lesson = {
            id: Math.floor(Date.now() / 1000).toString(),
            subject: newLessonData.subject,
            time_start: newLessonData.time_start,
            time_end: newLessonData.time_end,
            weekday: newLessonData.weekday,
            teacher: newLessonData.teacher,
            type_name: newLessonData.type_name || 'Лекция',
            group_name: newLessonData.group_name,
            weektype: newLessonData.weektype || 'Обе',
            auditorium: newLessonData.auditorium ,
        };
        setLessons([...lessons, newLesson]);
        setNewLessonData(defaultLesson); // Очищаем форму
        setStatus('✅ Урок создан, можно отправлять');
        setTimeout(() => setStatus(''), 3000);
    };

    const deleteLesson = (id: string) => {
        setLessons(lessons.filter(lesson => lesson.id !== id));
        setStatus(' Урок удален');
        setTimeout(() => setStatus(''), 3000);
    };

    const sendPostRequest = async () => {
        console.log('Отправка уроков:', lessons);
        try {
            const res = await fetch(`${API_CONFIG.baseUrl}/lessons/many`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(lessons)
            })
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            console.log(data);
        }
        catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const dontInvertStyle = {
        filter: themeType === 'dark' ? 'invert(1)' : 'invert(0)',
    };

    return (
        <>
            <div
                className="schedule-background"
                style={{
                    filter: themeType === 'dark' ? 'invert(1)' : 'invert(0)',
                    transition: 'filter 0.5s ease-in-out',
                }}
            >
                <div style={dontInvertStyle}>
                    <Header />
                </div>

                {status && (
                    <div style={{
                        padding: '10px',
                        margin: '10px',
                        backgroundColor: status.includes('✅') ? '#d4edda' : '#f8d7da',
                        color: status.includes('✅') ? '#155724' : '#721c24',
                        borderRadius: '5px',
                        textAlign: 'center'
                    }}>
                        {status}
                    </div>
                )}

                {/* Форма для создания нового урока */}
                <ConfigLesson
                    lessonData={newLessonData}
                    handleChange={handleNewLessonChange}
                />

                <br />
                <button onClick={addLesson} className="Header-button">
                    ➕ Создать урок
                </button>

                <hr style={{ margin: '20px 0', borderColor: '#ccc' }} />

                {/* Список созданных уроков */}
                <h3 style={{ color: 'white' }}>Созданные уроки ({lessons.length}):</h3>
                {lessons.map((lesson) => (
                    <LessonCard
                        key={lesson.id}
                        lesson={lesson}
                        onChange={handleLessonChange}
                        onDelete={deleteLesson}
                    />
                    ))}

                {lessons.length > 0 && (
                    <>
                        <br />
                        <button onClick={sendPostRequest} className="Header-button" disabled={lessons.length === 0}>
                            Сохранить
                        </button>
                    </>
                )}
            </div>
        </>
    );
}

export default CreateLesson;