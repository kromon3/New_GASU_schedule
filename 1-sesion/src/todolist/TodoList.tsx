import React, {useEffect, useState} from "react";
import Header from "../Header/header.tsx";
import './todolist.css'

function TodoList() {
    interface  TodoItem
    {
    id: number,
    text: string,
    isDone: boolean,
    }
    const [value, setValue] = useState<TodoItem[]>(() => {
        const save = localStorage.getItem("base");
        return save ? JSON.parse(save) : [];
    });
    const [inpValue, setInpValue] = useState('');
    const [inpchangeValue, setInpchangeValue] = useState('');
    const [isSelected, setIsSelected] = useState<number | null>(null);
    const [number, setNumber] = useState<number>(0);
    useEffect(() => {
        localStorage.setItem("base", JSON.stringify(value));
    }, [value]);

    const handleAdd = () => {
        if (inpValue.trim()) {
            const newItem: TodoItem = {
                id: number,
                text: inpValue.trim(),
                isDone: false,
            }
            setValue(prev => [...prev, newItem]);
            setInpValue('');
            setNumber(p => p + 1);
        }
    };

    const handleRemove = (index: number) => {
        setValue(prev => prev.filter((_, i) => i !== index));
    };

    const handleChange = (index: number, newValue: string) => {
        if (newValue.trim()) {
            setValue(prev => {
                const newArray = [...prev];
                newArray[index] = {
                    ...newArray[index],
                    text: newValue.trim(),
                };
                return newArray;
            });
            setInpchangeValue('');
            setIsSelected(null);
        }
    };

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
    return (
        <>
            <Header />
            <div className="container">
                <div className="input-container">
                    <input
                        className="search-input"
                        value={inpValue}
                        onChange={(e) => setInpValue(e.target.value)}
                        placeholder="Введите задачу"
                        onKeyPress={(e) => e.key === 'Enter' && handleAdd()} // добавлена возможность Enter
                    />
                    <button className="btn" onClick={handleAdd}>Добавить</button>
                </div>

                <div className="main">
                    {value.map((item) => (
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
                                    <h1 className = {item.isDone ? ("text-content Done"): ("text-content NoDone")}>{item.text}</h1>
                                    <div className="button-group">
                                        <button className={item.isDone ? "btn delete-btn none" : "btn delete-btn "} onClick={() => handleRemove(item.id)}>
                                            Удалить
                                        </button>
                                        <button className={item.isDone ? "btn edit-btn none" : "btn edit-btn"} onClick={() => startEditing(item.id)}>
                                            Изменить
                                        </button>
                                        {
                                            item.isDone ? (
                                                <h1 style={{ marginLeft: 21.44 }}>Выполнено</h1>
                                            ) : ""
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default TodoList;