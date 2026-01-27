export interface ScheduleLesson {
    id: string | number;
    subject: string;
    time: {
        start: string;
        end: string;
        weekday: 'Понедельник' | 'Вторник' | 'Среда' | 'Четверг' | 'Суббота' | null;
    };
    teacher: string;
    type?: 'Лекция' | 'Практика' | 'Лабораторная';
    group?: string;
    weekType?: 'Четная' | 'НеЧетная'
    auditorium?: string;
}

export const scheduleData: ScheduleLesson[] = [
    // Существующие занятия для ИТ-201 (id 1-15) - добавлен weekType и аудитория
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
        group: '2-ПМИ-2',
        weekType: 'Четная',
        auditorium: '310'
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
        group: 'ИТ-201',
        weekType: 'НеЧетная',
        auditorium: '215'
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
        group: 'ИТ-201',
        weekType: 'Четная',
        auditorium: '405'
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
        group: 'ИТ-201',
        weekType: 'НеЧетная',
        auditorium: '101'
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
        group: 'ИТ-201',
        weekType: 'Четная',
        auditorium: '208'
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
        group: 'ИТ-201',
        weekType: 'НеЧетная',
        auditorium: '315'
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
        group: 'ИТ-201',
        weekType: 'Четная',
        auditorium: '412'
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
        group: 'ИТ-201',
        weekType: 'НеЧетная',
        auditorium: '107'
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
        group: 'ИТ-201',
        weekType: 'Четная',
        auditorium: 'Спортзал 1'
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
        group: 'ИТ-201',
        weekType: 'НеЧетная',
        auditorium: '209'
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
        group: 'ИТ-201',
        weekType: 'Четная',
        auditorium: '506'
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
        group: 'ИТ-201',
        weekType: 'НеЧетная',
        auditorium: '301'
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
        group: 'ИТ-201',
        weekType: 'Четная',
        auditorium: '404'
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
        group: 'ИТ-201',
        weekType: 'НеЧетная',
        auditorium: '112'
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
        group: 'ИТ-201',
        weekType: 'Четная',
        auditorium: '308'
    },
    // Существующие занятия для 2-ПМИ-2 (id 16-18) - добавлен weekType и аудитория
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
        group: '2-ПМИ-2',
        weekType: 'НеЧетная',
        auditorium: '214'
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
        group: '2-ПМИ-2',
        weekType: 'Четная',
        auditorium: '403'
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
        group: '2-ПМИ-2',
        weekType: 'НеЧетная',
        auditorium: '109'
    },
    // Новые занятия для 2-ПМИ-2 (продолжение) - добавлен weekType и аудитория
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
        group: '2-ПМИ-2',
        weekType: 'Четная',
        auditorium: '312'
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
        group: '2-ПМИ-2',
        weekType: 'НеЧетная',
        auditorium: '207'
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
        group: '2-ПМИ-2',
        weekType: 'Четная',
        auditorium: '410'
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
        group: '2-ПМИ-2',
        weekType: 'НеЧетная',
        auditorium: '105'
    },
    // Занятия для 1-ПМИ-2 - добавлен weekType и аудитория
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
        group: '1-ПМИ-2',
        weekType: 'Четная',
        auditorium: '201'
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
        group: '1-ПМИ-2',
        weekType: 'НеЧетная',
        auditorium: '306'
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
        group: '1-ПМИ-2',
        weekType: 'Четная',
        auditorium: '508'
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
        group: '1-ПМИ-2',
        weekType: 'НеЧетная',
        auditorium: '413'
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
        group: '1-ПМИ-2',
        weekType: 'Четная',
        auditorium: '210'
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
        group: '1-ПМИ-2',
        weekType: 'НеЧетная',
        auditorium: 'Спортзал 2'
    },
    // Занятия для ПИ-1 - добавлен weekType и аудитория
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
        group: 'ПИ-1',
        weekType: 'Четная',
        auditorium: '309'
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
        group: 'ПИ-1',
        weekType: 'НеЧетная',
        auditorium: '205'
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
        group: 'ПИ-1',
        weekType: 'Четная',
        auditorium: '507'
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
        group: 'ПИ-1',
        weekType: 'НеЧетная',
        auditorium: '102'
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
        group: 'ПИ-1',
        weekType: 'Четная',
        auditorium: '411'
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
        group: 'ПИ-1',
        weekType: 'НеЧетная',
        auditorium: '304'
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
        group: 'ПИ-1',
        weekType: 'Четная',
        auditorium: '108'
    },

    // Дополнения с чередующимися неделями (оставлены без изменений) - добавлена аудитория

    // Чередующиеся занятия для ИТ-201
    {
        id: 36,
        subject: 'Программирование',
        time: {
            start: "13:00",
            end: '14:30',
            weekday: 'Понедельник'
        },
        teacher: 'Сидорова А.В.',
        type: "Практика",
        group: 'ИТ-201',
        weekType: 'Четная',
        auditorium: '313'
    },
    {
        id: 37,
        subject: 'Базы данных',
        time: {
            start: "13:00",
            end: '14:30',
            weekday: 'Понедельник'
        },
        teacher: 'Орлова Т.К.',
        type: "Лабораторная",
        group: 'ИТ-201',
        weekType: 'НеЧетная',
        auditorium: '406'
    },
    {
        id: 38,
        subject: 'Архитектура компьютеров',
        time: {
            start: "10:45",
            end: '12:15',
            weekday: 'Среда'
        },
        teacher: 'Николаев Р.В.',
        type: "Лабораторная",
        group: 'ИТ-201',
        weekType: 'Четная',
        auditorium: '509'
    },
    {
        id: 39,
        subject: 'Дискретная математика',
        time: {
            start: "10:45",
            end: '12:15',
            weekday: 'Среда'
        },
        teacher: 'Федоров К.Л.',
        type: "Практика",
        group: 'ИТ-201',
        weekType: 'НеЧетная',
        auditorium: '203'
    },

    // Чередующиеся занятия для 2-ПМИ-2
    {
        id: 40,
        subject: 'Линейная алгебра',
        time: {
            start: "10:45",
            end: '12:15',
            weekday: 'Понедельник'
        },
        teacher: 'Петров И.С.',
        type: "Лекция",
        group: '2-ПМИ-2',
        weekType: 'Четная',
        auditorium: '302'
    },
    {
        id: 41,
        subject: 'Физика',
        time: {
            start: "10:45",
            end: '12:15',
            weekday: 'Понедельник'
        },
        teacher: 'Козлов Д.М.',
        type: "Практика",
        group: '2-ПМИ-2',
        weekType: 'НеЧетная',
        auditorium: '104'
    },
    {
        id: 42,
        subject: 'Матанализ',
        time: {
            start: "13:00",
            end: '14:30',
            weekday: 'Среда'
        },
        teacher: 'Якунина',
        type: "Лекция",
        group: '2-ПМИ-2',
        weekType: 'Четная',
        auditorium: '307'
    },
    {
        id: 43,
        subject: 'Программирование на Python',
        time: {
            start: "13:00",
            end: '14:30',
            weekday: 'Среда'
        },
        teacher: 'Сидорова А.В.',
        type: "Практика",
        group: '2-ПМИ-2',
        weekType: 'НеЧетная',
        auditorium: '204'
    },

    // Чередующиеся занятия для 1-ПМИ-2
    {
        id: 44,
        subject: 'Основы программирования',
        time: {
            start: "09:00",
            end: '10:30',
            weekday: 'Среда'
        },
        teacher: 'Кузнецов М.С.',
        type: "Практика",
        group: '1-ПМИ-2',
        weekType: 'Четная',
        auditorium: '408'
    },
    {
        id: 45,
        subject: 'Введение в математику',
        time: {
            start: "09:00",
            end: '10:30',
            weekday: 'Среда'
        },
        teacher: 'Якунина',
        type: "Практика",
        group: '1-ПМИ-2',
        weekType: 'НеЧетная',
        auditorium: '111'
    },
    {
        id: 46,
        subject: 'Алгебра и геометрия',
        time: {
            start: "10:45",
            end: '12:15',
            weekday: 'Понедельник'
        },
        teacher: 'Петров И.С.',
        type: "Лекция",
        group: '1-ПМИ-2',
        weekType: 'Четная',
        auditorium: '212'
    },
    {
        id: 47,
        subject: 'Основы информатики',
        time: {
            start: "10:45",
            end: '12:15',
            weekday: 'Понедельник'
        },
        teacher: 'Сидорова А.В.',
        type: "Практика",
        group: '1-ПМИ-2',
        weekType: 'НеЧетная',
        auditorium: '505'
    },

    // Чередующиеся занятия для ПИ-1
    {
        id: 48,
        subject: 'Веб-разработка',
        time: {
            start: "13:00",
            end: '14:30',
            weekday: 'Вторник'
        },
        teacher: 'Кузнецов М.С.',
        type: "Практика",
        group: 'ПИ-1',
        weekType: 'Четная',
        auditorium: '303'
    },
    {
        id: 49,
        subject: 'Мобильная разработка',
        time: {
            start: "13:00",
            end: '14:30',
            weekday: 'Вторник'
        },
        teacher: 'Сидорова А.В.',
        type: "Лабораторная",
        group: 'ПИ-1',
        weekType: 'НеЧетная',
        auditorium: '409'
    },
    {
        id: 50,
        subject: 'Проектирование ИС',
        time: {
            start: "09:00",
            end: '10:30',
            weekday: 'Среда'
        },
        teacher: 'Орлова Т.К.',
        type: "Практика",
        group: 'ПИ-1',
        weekType: 'Четная',
        auditorium: '106'
    },
    {
        id: 51,
        subject: 'Тестирование ПО',
        time: {
            start: "09:00",
            end: '10:30',
            weekday: 'Среда'
        },
        teacher: 'Николаев Р.В.',
        type: "Лекция",
        group: 'ПИ-1',
        weekType: 'НеЧетная',
        auditorium: '311'
    },
    {
        id: 52,
        subject: 'Управление проектами',
        time: {
            start: "09:00",
            end: '10:30',
            weekday: 'Суббота'
        },
        teacher: 'Белова С.М.',
        type: "Практика",
        group: 'ПИ-1',
        weekType: 'Четная',
        auditorium: '202'
    },
    {
        id: 53,
        subject: 'Программирование на Java',
        time: {
            start: "09:00",
            end: '10:30',
            weekday: 'Суббота'
        },
        teacher: 'Кузнецов М.С.',
        type: "Лабораторная",
        group: 'ПИ-1',
        weekType: 'НеЧетная',
        auditorium: '504'
    }
];