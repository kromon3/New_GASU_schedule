import Header from '../../components/Header/Header';
import '../../style/schedule.css';
import { useState} from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useTodo } from '../../hooks/useTodo';
import TodoInput from '../../components/Todo/TodoInput';
import ScheduleTodayLesson from '../../components/TodaySchedule/ScheduleTodayLesson';
import ToDoToday from '../../components/TodaySchedule/ToDoToday';
import {useFetch} from "../../hooks/useFetch";
import FetchError from "../../components/Error/FetchError";
import {useStore} from "../../../store/useTestStore";
import {useTheme} from "../../../store/useTheme";
import type {Lesson} from "../../type/lesson.ts";
function getCurrentWeekType() {
  const referenceDate = new Date(2025, 0, 27);

  const now = new Date();

  const refStart = new Date(referenceDate);
  refStart.setHours(0, 0, 0, 0);

  const nowStart = new Date(now);
  nowStart.setHours(0, 0, 0, 0);

  const diffMs = nowStart.getTime() - refStart.getTime();

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
  const  themeType =  useTheme((s) => s.theme)
  const currentWeekType = getCurrentWeekType();
  const { data: scheduleData ,loading,error} = useFetch<Lesson[]>(`http://localhost:8000/lessons/${currentWeekType}/${dayName}/${groupName}`);


  const lessons = scheduleData ?? [];

  const dontInvertStyle = {
    filter: themeType==='dark'  ? 'invert(1)' : 'invert(0)',
  }
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

  if (lessons.length === 0) {
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

              {lessons.map((lesson:Lesson) => (
                <ScheduleTodayLesson
                  lesson={lesson}
                  setSelectedSubject={setSelectedSubject}
                  setStartHome={setStartHome}
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
                  handleAdd={(text:string) => handleAdd(text, selectedSubject || '')}
                  setOptinShow={()=>{}}
                  optinShow={false}
                />
              </div>
              <div style={{ marginTop: '16px' }}>
                {startHome && (
                  <>
                    {value
                      .filter((item) => item.lesson === selectedSubject)
                        .map((day) => (
                            <ToDoToday key={day.id} day={day} setValue={setValue} handleRemove={handleRemove} />
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
