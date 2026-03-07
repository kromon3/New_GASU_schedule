// ScheduleWeekContent.js
import Header from '../../components/Header/Header.tsx';
import '../../style/schedule.css';
import {useRef ,useMemo} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useFetch} from "../../hooks/useFetch.ts";
import FetchError from "../../components/Error/FetchError.tsx";
import ScheduleWeekContent from "../../components/Schedule/ScheduleWeekContent.tsx";
import {useStore} from "../../../store/useTestStore.ts";
import {useTheme} from "../../../store/useTheme.ts";

function ScheduleWeek() {
    const { groupName} = useStore()
  const sliderRef = useRef(null);
  // Загрузка данных
    const { data: scheduleData ,loading,error} = useFetch('http://localhost:8000/lessons');

    const  themeType =  useTheme((s) => s.theme)

  // Фильтруем расписание по выбранной группе
  const filteredSchedule = useMemo(() =>
          scheduleData.filter((lesson) => lesson.group === groupName),
      [scheduleData, groupName]
  );

  const uniqueWeekTypes = useMemo(() =>
          [...new Set(filteredSchedule.map(item => item.weekType))],
      [filteredSchedule]
  );

  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  const goToSlide = (index) => {
    sliderRef.current.slickGoTo(index);
  };
    if(error){
        return (
            <FetchError
                error={error}
                loading={loading}
            />
        )

    }
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
    filter: themeType==='dark'  ? 'invert(1)' : 'invert(0)',
  };

  // Если группа не выбрана
  if (groupName === ' не выбрана') {
    return (
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
            <h2 style={{ color: 'white' }}>Выберите группу</h2>
          </div>
        </div>
    );
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
        <>
            <Header />
            <FetchError
                error={error}
                loading={loading}
            />
        </>

    }
  // Если нет расписания для группы
  if (filteredSchedule.length === 0) {
    return (
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
            <h2>Предметы группы отсутствуют</h2>
          </div>
        </div>
    );
  }

  return (
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
                    <ScheduleWeekContent
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

export default ScheduleWeek;