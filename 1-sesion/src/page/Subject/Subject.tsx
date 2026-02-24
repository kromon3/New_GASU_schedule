import Header from '../../components/Header/header.tsx';
import { useContext, useEffect, useState, useRef } from 'react';
import '../../style/schedule.css';
import { ItemPortal } from '../../contexts/GrupName.tsx';
import { ThemeContext } from '../../contexts/Background.tsx';
import {useFetch} from "../../hooks/useFetch.ts";

function Subject() {
  const [selected, setSelected] = useState<string | null>(null);
  const { grupName } = useContext(ItemPortal);
  const focusRef = useRef(null);

  const { data: scheduleData ,loading,error} = useFetch('http://localhost:8000/lessons');

  const { themeType } = useContext(ThemeContext);
  const dontInvertStyle = {
    filter: themeType ? 'invert(1)' : 'invert(0)',
  };

  const filteredByGroup = scheduleData.filter((lesson) => lesson.group === grupName);
  const uniqueLessons = Array.from(
    new Map(filteredByGroup.map((item) => [item.subject, item])).values()
  );

  const filteredSchedule = uniqueLessons.filter((lesson) => lesson.group === grupName);
  const selectedLesson = filteredSchedule.find((el) => el.subject === selected);

  // Фокус на сайдбаре при выборе предмета
  useEffect(() => {
    if (selected && focusRef.current) {
      focusRef.current.focus();
      // Прокрутка к элементу (опционально)
      focusRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selected]);
  if(loading){
    return (
        <>
          <Header/>
          <img src="../../../public/giphy.gif" alt="loading"/>
        </>
    )
  }
  if(error){
    return (
        <>
          <Header/>
          <div className="container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh'
          }}>
            <div style={{
              backgroundColor: '#fff',
              padding: '20px 30px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
              textAlign: 'center',
              marginBottom: '20px'
            }}>Что-то пошло не так.<br/>
              <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>{error}</span>
            </div>

            {/* Кнопка перезагрузки */}
            <button
                onClick={() => {window.location.reload()}}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
            >
              <img
                  src="/refresh_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png"
                  alt="Перезагрузить"
                  style={{ width: '48px', height: '48px' }}
              />
            </button>
            <p style={{ marginTop: '10px', color: '#666' }}>Нажмите, чтобы попробовать снова</p>
          </div>

        </>
    )
  }
  return (
    <>
      <div
        className="schedule-background"
        style={{
          filter: themeType ? 'invert(1)' : 'invert(0)',
          transition: 'filter 0.5s ease-in-out',
        }}
      >
        <div style={dontInvertStyle}>
          <Header />
        </div>

        <div className="schedule-page">
          <h2 style={{ color: 'white' }}>Предметы группы {grupName}</h2>
          <div className="subject-layout">
            <div className="subjects-list">
              {filteredSchedule.map((lesson) => (
                <div
                  key={lesson.id}
                  className={`lesson-box ${selected === lesson.subject ? 'selected' : ''}`}
                  onClick={() => setSelected(lesson.subject)}
                  style={{ marginBottom: '12px', marginTop: '12px' }}
                  role="button" // Для доступности
                  tabIndex={0} // Делаем элемент фокусируемым
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelected(lesson.subject);
                    }
                  }}
                >
                  <div className="lesson-main">
                    <h3 className="subject">{lesson.subject}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div ref={focusRef} tabIndex={-1}>
              {selectedLesson && (
                <div
                  className={selected ? 'info-sidebar' : 'info-sidebar.false'}
                  style={{ color: 'white' }}
                >
                  <img src="/avatar.png" alt="harry potter" style={{ width: '50px' }} />
                  <h3 style={{ marginLeft: '12px', color: 'white' }}>{selectedLesson.subject}</h3>
                  <h3 style={{ marginLeft: '12px', color: 'white' }}>
                    {' '}
                    Преподаватель: {selectedLesson.teacher}
                  </h3>
                  <h3 style={{ marginLeft: '12px', color: 'white' }}>
                    {' '}
                    Тип: {selectedLesson.type}
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subject;
