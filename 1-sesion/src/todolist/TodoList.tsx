import React from "react";
import Header from "../Header/header.tsx";

function TodoList() {
    const [value, setValue] = React.useState([]); // массив задач
    const [inpValue, setInpValue] = React.useState('');

    const handleAdd = () => {
        if (inpValue) {
            setValue(prev => [...prev, inpValue]);
            setInpValue('');
        }
    };

    return (
        <>
            <Header />
            <div>
                <input
                    value={inpValue}
                    onChange={(e) => setInpValue(e.target.value)}
                    placeholder="Введите задачу"
                />
                <button onClick={handleAdd}>Добавить</button>

                <button>Удалить</button>
            </div>
            <div>
                {value.map((item) => (
                    <div>
                        <h1>{item}</h1>
                    </div>
                ))}
            </div>
        </>
    );
}

export default TodoList;