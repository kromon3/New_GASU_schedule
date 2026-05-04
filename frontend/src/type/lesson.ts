export interface Lesson {
    id: string;
    subject: string;
    time:{
        start: string;
        end: string;
        weekday: string;
    }
    teacher: string;
    type: string;
    group: string;
    weekType: string;
    auditorium: string;
}