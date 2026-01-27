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
}

export const scheduleData: ScheduleLesson[] = [
    // Существующие занятия для ИТ-201 (id 1-15) - добавлен weekType
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
    },
    // Существующие занятия для 2-ПМИ-2 (id 16-18) - добавлен weekType
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
    },
    // Новые занятия для 2-ПМИ-2 (продолжение) - добавлен weekType
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
    },
    // Занятия для 1-ПМИ-2 - добавлен weekType
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
    },
    // Занятия для ПИ-1 - добавлен weekType
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
    },

    // Дополнения с чередующимися неделями (оставлены без изменений)

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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
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
        weekType: 'Четная'
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
        weekType: 'НеЧетная'
    }
];