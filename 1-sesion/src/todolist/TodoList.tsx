import React, {useEffect, useState} from "react";
import Header from "../Header/header.tsx";
import './todolist.css'

function TodoList() {
    const [value, setValue] = useState<string[]>(() => {
        const save = localStorage.getItem("base");
        return save ? JSON.parse(save) : [];
    });
    const [inpValue, setInpValue] = useState('');
    const [inpchangeValue, setInpchangeValue] = useState('');
    const [isSelected, setIsSelected] = useState<number | null>(null);
    const [weather, setWeather] = useState<any>(null);

    useEffect(() => {
        localStorage.setItem("base", JSON.stringify(value));
    }, [value]);

    useEffect(() => {
        fetch(`https://api.weatherapi.com/v1/current.json?key=395ea47fa8a0431abea162221253112&q=Saint%20Petersburg`)
            .then(res => res.json())
            .then(data => setWeather(data))
            .catch(error => console.error("Error fetching weather:", error));
    }, []);

    const handleAdd = () => {
        if (inpValue.trim()) { // добавлен trim для проверки пустых строк
            setValue(prev => [...prev, inpValue.trim()]);
            setInpValue('');
        }
    };

    const handleRemove = (index: number) => {
        setValue(prev => prev.filter((_, i) => i !== index));
    };

    const handleChange = (index: number, newValue: string) => {
        if (newValue.trim()) {
            setValue(prev => {
                const newArray = [...prev];
                newArray[index] = newValue.trim();
                return newArray;
            });
            setInpchangeValue('');
            setIsSelected(null);
        }
    };

    const startEditing = (index: number) => {
        setIsSelected(index);
        setInpchangeValue(value[index]);
    };

    const cancelEditing = () => {
        setIsSelected(null);
        setInpchangeValue('');
    };

    return (
        <>
            <Header />

            {weather && weather.current && (
                <div className="weather-container">
                    <p>Погода в {weather.location.name}: {weather.current.temp_c}°C</p>
                    <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
                    <p>{weather.current.condition.text}</p>
                </div>
            )}

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
                    {value.map((item, index) => (
                        <div key={index} className="todo-item">
                            {index === isSelected ? (
                                <div className="item editing">
                                    <input
                                        className="search-input edit-input"
                                        value={inpchangeValue}
                                        onChange={(e) => setInpchangeValue(e.target.value)}
                                        placeholder="Редактировать задачу"
                                        autoFocus // автофокус при редактировании
                                        onKeyPress={(e) => e.key === 'Enter' && handleChange(index, inpchangeValue)}
                                    />
                                    <div className="button-group">
                                        <button className="btn save-btn" onClick={() => handleChange(index, inpchangeValue)}>
                                            Сохранить
                                        </button>
                                        <button className="btn cancel-btn" onClick={cancelEditing}>
                                            Отмена
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="item">
                                    <h1 className="text-content">{item}</h1>
                                    <div className="button-group">
                                        <button className="btn delete-btn" onClick={() => handleRemove(index)}>
                                            Удалить
                                        </button>
                                        <button className="btn edit-btn" onClick={() => startEditing(index)}>
                                            Изменить
                                        </button>
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