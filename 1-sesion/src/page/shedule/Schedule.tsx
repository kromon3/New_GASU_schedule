// Schedule.js
import Header from '../../components/Header/header.tsx';
import '../../style/schedule.css';
import { useContext, useRef, useEffect, useState ,useMemo} from 'react';
import { ItemPortal } from '../../contexts/GrupName.tsx';
import { ThemeContext } from '../../contexts/Background.tsx';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SheduleWeek from "../../components/Schedule/SheduleWeek.tsx";

function Schedule() {
  const { grupName } = useContext(ItemPortal);
  const sliderRef = useRef(null);
  const [scheduleData, setScheduleData] = useState([]);

  // Загрузка данных
  useEffect(() => {
    fetch('http://localhost:8000/lessons')
        .then((res) => res.json())
        .then((data) => setScheduleData(data))
  }, []);

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