import Header from '../../components/Header/Header';
import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../style/header.css';

interface Lesson {
    id: string;
    subject: string;
    time: {
        start: string;
        end: string;
        weekday: string;
    };
    teacher: string;
    type: string;
    group: string;
    weekType: string;
    auditorium: string;
}

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

    const addLesson = () => {
        // Валидация обязательных полей
        if (!inpValueName || !inpValueTeacher || !inpValueGroup) {
            setStatus('❌ Заполните обязательные поля (предмет, преподаватель, группа)');
            return;
        }

        const newLesson: Lesson = {
            id: Date.now().toString(), // Исправлено: преобразуем в строку
            subject: inpValueName,
            time: {
                start: startTime,
                end: endTime,
                weekday: weekday,
            },
            teacher: inpValueTeacher,
            type: inpValueType || 'Лекция', // Значение по умолчанию
            group: inpValueGroup,
            weekType: inpValueWeekType || 'Обе', // Значение по умолчанию
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
            const response = await fetch('http://localhost:8000/lessons', {
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


    return (
        <>
            <Header />

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


                <div>
                    <h3>Название предмета</h3>
                    <input
                        className="search-input"
                        value={inpValueName}
                        onChange={(e) => setInpValueName(e.target.value)}
                        placeholder="Введите название предмета"
                    />
                </div>

                <div>
                    <h3>Группа</h3>
                    <input
                        className="search-input"
                        value={inpValueGroup}
                        onChange={(e) => setInpValueGroup(e.target.value)}
                        placeholder="Введите группу"
                    />
                </div>

                <div>
                    <h3>Преподаватель</h3>
                    <input
                        className="search-input"
                        value={inpValueTeacher}
                        onChange={(e) => setInpValueTeacher(e.target.value)}
                        placeholder="Введите преподавателя"
                    />
                </div>

                <div>
                    <h3>Тип занятия</h3>
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
                </div>

                <div>
                    <h3>Тип недели</h3>
                    <select
                        className="search-input"
                        value={inpValueWeekType}
                        onChange={(e) => setInpValueWeekType(e.target.value)}
                    >
                        <option value="">Выберите тип недели</option>
                        <option value="Четная">Четная</option>
                        <option value="НеЧетная">НеЧетная</option>
                        <option value="Обе">Обе</option>
                    </select>
                </div>

                <div>
                    <h3>Аудитория</h3>
                    <input
                        className="search-input"
                        value={inpValueAuditori}
                        onChange={(e) => setInpValueAuditori(e.target.value)}
                        placeholder="Введите аудиторию"
                    />
                </div>

                <div>
                    <h3>Время начала</h3>
                    <input
                        type="time"
                        className="search-input"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>

                <div>
                    <h3>Время окончания</h3>
                    <input
                        type="time"
                        className="search-input"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>

                <div>
                    <h3>День недели</h3>
                    <select
                        className="search-input"
                        value={weekday}
                        onChange={(e) => setWeekday(e.target.value)}
                    >
                        <option value="Понедельник">Понедельник</option>
                        <option value="Вторник">Вторник</option>
                        <option value="Среда">Среда</option>
                        <option value="Четверг">Четверг</option>
                        <option value="Пятница">Пятница</option>
                        <option value="Суббота">Суббота</option>
                    </select>
                </div>


            <button onClick={addLesson} className="Header-button">
                Создать урок
            </button>

            <button onClick={sendPostRequest} className="Header-button" disabled={!lesson}>
                Отправить на сервер
            </button>
        </>
    );
}

export default CreateLesson;