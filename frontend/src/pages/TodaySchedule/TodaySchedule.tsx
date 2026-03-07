import Header from '../../components/Header/Header.tsx';
import '../../style/schedule.css';
import { useState, useEffect, useMemo } from 'react';
import type { Todo } from '../../type/todo.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { useTodo } from '../../hooks/useTodo.ts';
import TodoInput from '../../components/Todo/TodoInput.tsx';
import ScheduleTodayLesson from '../../components/TodaySchedule/ScheduleTodayLesson.tsx';
import ToDoToday from '../../components/TodaySchedule/ToDoToday.tsx';
import {useFetch} from "../../hooks/useFetch.ts";
import FetchError from "../../components/Error/FetchError.tsx";
import {useStore} from "../../../store/useTestStore.ts";
import {useTheme} from "../../../store/useTheme.ts";
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
function TodaySchedule() {
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const today = new Date();
  const dayName = days[today.getDay()];

  const { groupName} = useStore()

  const [value, setValue] = useLocalStorage('base');
  const { inpValue, setInpValue, handleAdd, handleRemove } = useTodo(value, setValue);
  const [startHome, setStartHome] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentWeekType, setCurrentWeekType] = useState('Четная');
  const  themeType =  useTheme((s) => s.theme)
  const { data: scheduleData ,loading,error} = useFetch('http://localhost:8000/lessons');
  useEffect(() => {
    const weekType = getCurrentWeekType();
    setCurrentWeekType(weekType);
  }, []);
  const filteredSchedule = scheduleData.filter((lesson) => lesson.time.weekday === dayName);
  const filteredSchedule_day = filteredSchedule.filter((lesson) => lesson.group === groupName);
  const filteredSchedule_day_type = useMemo(
    () => filteredSchedule_day.filter((lesson) => lesson.weekType === currentWeekType),
    [filteredSchedule_day, currentWeekType]
  );

  const dontInvertStyle = {
    filter: themeType==='dark'  ? 'invert(1)' : 'invert(0)',
  }
  console.log(loading)
  if(loading){
    return (
        <>
          <Header />
          <div className="loading">
            <img
                src="/icons8-значок-загрузки-iphone.gif"
                alt="loading"
                style={{ width: '50px', height: '50px' }}
            />
          </div>
        </>
    )
  }
  if(error){
    return (
            <FetchError
                error={error}
                loading={loading}
            />
        )

  }

  if (filteredSchedule_day_type.length === 0) {
    return (
      <>

        <div
          className="schedule-background"
          style={{
            filter: themeType==='dark'  ? 'invert(1)' : 'invert(0)',
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
          filter: themeType==='dark'  ? 'invert(1)' : 'invert(0)',
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
                <ScheduleTodayLesson
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
              <h1>Домашняя работа {selectedSubject}</h1>
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
                        <ToDoToday day={day} setValue={setValue} handleRemove={handleRemove} />
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

export default TodaySchedule;
