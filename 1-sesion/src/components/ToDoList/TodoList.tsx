import {useEffect, useState, useMemo, useCallback, useContext} from "react";
import Header from "../Header/header.tsx";
import './todolist.css'
import TodolistCounter from "./todolist_counter.tsx";
import {ItemPortal} from "../../contexts/GrupName.tsx";
import { scheduleData } from '../../service/db.ts'
import type {TodoItem} from '../../service/TodoItem.ts'
function TodoList() {

    const { grupName } = useContext(ItemPortal);
    const [value, setValue] = useState<TodoItem[]>(() => {
        const save = localStorage.getItem("base");
        return save ? JSON.parse(save) : [];
    }); // получение заданий или создание если нет в localstor
    const [inpValue, setInpValue] = useState('');
    const [inpchangeValue, setInpchangeValue] = useState('');
    const [isSelected, setIsSelected] = useState<number | null>(null);
    const [stateIsDone, setStateIsDone] = useState<'all' | 'active' | 'completed'>('all');
    const [optinShow, setOptinShow] = useState<boolean>(false);

    const filteredTasks = useMemo(() => {
        if(stateIsDone === 'active') {
            return value.filter(item => !item.isDone);
        }
        if(stateIsDone === 'completed') {
            return value.filter(item => item.isDone);
        }
        return value;
    }, [value, stateIsDone]); // memo для фильтра задач чтобы было круче

    useEffect(() => {
        localStorage.setItem("base", JSON.stringify(value));
    }, [value]); //сохранение в localStorage

    const handleAdd = useCallback(() => {
        if (inpValue.trim()) {
            const newItem: TodoItem = {
                id: Date.now(),
                text: inpValue.trim(),
                isDone: false,
            }
            setValue(prev => [...prev, newItem]);
            setInpValue('');
        }
    },[setValue,inpValue]); //добавление элемента

    const handleRemove = useCallback((id: number) => {
        setValue(prev => prev.filter(item => item.id !== id));
    },[setValue]); // удаление элемента

    const handleChange = useCallback((id: number, newValue: string) => {
        if (newValue.trim()) {
            setValue(prev =>
                prev.map(item =>
                    item.id === id ? { ...item, text: newValue.trim() } : item
                )
            );
            setInpchangeValue('');
            setIsSelected(null);
        }
    },[setValue]); // изменение элемента

    const startEditing = useCallback((id: number) => {
        const itemToEdit = value.find(item => item.id === id);
        if (itemToEdit) {
            setIsSelected(id);
            setInpchangeValue(itemToEdit.text);
        }
    }, [value]); // начало изменения

    const cancelEditing = useCallback(() => {
        setIsSelected(null);
        setInpchangeValue('');
    },[]);//отмена изменения

    const { isDoneValue, allValues, remainingValue } = useMemo(() => {
        const doneCount = value.filter(item => item.isDone).length;
        const total = value.length;
        return {
            isDoneValue: doneCount,
            allValues: total,
            remainingValue: total - doneCount,
        };
    }, [value]);//Мониторинг данных

    const handleLessonChange = useCallback((taskId: number, lesson: string) => {
        setValue(prev =>
            prev.map(item =>
                item.id === taskId ? { ...item, lesson } : item
            )
        );
    }, [setValue]);

    const filteredArray = useMemo(() => scheduleData.filter((i) => i.group === grupName), [grupName]);
    return (
        <>
            <Header />
            <TodolistCounter
                text={isDoneValue}
                allValues={allValues}
                remainingValue={remainingValue}
            />
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
                    <button className="btn" onClick={handleAdd}>Добавить</button>
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
                                                <input type="checkbox" checked={item.isDone} onChange={() => {
                                                    setValue(prev =>
                                                        prev.map(v =>
                                                            v.id === item.id ? { ...v, isDone: !v.isDone } : v
                                                        )
                                                    );
                                                }}/>
                                                <h1 className = {item.isDone ? ("text-content Done"): ("text-content NoDone")} style={{marginRight: 20}}>{item.text}</h1>
                                                <div className="button-group">
                                                    {
                                                        item.isDone ? (
                                                            <h1 style={{ marginLeft: 21.44 }}>Выполнено</h1>
                                                        ) : ""
                                                    }
                                                    <button className={"btn delete-btn "} onClick={() => handleRemove(item.id)}>
                                                        <img src="/free-icon-close-151882.png" alt="Удаление" style={{ width:25   }}/>
                                                    </button>
                                                    <button className={item.isDone ? "btn edit-btn none" : "btn edit-btn"} onClick={() => startEditing(item.id)}>
                                                        <img src="/free-icon-edit-button-84380.png" alt="Редактирование" style={{ width:25  }}/>
                                                    </button>
                                                    {
                                                        item.lesson ? (
                                                            <div className="lesson">{item.lesson}</div>
                                                        ) : (
                                                            <select className={item.isDone ? "btn edit-btn none" : "btn edit-btn"} value={item.lesson || ""}
                                                                onChange={(e) => handleLessonChange(item.id, e.target.value)}
                                                            >
                                                                <option value="">— Предмет —</option>
                                                                {filteredArray.map((subjectItem) => (
                                                                    <option key={subjectItem.subject} value={subjectItem.subject}>
                                                                        {subjectItem.subject}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default TodoList;