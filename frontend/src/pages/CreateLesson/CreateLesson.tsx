import Header from '../../components/Header/Header';
import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../style/header.css';
import type {Lesson} from '../../../../types/lesson.types.ts'
import {useTheme} from "../../../store/useTheme.ts";
import CRUDlesson from "../../components/CRUD_Lesson/CRUDlesson.tsx";
import {API_CONFIG} from "../../../config/api.config.ts"

function CreateLesson() {
    const [inpValueGroup, setInpValueGroup] = React.useState('');
    const [inpValueName, setInpValueName] = React.useState('');
    const [inpValueTeacher, setInpValueTeacher] = React.useState('');
    const [inpValueType, setInpValueType] = React.useState('');
    const [inpValueWeekType, setInpValueWeekType] = React.useState('');
    const [inpValueAuditori, setInpValueAuditori] = React.useState('');
    const [startTime, setStartTime] = React.useState('09:00');
    const [endTime, setEndTime] = React.useState('10:30');
    const [weekday, setWeekday] = React.useState('Понедельник');
    const [lesson, setLesson] = React.useState<Lesson | null>(null);
    const [status, setStatus] = React.useState<string>(''); // Для отображения статуса
    const themeType = useTheme((s) => s.theme);
    const addLesson = () => {
        // Валидация обязательных полей
        if (!inpValueName || !inpValueTeacher || !inpValueGroup) {
            setStatus('❌ Заполните обязательные поля (предмет, преподаватель, группа)');
            return;
        }

        const newLesson: Lesson = {
            id: Date.now().toString(), // Исправлено: преобразуем в строку
            subject: inpValueName,
            time_start: startTime,
            time_end: endTime,
            weekday: weekday,
            teacher: inpValueTeacher,
            type_name: inpValueType || 'Лекция', // Значение по умолчанию
            group_name: inpValueGroup,
            weektype: inpValueWeekType || 'Обе', // Значение по умолчанию
            auditorium: inpValueAuditori || 'Не указана',
        };
        setLesson(newLesson);
        setStatus('✅ Урок создан, можно отправлять');
        console.log('Создан урок:', newLesson);
    };

    const sendPostRequest = async () => {
        if (!lesson) {
            setStatus('❌ Сначала создайте урок');
            return;
        }

        try {
            const response = await fetch(`${API_CONFIG.baseUrl}/lessons`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(lesson),
            });

            if (response.ok) {
                const data = await response.json();
                setStatus('✅ Урок успешно отправлен на сервер!');
                console.log('Ответ сервера:', data);

                // Очистка формы после успешной отправки
                setTimeout(() => {
                    setInpValueName('');
                    setInpValueTeacher('');
                    setInpValueGroup('');
                    setInpValueType('');
                    setInpValueWeekType('');
                    setInpValueAuditori('');
                    setLesson(null);
                    setStatus('');
                }, 2000);
            } else {
                const error = await response.json();
                setStatus(`❌ Ошибка: ${error.message}`);
            }
        } catch (error) {
            setStatus('❌ Ошибка соединения с сервером');
            console.error('Ошибка:', error);
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

            {/* Отображение статуса */}
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
                <CRUDlesson
                    inpValueName={inpValueName}
                    setInpValueName={setInpValueName}
                    inpValueGroup={inpValueGroup}
                    setInpValueGroup={setInpValueGroup}
                    inpValueTeacher={inpValueTeacher}
                    setInpValueTeacher={setInpValueTeacher}
                    inpValueType={inpValueType}
                    setInpValueType={setInpValueType}
                    inpValueWeekType={inpValueWeekType}
                    setInpValueWeekType={setInpValueWeekType}
                    inpValueAuditori={inpValueAuditori}
                    setInpValueAuditori={setInpValueAuditori}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                    weekday={weekday}
                    setWeekday={setWeekday}
                />


            <button onClick={addLesson} className="Header-button">
                Создать урок
            </button>

            <button onClick={sendPostRequest} className="Header-button" disabled={!lesson}>
                Отправить на сервер
            </button>
                </div>
        </>
    );
}

export default CreateLesson;