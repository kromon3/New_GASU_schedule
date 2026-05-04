import Header from '../../components/Header/Header.tsx';
import { useEffect, useState, useRef } from 'react';
import '../../style/schedule.css';
import {useFetch} from "../../hooks/useFetch.ts";
import FetchError from "../../components/Error/FetchError.tsx";
import {useStore} from "../../../store/useTestStore.ts";
import {useTheme} from "../../../store/useTheme.ts";
import type {Lesson} from "../../type/lesson.ts";

function Subject() {
    const [selected, setSelected] = useState<string | null>(null);
    const { groupName} = useStore()
    const focusRef = useRef<HTMLDivElement>(null);

    const { data: scheduleData ,loading,error} = useFetch<Lesson[]>('http://localhost:8000/lessons');

    const  themeType:string =  useTheme((s) => s.theme)
    const dontInvertStyle = {
        filter: themeType==='dark'  ? 'invert(1)' : 'invert(0)',
    };

    const filteredByGroup: Lesson[] | undefined = scheduleData?.filter((lesson:Lesson) => lesson.group === groupName);
    const uniqueLessons:Lesson[] = Array.from(
        new Map(filteredByGroup?.map((item:Lesson) => [item.subject, item])).values()
    );
    const filteredSchedule:Lesson[] = uniqueLessons.filter((lesson) => lesson.group === groupName);
    const selectedLesson:Lesson | undefined = filteredSchedule.find((el) => el.subject === selected);

    useEffect(() => {
        if (selected && focusRef.current) {
            focusRef.current.focus();
            focusRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [selected]);

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
            <>
                <Header />
                <FetchError
                    error={error}
                    loading={loading}
                />
            </>
        )

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
            <div className="schedule-page">
                <h2 style={{ color: 'white' }}>Предметы группы {groupName}</h2>
                <div className="subject-layout">
                    <div className="subjects-list">
                        {filteredSchedule.map((lesson:Lesson) => (
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
                            <div>
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
                                <div>
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Subject;