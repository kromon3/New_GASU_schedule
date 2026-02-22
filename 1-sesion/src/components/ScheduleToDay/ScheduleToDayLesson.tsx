function ScheduleToDayLesson({ lesson, setSelectedSubject, setStartHome, startHome }) {
  return (
    <div key={lesson.id} className="lesson-box schedule_to_day">
      <div style={{ flex: 1 }}>
        <div className="lesson-header">
          <span className="time" style={{ marginRight: '12px' }}>
            {lesson.time.start} - {lesson.time.end}
          </span>
        </div>
        <div className="lesson-main">
          <h3 className="subject">{lesson.subject}</h3>
          <div className="details">
            <span className="type" style={{ marginRight: '12px' }}>
              {lesson.type}
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
            setStartHome(!startHome);
          }}
        >
          <img src="/free-icon-article-8173239.png" alt="" style={{ height: '40px' }} />
        </button>
      </div>
    </div>
  );
}
export default ScheduleToDayLesson;
