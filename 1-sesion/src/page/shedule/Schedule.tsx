// Schedule.js
import Header from '../../components/Header/header.tsx';
import '../../style/schedule.css';
import { useContext, useRef ,useMemo} from 'react';
import { ItemPortal } from '../../contexts/GrupName.tsx';
import { ThemeContext } from '../../contexts/Background.tsx';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SheduleWeek from "../../components/Schedule/SheduleWeek.tsx";
import {useFetch} from "../../hooks/useFetch.ts";

function Schedule() {
  const { grupName } = useContext(ItemPortal);
  const sliderRef = useRef(null);
  // Загрузка данных
    const { data: scheduleData ,loading,error} = useFetch('http://localhost:8000/lessons');

  const { themeType } = useContext(ThemeContext);

  // Фильтруем расписание по выбранной группе
  const filteredSchedule = useMemo(() =>
          scheduleData.filter((lesson) => lesson.group === grupName),
      [scheduleData, grupName]
  );

  const uniqueWeekTypes = useMemo(() =>
          [...new Set(filteredSchedule.map(item => item.weekType))],
      [filteredSchedule]
  );

  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  const goToSlide = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
  };

  const dontInvertStyle = {
    filter: themeType ? 'invert(1)' : 'invert(0)',
  };

  // Если группа не выбрана
  if (grupName === ' не выбрана') {
    return (
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
            <h2 style={{ color: 'white' }}>Выберите группу</h2>
          </div>
        </div>
    );
  }

  // Если нет расписания для группы
  if (filteredSchedule.length === 0) {
    return (
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
            <h2>Предметы группы отсутствуют</h2>
          </div>
        </div>
    );
  }
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

        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="week-indicators">
              {uniqueWeekTypes.map((weekType, index) => (
                  <button
                      key={index}
                      className="btn"
                      onClick={() => goToSlide(index)}
                  >
                    {weekType} неделя
                  </button>
              ))}
            </div>


          <div className="slider-container">
            <Slider ref={sliderRef} {...settings}>
              {uniqueWeekTypes.map((weekType, index) => (
                  <div key={index} className="slider">
                    <SheduleWeek
                        days={days}
                        filteredSchedule={filteredSchedule}
                        weekType={weekType}
                    />
                  </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
  );
}

export default Schedule;