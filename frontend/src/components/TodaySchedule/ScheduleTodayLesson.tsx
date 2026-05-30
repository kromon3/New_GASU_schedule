import type {Lesson} from "../../type/lesson";
interface ScheduleTodayLessonProps {
    lesson: Lesson;
    setSelectedSubject: (subject: string) => void;
    setStartHome: (value: boolean) => void;
}

function ScheduleTodayLesson({lesson, setSelectedSubject, setStartHome}: ScheduleTodayLessonProps) {
  return (
    <div key={lesson.id} className="lesson-box schedule_to_day">
      <div style={{ flex: 1 }}>
        <div className="lesson-header">
          <span className="time" style={{ marginRight: '12px' }}>
            {lesson.time_start} - {lesson.time_end}
          </span>
        </div>
        <div className="lesson-main">
          <h3 className="subject">{lesson.subject}</h3>
          <div className="details">
            <span className="type" style={{ marginRight: '12px' }}>
              {lesson.type_name}
            </span>
            <span className="teacher">{lesson.teacher}</span>
          </div>
        </div>
      </div>
      <span className="time">{lesson.auditorium}</span>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '16px' }}>
        <button
          onClick={() => {
            setSelectedSubject(lesson.subject);
              setStartHome(true);
          }}
        >
          <img src="/free-icon-article-8173239.png" alt="" style={{ height: '40px' }} />
        </button>
      </div>
    </div>
  );
}
export default ScheduleTodayLesson;
