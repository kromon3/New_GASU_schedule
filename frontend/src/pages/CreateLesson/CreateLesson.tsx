import Header from '../../components/Header/Header';
import React, {useState} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../style/header.css';
import type { Lesson } from '../../../../types/lesson.types.ts'
import { useTheme } from "../../../store/useTheme.ts";
import { API_CONFIG } from "../../../config/api.config.ts"
import LessonCard from "../../components/CRUD_Lesson/LessonCard.tsx";
import ConfigLesson from "../../components/CRUD_Lesson/ConfigLesson.tsx";

function CreateLesson() {
    const [lesson, setLesson] = React.useState<Lesson | null>(null);
    const [status, setStatus] = React.useState<string>('');
    const [test , setTest] = useState({
        id: '1242363',
        subject: 'aaa',
        time_start: '12:23',
        time_end: '14:24',
        weekday: 'string',
        teacher: 'string',
        type_name: 'string',
        group_name: 'string',
        weektype: 'string',
        auditorium: 'string'
    })
    const handleChage= (e)=>{
        setTest({
            ...test,
            [e.target.name]: e.target.value
        })
        console.log(test)
    }
    const themeType = useTheme((s) => s.theme);


    const addLesson = () => {


        const newLesson: Lesson = {
            id: Date.now().toString(),
            subject: test.subject,
            time_start: test.time_start,
            time_end: test.time_end,
            weekday: test.weekday,
            teacher: test.teacher,
            type_name: test.type_name || 'Лекция',
            group_name: test.group_name,
            weektype: test.weektype || 'Обе',
            auditorium: test.auditorium || 'Не указана',
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

                setTimeout(() => {
                    setTest({
                        id: Math.floor(Date.now() / 1000).toString(),
                        subject: '',
                        time_start: '09:00',
                        time_end: '10:30',
                        weekday: '',
                        teacher: '',
                        type_name: '',
                        group_name: '',
                        weektype: '',
                        auditorium: '',
                    });
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
                <ConfigLesson test={test} handleChage={handleChage}/>
                <br/>
                <LessonCard test={test} handleChage={handleChage} />

                <br/>



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