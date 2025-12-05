import Header from "../Header/header.tsx";
import './schedule.css'
interface ScheduleLesson {
    id: string | number;
    subject : string;
    time:{
        start: string;
        end: string;
        weekday: 'Понедельник'| 'Вторник'|'Среда'|'Четверг'|'Суббота'| null;
    };
    teacher:string;
    type?:'Лекция' | 'Практика' | 'Лабораторная' ;
    group?:string;
}
const scheduleData: ScheduleLesson[] = [
    {
        id: 1,
        subject: 'Матанализ',
        time: {
            start: "09:00",
            end: '10:30',
            weekday: 'Понедельник'
        },
        teacher: 'Якунина',
        type: "Лекция",
        group: '2-ПМИ-2'
    },
    {
        id: 2,
        subject: 'Линейная алгебра',
        time: {
            start: "10:45",
            end: '12:15',
            weekday: 'Понедельник'
        },
        teacher: 'Петров И.С.',
        type: "Лекция",
        group: 'ИТ-201'
    },
    {
        id: 3,
        subject: 'Программирование',
        time: {
            start: "13:00",
            end: '14:30',
            weekday: 'Понедельник'
        },
        teacher: 'Сидорова А.В.',
        type: "Лабораторная",
        group: 'ИТ-201'
    },
    {
        id: 4,
        subject: 'Физика',
        time: {
            start: "09:00",
            end: '10:30',
            weekday: 'Вторник'
        },
        teacher: 'Козлов Д.М.',
        type: "Лекция",
        group: 'ИТ-201'
    },
    {
        id: 5,
        subject: 'Программирование',
        time: {
            start: "10:45",
            end: '12:15',
            weekday: 'Вторник'
        },
        teacher: 'Сидорова А.В.',
        type: "Практика",
        group: 'ИТ-201'
    },
    {
        id: 6,
        subject: 'Иностранный язык',
        time: {
            start: "13:00",
            end: '14:30',
            weekday: 'Вторник'
        },
        teacher: 'Иванова Е.П.',
        type: "Практика",
        group: 'ИТ-201'
    },
    {
        id: 7,
        subject: 'Дискретная математика',
        time: {
            start: "09:00",
            end: '10:30',
            weekday: 'Среда'
        },
        teacher: 'Федоров К.Л.',
        type: "Лекция",
        group: 'ИТ-201'
    },
    {
        id: 8,
        subject: 'Архитектура компьютеров',
        time: {
            start: "10:45",
            end: '12:15',
            weekday: 'Среда'
        },
        teacher: 'Николаев Р.В.',
        type: "Практика",
        group: 'ИТ-201'
    },
    {
        id: 9,
        subject: 'Физкультура',
        time: {
            start: "14:00",
            end: '15:30',
            weekday: 'Среда'
        },
        teacher: 'Смирнов А.А.',
        type: "Практика",
        group: 'ИТ-201'
    },
    {
        id: 10,
        subject: 'Матанализ',
        time: {
            start: "09:00",
            end: '10:30',
            weekday: 'Четверг'
        },
        teacher: 'Якунина',
        type: "Практика",
        group: 'ИТ-201'
    },
    {
        id: 11,
        subject: 'Веб-технологии',
        time: {
            start: "10:45",
            end: '12:15',
            weekday: 'Четверг'
        },
        teacher: 'Кузнецов М.С.',
        type: "Лабораторная",
        group: 'ИТ-201'
    },
    {
        id: 12,
        subject: 'Базы данных',
        time: {
            start: "13:00",
            end: '14:30',
            weekday: 'Четверг'
        },
        teacher: 'Орлова Т.К.',
        type: "Лекция",
        group: 'ИТ-201'
    },
    {
        id: 13,
        subject: 'Базы данных',
        time: {
            start: "09:00",
            end: '10:30',
            weekday: 'Пятница'
        },
        teacher: 'Орлова Т.К.',
        type: "Лабораторная",
        group: 'ИТ-201'
    },
    {
        id: 14,
        subject: 'История',
        time: {
            start: "10:45",
            end: '12:15',
            weekday: 'Пятница'
        },
        teacher: 'Белова С.М.',
        type: "Лекция",
        group: 'ИТ-201'
    },
    {
        id: 15,
        subject: 'Архитектура компьютеров',
        time: {
            start: "09:00",
            end: '10:30',
            weekday: 'Суббота'
        },
        teacher: 'Николаев Р.В.',
        type: "Лекция",
        group: 'ИТ-201'
    },
    {
        id: 16,
        subject: 'Линейная алгебра',
        time: {
            start: "10:45",
            end: '12:15',
            weekday: 'Понедельник'
        },
        teacher: 'Петров И.С.',
        type: "Практика",
        group: '2-ПМИ-2'
    },
    {
        id: 17,
        subject: 'Физика',
        time: {
            start: "13:00",
            end: '14:30',
            weekday: 'Понедельник'
        },
        teacher: 'Козлов Д.М.',
        type: "Лабораторная",
        group: '2-ПМИ-2'
    },
    {
        id: 18,
        subject: 'Дискретная математика',
        time: {
            start: "09:00",
            end: '10:30',
            weekday: 'Вторник'
        },
        teacher: 'Федоров К.Л.',
        type: "Практика",
        group: '2-ПМИ-2'
    }
];
function Schedule() {
    return (
        <>
            <Header />
            <div className="schedule-page">
                <h1 className="page-title">Полное расписание</h1>
                <div className="all-lessons">
                    {scheduleData.map(lesson => (
                        <div key={lesson.id} className="lesson-box">
                            <div className="lesson-header">
                                <span className="weekday">{lesson.time.weekday}</span>
                                <span className="time">{lesson.time.start} - {lesson.time.end}</span>
                            </div>
                            <div className="lesson-main">
                                <h3 className="subject">{lesson.subject}</h3>
                                <div className="details">
                                    <span className="type">{lesson.type}</span>
                                    <span className="teacher">{lesson.teacher}</span>
                                    <span className="group">{lesson.group}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Schedule;