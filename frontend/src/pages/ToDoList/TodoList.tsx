import {useState, useMemo, useCallback, useContext} from "react";
import Header from "../../components/Header/Header.tsx";
import '../../style/todolist.css'
import TodoListCounter from "../../components/Todo/TodoListCounter.tsx";
import type {Todo} from '../../type/todo.ts'
import {useLocalStorage} from "../../hooks/useLocalStorage.ts";
import {useTodo} from "../../hooks/useTodo.ts";
import {useFetch} from "../../hooks/useFetch.ts";
import {ThemeContext} from "../../contexts/Background.tsx";
import FetchError from "../../components/Error/FetchError.tsx";
import {useStore} from "../../../store/useTestStore.ts";

function TodoList() {
    const { groupName} = useStore()
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
    console.log(loading);
    const handleLessonChange = useCallback((taskId: number, lesson: string) => {
        setValue(prev =>
            prev.map(item =>
                item.id === taskId ? { ...item, lesson } : item
            )
        );
    }, [setValue]);
    const { themeType } = useContext(ThemeContext);
    const filteredArray = useMemo(() => {
        const byGroup = scheduleData.filter((i) => i.group === groupName);
        return Array.from(
            new Map(byGroup.map(item => [item.subject, item])).values()
        );
    }, [scheduleData, groupName]);
    const dontInvertStyle = {
        filter: themeType ? 'invert(1)' : 'invert(0)',
    };
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
    return (
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
            <TodoListCounter
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

    );
}

export default TodoList;