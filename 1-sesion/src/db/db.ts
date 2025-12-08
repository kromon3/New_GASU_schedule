export interface ScheduleLesson {
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
export const scheduleData: ScheduleLesson[] = [
    // Существующие занятия для ИТ-201 (id 1-15)
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
    // Существующие занятия для 2-ПМИ-2 (id 16-18)
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
    },
    // Новые занятия для 2-ПМИ-2 (продолжение)
    {
        id: 19,
        subject: 'Программирование на Python',
        time: {
            start: "10:45",
            end: '12:15',
            weekday: 'Вторник'
        },
        teacher: 'Сидорова А.В.',
        type: "Лекция",
        group: '2-ПМИ-2'
    },
    {
        id: 20,
        subject: 'Матанализ',
        time: {
            start: "13:00",
            end: '14:30',
            weekday: 'Среда'
        },
        teacher: 'Якунина',
        type: "Практика",
        group: '2-ПМИ-2'
    },
    {
        id: 21,
        subject: 'Теория вероятностей',
        time: {
            start: "09:00",
            end: '10:30',
            weekday: 'Четверг'
        },
        teacher: 'Федоров К.Л.',
        type: "Лекция",
        group: '2-ПМИ-2'
    },
    {
        id: 22,
        subject: 'Иностранный язык',
        time: {
            start: "10:45",
            end: '12:15',
            weekday: 'Пятница'
        },
        teacher: 'Иванова Е.П.',
        type: "Практика",
        group: '2-ПМИ-2'
    },
    // Занятия для 1-ПМИ-2
    {
        id: 23,
        subject: 'Введение в математику',
        time: {
            start: "09:00",
            end: '10:30',
            weekday: 'Понедельник'
        },
        teacher: 'Якунина',
        type: "Лекция",
        group: '1-ПМИ-2'
    },
    {
        id: 24,
        subject: 'Алгебра и геометрия',
        time: {
            start: "10:45",
            end: '12:15',
            weekday: 'Понедельник'
        },
        teacher: 'Петров И.С.',
        type: "Практика",
        group: '1-ПМИ-2'
    },
    {
        id: 25,
        subject: 'Основы информатики',
        time: {
            start: "13:00",
            end: '14:30',
            weekday: 'Вторник'
        },
        teacher: 'Сидорова А.В.',
        type: "Лекция",
        group: '1-ПМИ-2'
    },
    {
        id: 26,
        subject: 'Основы программирования',
        time: {
            start: "09:00",
            end: '10:30',
            weekday: 'Среда'
        },
        teacher: 'Кузнецов М.С.',
        type: "Лабораторная",
        group: '1-ПМИ-2'
    },
    {
        id: 27,
        subject: 'Иностранный язык',
        time: {
            start: "10:45",
            end: '12:15',
            weekday: 'Четверг'
        },
        teacher: 'Иванова Е.П.',
        type: "Практика",
        group: '1-ПМИ-2'
    },
    {
        id: 28,
        subject: 'Физкультура',
        time: {
            start: "13:00",
            end: '14:30',
            weekday: 'Пятница'
        },
        teacher: 'Смирнов А.А.',
        type: "Практика",
        group: '1-ПМИ-2'
    },
    // Занятия для ПИ-1
    {
        id: 29,
        subject: 'Программирование на Java',
        time: {
            start: "09:00",
            end: '10:30',
            weekday: 'Понедельник'
        },
        teacher: 'Кузнецов М.С.',
        type: "Лекция",
        group: 'ПИ-1'
    },
    {
        id: 30,
        subject: 'Базы данных',
        time: {
            start: "10:45",
            end: '12:15',
            weekday: 'Понедельник'
        },
        teacher: 'Орлова Т.К.',
        type: "Практика",
        group: 'ПИ-1'
    },
    {
        id: 31,
        subject: 'Веб-разработка',
        time: {
            start: "13:00",
            end: '14:30',
            weekday: 'Вторник'
        },
        teacher: 'Кузнецов М.С.',
        type: "Лабораторная",
        group: 'ПИ-1'
    },
    {
        id: 32,
        subject: 'Проектирование ИС',
        time: {
            start: "09:00",
            end: '10:30',
            weekday: 'Среда'
        },
        teacher: 'Орлова Т.К.',
        type: "Лекция",
        group: 'ПИ-1'
    },
    {
        id: 33,
        subject: 'Мобильная разработка',
        time: {
            start: "10:45",
            end: '12:15',
            weekday: 'Четверг'
        },
        teacher: 'Сидорова А.В.',
        type: "Лекция",
        group: 'ПИ-1'
    },
    {
        id: 34,
        subject: 'Тестирование ПО',
        time: {
            start: "13:00",
            end: '14:30',
            weekday: 'Пятница'
        },
        teacher: 'Николаев Р.В.',
        type: "Практика",
        group: 'ПИ-1'
    },
    {
        id: 35,
        subject: 'Управление проектами',
        time: {
            start: "09:00",
            end: '10:30',
            weekday: 'Суббота'
        },
        teacher: 'Белова С.М.',
        type: "Лекция",
        group: 'ПИ-1'
    }
];