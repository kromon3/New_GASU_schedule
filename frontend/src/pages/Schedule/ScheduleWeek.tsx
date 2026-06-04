// ScheduleWeekContent.js
import Header from '../../components/Header/Header';
import '../../style/schedule.css';
import { useRef, useMemo } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetch } from "../../hooks/useFetch.ts";
import FetchError from "../../components/Error/FetchError";
import ScheduleWeekContent from "../../components/Schedule/ScheduleWeekContent";
import { useStore } from "../../../store/useTestStore";
import { useTheme } from "../../../store/useTheme";
import type {Lesson} from '../../../../types/lesson.types.ts'
import {API_CONFIG} from "../../../config/api.config.ts";

function ScheduleWeek() {
    const { groupName } = useStore();
    const sliderRef = useRef<Slider | null>(null);

    console.log('groupName:', groupName);
    const { data: scheduleData, loading, error } = useFetch<Lesson[]>(`${API_CONFIG.baseUrl}/lessons/schedule/${groupName}`);
    console.log('scheduleData:', scheduleData);

    const themeType = useTheme((s) => s.theme);

    const uniqueWeekTypes = useMemo(() => {
        if (!scheduleData || scheduleData.length === 0) return [];
        const types = [...new Set(scheduleData.map(lesson => lesson.weektype?.trim()))];
        console.log('uniqueWeekTypes:', types);
        return types;
    }, [scheduleData]);

    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    const goToSlide = (index: number) => {
        sliderRef.current?.slickGoTo(index);
    };

    if (error) {
        return <FetchError error={error} loading={loading} />;
    }

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        adaptiveHeight: true,
    };

    const dontInvertStyle = {
        filter: themeType === 'dark' ? 'invert(1)' : 'invert(0)',
    };

    // Если группа не выбрана
    if (groupName === ' не выбрана' || !groupName) {
        return (
            <div
                className="schedule-background"
                style={{
                    filter: themeType === 'dark' ? 'invert(1)' : 'invert(0)',
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

    if (loading) {
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
        );
    }

    // Если нет расписания для группы
    if (!scheduleData || scheduleData.length === 0) {
        return (
            <div
                className="schedule-background"
                style={{
                    filter: themeType === 'dark' ? 'invert(1)' : 'invert(0)',
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
                filter: themeType === 'dark' ? 'invert(1)' : 'invert(0)',
                transition: 'filter 0.5s ease-in-out',
            }}
        >
            <div style={dontInvertStyle}>
                <Header />
            </div>

            <div style={{ position: 'relative', minHeight: '100vh' }}>
                {/* Кнопки переключения недель - теперь используем uniqueWeekTypes */}
                {uniqueWeekTypes.length > 0 && (
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
                )}

                <div className="slider-container">
                    <Slider ref={sliderRef} {...settings}>
                        {/* Слайды для каждого типа недели */}
                        {uniqueWeekTypes.map((weekType, index) => (
                            <div key={index} className="slider">
                                <ScheduleWeekContent
                                    days={days}
                                    filteredSchedule={scheduleData}
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