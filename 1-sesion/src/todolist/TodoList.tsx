import React, {useEffect, useState,useMemo} from "react";
import Header from "../Header/header.tsx";
import './todolist.css'
import TodolistCounter from "./todolist_counter.tsx";
function TodoList() {
    interface  TodoItem
    {
    id: number,
    text: string,
    isDone: boolean,
    lesson?: string,
    }
    const [value, setValue] = useState<TodoItem[]>(() => {
        const save = localStorage.getItem("base");
        return save ? JSON.parse(save) : [];
    }); // получение заданий или создание если нету в localstor
    const [inpValue, setInpValue] = useState('');
    const [inpchangeValue, setInpchangeValue] = useState('');
    const [isSelected, setIsSelected] = useState<number | null>(null);
    const [stateIsDone, setStateIsDone] = useState<'all' | 'active' | 'completed'>('all');
    const [optinShown, setOptinShown] = useState<boolean>(false);

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

    const handleAdd = () => {
        if (inpValue.trim()) {
            const newItem: TodoItem = {
                id: Date.now(),
                text: inpValue.trim(),
                isDone: false,
            }
            setValue(prev => [...prev, newItem]);
            setInpValue('');
        }
    }; //добавление элемента

    const handleRemove = (id: number) => {
        setValue(prev => prev.filter(item => item.id !== id));
    }; // удаление элемента

    const handleChange = (id: number, newValue: string) => {
        if (newValue.trim()) {
            setValue(prev =>
                prev.map(item =>
                    item.id === id ? { ...item, text: newValue.trim() } : item
                )
            );
            setInpchangeValue('');
            setIsSelected(null);
        }
    }; // изменение элемента

    const startEditing = (id: number) => {
        const itemToEdit = value.find(item => item.id === id);
        if (itemToEdit) {
            setIsSelected(id);
            setInpchangeValue(itemToEdit.text);
        }
    };

    const cancelEditing = () => {
        setIsSelected(null);
        setInpchangeValue('');
    };
    const isDoneValue = value.filter(item => item.isDone).length;
    const allValues = value.length;
    const remainingValue = allValues - isDoneValue;
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
                            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                        />
                    </div>
                    <button className="btn" onClick={handleAdd}>Добавить</button>
                    <button className="btn" onClick={()=>setOptinShown(!optinShown)}>
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                </div>
                {
                optinShown ? (                <div className="input-and-button">
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
                                                    onKeyPress={(e) => e.key === 'Enter' && handleChange(item.id, inpchangeValue)}
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

                                                </div>
                                                <div className="lesson">{item.lesson}</div>
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