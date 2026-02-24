import {useState, useMemo, useCallback, useContext, useEffect} from "react";
import Header from "../../components/Header/header.tsx";
import '../../style/todolist.css'
import TodolistCounter from "../../components/Todo/TodolistCounter.tsx";
import {ItemPortal} from "../../contexts/GrupName.tsx";
import type {TodoItem} from '../../service/TodoItem.ts'
import {useLocalStorage} from "../../hooks/useLocalStorage.ts";
import {useTodo} from "../../hooks/useTodo.ts";
import {useFetch} from "../../hooks/useFetch.ts";
import {ThemeContext} from "../../contexts/Background.tsx";

function TodoList() {
    const { grupName } = useContext(ItemPortal);
    const [value, setValue] = useLocalStorage('base', []);
    const [stateIsDone, setStateIsDone] = useState<'all' | 'active' | 'completed'>('all');
    const [optinShow, setOptinShow] = useState<boolean>(false);
    const {inpValue, setInpValue, inpchangeValue, setInpchangeValue, isSelected, handleAdd, handleRemove, handleChange, startEditing, cancelEditing,} = useTodo(value, setValue);
    const filteredTasks = useMemo(() => {
        if(stateIsDone === 'active') {
            return value.filter(item => !item.isDone);
        }
        if(stateIsDone === 'completed') {
            return value.filter(item => item.isDone);
        }
        return value;
    }, [value, stateIsDone]); // memo для фильтра задач чтобы было круче
    const { isDoneValue, allValues, remainingValue } = useMemo(() => {
        const doneCount = value.filter(item => item.isDone).length;
        const total = value.length;
        return {
            isDoneValue: doneCount,
            allValues: total,
            remainingValue: total - doneCount,
        };
    }, [value]);//Мониторинг данных
    const { data: scheduleData ,loading,error} = useFetch('http://localhost:8000/lessons');
    const handleLessonChange = useCallback((taskId: number, lesson: string) => {
        setValue(prev =>
            prev.map(item =>
                item.id === taskId ? { ...item, lesson } : item
            )
        );
    }, [setValue]);
    const { themeType } = useContext(ThemeContext);
    const filteredArray = useMemo(() => {
        const byGroup = scheduleData.filter((i) => i.group === grupName);
        return Array.from(
            new Map(byGroup.map(item => [item.subject, item])).values()
        );
    }, [scheduleData, grupName]);
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
    return (
        <>
            <div className="schedule-background"
                 style={{
                     filter: themeType ? 'invert(1)' : 'invert(0)',
                     transition: 'filter 0.5s ease-in-out'
                 }}
            >
                <div style={dontInvertStyle}>
                    <Header />
                </div>
                <div style={dontInvertStyle}>
            <TodolistCounter
                text={isDoneValue}
                allValues={allValues}
                remainingValue={remainingValue}
            /></div>
            <div className="container">
                <div className="input-and-button">
                    <div className="input-container">
                        <input
                            className="search-input"
                            value={inpValue}
                            onChange={(e) => setInpValue(e.target.value)}
                            placeholder="Введите задачу"
                        />
                    </div>
                    <button className="btn" onClick={() => handleAdd(inpValue, '')}>
                        Добавить
                    </button>
                    <button className="btn" onClick={()=>setOptinShow(!optinShow)}>
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                </div>
                {
                    optinShow ? (
                        <div className="input-and-button">
                            <button className="btn" onClick={()=>setStateIsDone('active')}>активные</button>
                            <button className="btn" onClick={() => setStateIsDone('completed')}>выполненные</button>
                            <button className="btn" onClick={()=>setStateIsDone('all')}>все</button>
                        </div>) : ('')
                }
                <div className="main">
                    {
                        filteredTasks.length===0 ? (
                            <h1>Введите задачу</h1>
                        ) : (
                            filteredTasks.map((item) => (
                                <div key={item.id} className="todo-item">
                                    {item.id === isSelected ? (
                                        <div className="item editing">
                                            <input
                                                className="search-input edit-input"
                                                value={inpchangeValue}
                                                onChange={(e) => setInpchangeValue(e.target.value)}
                                                placeholder="Редактировать задачу"
                                                autoFocus
                                            />
                                            <div className="button-group">
                                                <button className="btn save-btn" onClick={() => handleChange(item.id, inpchangeValue)}>
                                                    Сохранить
                                                </button>
                                                <button className="btn cancel-btn" onClick={cancelEditing}>
                                                    Отмена
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="item">
                                            <input type="checkbox"   style={{
                                                width: '40px',
                                                height: '30px',
                                                borderRadius: '50%', // или '50%' для идеального овала/круга
                                            }} checked={item.isDone} onChange={() => {
                                                setValue(prev =>
                                                    prev.map(v =>
                                                        v.id === item.id ? { ...v, isDone: !v.isDone } : v
                                                    )
                                                );
                                            }}/>
                                            <h1 className = {item.isDone ? ("text-content Done"): ("text-content NoDone")} style={{marginRight: 20 ,color:'white'}}>{item.text}</h1>
                                            <div className="button-group">
                                                {
                                                    item.isDone ? (
                                                         <div style={{ marginLeft: 21.44 ,color:'white',fontSize:30}}><strong>Выполнено</strong></div>
                                                    ) : ""
                                                }
                                                <button className={"btn delete-btn "} onClick={() => handleRemove(item.id)}>
                                                    <img src="/free-icon-close-151882.png" alt="Удаление" style={{ width:25   }}/>
                                                </button>
                                                <button className={item.isDone ? "btn edit-btn none" : "btn edit-btn"} onClick={() => startEditing(item.id)}>
                                                    <img src="/free-icon-edit-button-84380.png" alt="Редактирование" style={{ width:25  }}/>
                                                </button>
                                                <div>
                                                    {
                                                        item.lesson ? (
                                                            <div className={item.isDone ? "btn edit-btn none" : "lesson"}>{item.lesson}</div>
                                                        ) : (

                                                            <select className={item.isDone ? "btn edit-btn none" : "btn edit-btn"} value={item.lesson || ""}
                                                                    onChange={(e) => handleLessonChange(item.id, e.target.value)}
                                                            >
                                                                <option value="">— Предмет —</option>
                                                                <option value="-">Отсутствует</option>
                                                                {filteredArray.map((subjectItem) => (
                                                                    <option key={subjectItem.subject} value={subjectItem.subject}>
                                                                        {subjectItem.subject}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        )
                                                    }):('')
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
            </div>
        </>
    );
}

export default TodoList;