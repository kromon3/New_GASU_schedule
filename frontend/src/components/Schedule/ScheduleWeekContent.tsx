import type { Lesson } from "../../type/lesson";

interface ScheduleWeekContentProps {
    days: string[];
    filteredSchedule: Lesson[];
    weekType: string;
}

function ScheduleWeekContent({ days, filteredSchedule, weekType }: ScheduleWeekContentProps) {
    return (
        <div className="slide">
            {days.map((dayName) => {
                const lessonsForDay = filteredSchedule.filter(
                    (lesson: Lesson) =>
                        lesson.weekday?.trim() === dayName &&
                        lesson.weektype?.trim() === weekType  // ← weektype (маленькая t) + trim()
                );

                if (lessonsForDay.length === 0) return null;

                return (
                    <div key={dayName} className="day-section">
                        <h2
                            style={{
                                color: 'white',
                                marginRight: '12px',
                                padding: '8px 16px',
                                borderRadius: '5px',
                                display: 'inline-block',
                                fontSize: '1.5rem',
                                fontWeight: '600',
                            }}
                        >
                            {dayName}
                        </h2>
                        {lessonsForDay.map((lesson: Lesson) => (
                            <div key={lesson.id} className="lesson-box schedule">
                                <span className="time" style={{ marginRight: '12px' }}>
                                    {lesson.time_start} – {lesson.time_end}
                                </span>
                                <h3 className="subject" style={{ marginRight: '12px' }}>
                                    {lesson.subject?.trim()}
                                </h3>
                                <span className="type" style={{ marginRight: '12px' }}>
                                    {lesson.type_name?.trim()}
                                </span>
                                <span className="teacher" style={{ marginRight: '12px' }}>
                                    {lesson.teacher?.trim()}
                                </span>
                                <span className="auditorium" style={{ marginLeft: '12px' }}>
                                    {lesson.auditorium?.trim()}
                                </span>
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}

export default ScheduleWeekContent;