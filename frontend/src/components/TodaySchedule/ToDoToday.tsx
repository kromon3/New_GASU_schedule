import type { Todo } from "../../type/todo.ts";
import type { Dispatch, SetStateAction } from 'react';

interface Props {
    day: Todo;
    setValue: Dispatch<SetStateAction<Todo[]>>;
    handleRemove: (id: string) => void;
}

function ToDoToday({ day, setValue, handleRemove }: Props) {
    const handleToggleComplete = () => {
        setValue((prev: Todo[]): Todo[] =>
            prev.map((v: Todo): Todo =>
                v.id === day.id ? { ...v, isDone: !v.isDone } : v
            )
        );
    };

    return (
        <div className="item">
            <input
                type="checkbox"
                checked={day.isDone}
                onChange={handleToggleComplete}
            />
            <h1
                className={day.isDone ? 'text-content Done' : 'text-content NoDone'}
                style={{ marginRight: 20 }}
            >
                {day.text}
            </h1>
            <div className="button-group">
                {day.isDone && <h1 style={{ marginLeft: 21.44 }}>Выполнено</h1>}
                <button className="btn delete-btn">
                    <img
                        src="/free-icon-close-151882.png"
                        alt="Удаление"
                        style={{ width: 25 }}
                        onClick={() => handleRemove(day.id)}
                    />
                </button>
            </div>
        </div>
    );
}

export default ToDoToday;