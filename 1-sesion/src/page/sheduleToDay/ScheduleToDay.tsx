import Header from '../../components/Header/header.tsx';
import '../../style/schedule.css';
import { useContext, useState, useEffect, useMemo } from 'react';
import { ItemPortal } from '../../contexts/GrupName.tsx';
import type { TodoItem } from '../../service/TodoItem.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { useTodo } from '../../hooks/useTodo.ts';
import { ThemeContext } from '../../contexts/Background.tsx';
import TodoInput from '../../components/Todo/TodoInput.tsx';
import ScheduleToDayLesson from '../../components/ScheduleToDay/ScheduleToDayLesson.tsx';
import ToDoToDay from '../../components/ScheduleToDay/ToDoToDay.tsx';
import {useFetch} from "../../hooks/useFetch.ts";
function getCurrentWeekType() {
  const referenceDate = new Date(2025, 0, 27);

  const now = new Date();

  const refStart = new Date(referenceDate);
  refStart.setHours(0, 0, 0, 0);

  const nowStart = new Date(now);
  nowStart.setHours(0, 0, 0, 0);

  const diffMs = nowStart - refStart;

  const msInWeek = 1000 * 60 * 60 * 24 * 7;

  const weeksPassed = Math.floor(diffMs / msInWeek);

  return weeksPassed % 2 === 0 ? 'Четная' : 'НеЧетная';
}
function ScheduleToDay() {
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const today = new Date();
  const dayName = days[today.getDay()];

  const { grupName } = useContext(ItemPortal);

  const [value, setValue] = useLocalStorage('base');
  const { inpValue, setInpValue, handleAdd, handleRemove } = useTodo(value, setValue);
  const [startHome, setStartHome] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentWeekType, setCurrentWeekType] = useState('Четная');
  const { themeType } = useContext(ThemeContext);
  const { data: scheduleData ,loading,error} = useFetch('http://localhost:8000/lessons');
  useEffect(() => {
    const weekType = getCurrentWeekType();
    setCurrentWeekType(weekType);
  }, []);
  const filteredSchedule = scheduleData.filter((lesson) => lesson.time.weekday === dayName);
  const filteredSchedule_day = filteredSchedule.filter((lesson) => lesson.group === grupName);
  const filteredSchedule_day_type = useMemo(
    () => filteredSchedule_day.filter((lesson) => lesson.weekType === currentWeekType),
    [filteredSchedule_day, currentWeekType]
  );

  const dontInvertStyle = {
    filter: themeType ? 'invert(1)' : 'invert(0)',
  };
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
  if (filteredSchedule_day_type.length === 0) {
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
            <div style={{ color: 'white', fontSize: 40 }}>
              <strong>Расписание на {dayName}</strong>
            </div>
            <p></p>
            <div style={{ color: 'white', fontSize: 30 }}>
              <strong>Сегодня нет занятий</strong>
            </div>
          </div>
        </div>
      </>
    );
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

        <div className="page-layout">
          <div className="main-content">
            <div className="schedule-page">
              <h1 style={{ color: 'white' }}>
                Расписание на {dayName} ({currentWeekType} Неделя)
              </h1>

              {filteredSchedule_day_type.map((lesson) => (
                <ScheduleToDayLesson
                  lesson={lesson}
                  setSelectedSubject={setSelectedSubject}
                  setStartHome={setStartHome}
                  startHome={startHome}
                />
              ))}
            </div>
          </div>

          {startHome && (
            <div className="sidebar">
              <h1>Домашняя работа</h1>
              <div className="input-container">
                <TodoInput
                  inpValue={inpValue}
                  setInpValue={setInpValue}
                  handleAdd={(text) => handleAdd(text, selectedSubject)}
                />
              </div>
              <div style={{ marginTop: '16px' }}>
                {startHome && (
                  <>
                    {value
                      .filter((item) => item.lesson === selectedSubject)
                      .map((day) => (
                        <ToDoToDay day={day} setValue={setValue} handleRemove={handleRemove} />
                      ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ScheduleToDay;
