import Header from '../../components/Header/Header.tsx';
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../style/header.css';
import FetchError from "../../components/Error/FetchError.tsx";
function CreateLesson() {
  const [inpValueGroup, setInpValueGroup] = React.useState('');
  const [inpValueName, setInpValueName] = React.useState('');
  const [inpValueTeacher, setInpValueTeacher] = React.useState('');
  const [inpValueType, setInpValueType] = React.useState('');
  const [inpValueWeekType, setInpValueWeekType] = React.useState('');
  const [inpValueAuditori, setInpValueAuditori] = React.useState('');
  const [Lesson, setLesson] = React.useState(null);

  interface Lesson {
    id: number;
    subject: string;
    time: {
      start: string;
      end: string;
      weekday: string;
    };
    teacher: string;
    type: string;
    group: string;
    weekType: string;
    auditorium: string;
  }
  const addLesson = () => {
    const newLesson: Lesson = {
      id: Date.now(),
      subject: inpValueName,
      time: {
        start: '09:00',
        end: '10:30',
        weekday: 'Понедельник',
      },
      teacher: inpValueTeacher,
      type: inpValueType,
      group: inpValueGroup,
      weekType: inpValueWeekType,
      auditorium: inpValueAuditori,
    };
    setLesson(newLesson);
  };

  const sendPostRequest = () => {
    fetch('http://localhost:8000/lessons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Lesson),
    });
  };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };
  return (
    <>
      <Header />
        <Slider {...settings}>
      <input
        className="search-input"
        value={inpValueName}
        onChange={(e) => setInpValueName(e.target.value)}
        placeholder="Введите название предмета"
      />

      <input
        className="search-input"
        value={inpValueGroup}
        onChange={(e) => setInpValueGroup(e.target.value)}
        placeholder="Введите группу"
      />

      <input
        className="search-input"
        value={inpValueTeacher}
        onChange={(e) => setInpValueTeacher(e.target.value)}
        placeholder="Введите преподавателя"
      />
      <input
        className="search-input"
        value={inpValueType}
        onChange={(e) => setInpValueType(e.target.value)}
        placeholder="Введите тип"
      />
      <input
        className="search-input"
        value={inpValueWeekType}
        onChange={(e) => setInpValueWeekType(e.target.value)}
        placeholder="Введите тип"
      />
      <input
        className="search-input"
        value={inpValueAuditori}
        onChange={(e) => setInpValueAuditori(e.target.value)}
        placeholder="Введите аудиторию"
      />
        </Slider>
      <button onClick={() => addLesson()} className="Header-button" >Создать урок</button>

      <button onClick={sendPostRequest} className="Header-button">Отправить на сервер</button>
    </>
  );
}

export default CreateLesson;
