export interface TimeSlot {
    start: string;
    end: string;
    weekday: string;
}
export interface Lesson {
    id: string;
    subject: string;
    time:TimeSlot
    teacher: string;
    type: string;
    group: string;
    weekType: string;
    auditorium: string;
}

export interface GroupName {
    group_name: string;
}
