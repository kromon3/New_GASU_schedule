import type {Lesson} from "../../type/lesson";

interface ScheduleWeekContentProps {
    days: string[];
    filteredSchedule: Lesson[];
    weekType: string;
}

function ScheduleWeekContent({days, filteredSchedule, weekType}: ScheduleWeekContentProps) {
    return(
        <div className="slide">
            {days.map((dayName) => {
                const lessonsForDay = filteredSchedule.filter(
                    (lesson:Lesson) => lesson.time.weekday === dayName && lesson.weekType === weekType
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
                        {lessonsForDay.map((lesson:Lesson) => (
                            <div key={lesson.id} className="lesson-box schedule">
                          <span className="time" style={{ marginRight: '12px' }}>
                            {lesson.time.start} – {lesson.time.end}
                          </span>
                                <h3 className="subject" style={{ marginRight: '12px' }}>
                                    {lesson.subject}
                                </h3>
                                <span className="type" style={{ marginRight: '12px' }}>
                            {lesson.type}
                          </span>
                                <span className="teacher" style={{ marginRight: '12px' }}>
                            {lesson.teacher}
                          </span>
                                <span className="time" style={{ marginLeft: '12px' }}>
                            {lesson.auditorium}
                          </span>
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    )
}
export  default ScheduleWeekContent;