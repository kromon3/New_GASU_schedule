import TodoSelectSubject from "./TodoSelectSubject.tsx";
import type {Todo} from "../../type/todo.ts";
import type {Lesson} from "../../type/lesson.ts";
type TaskStatus = 'tasks' | 'process' | 'done';

interface TodoItemProps {
    item: Todo;
    isSelected: number | string | null;
    inpchangeValue: string;
    setInpchangeValue: (value: string) => void;
    handleChange: (id: string, newText: string) => void;
    cancelEditing: () => void;
    handleRemove: (id: string) => void;
    startEditing: (id: string) => void;
    filteredArray: Lesson[];
    handleLessonChange: (itemId: string, lesson: string) => void;
    onStatusChange: (id: string, newStatus: TaskStatus) => void;
    currentStatus: TaskStatus;
}

function TodoItem({
                      item,
                      isSelected,
                      inpchangeValue,
                      setInpchangeValue,
                      handleChange,
                      cancelEditing,
                      handleRemove,
                      startEditing,
                      filteredArray,
                      handleLessonChange,
                      onStatusChange,
                      currentStatus,
                  }: TodoItemProps) {

    const handleCheckboxChange = () => {
        if (!onStatusChange) return;

        const nextStatus: Record<TaskStatus, TaskStatus> = {
            'tasks': 'process',
            'process': 'done',
            'done': 'process'
        };

        onStatusChange(item.id, nextStatus[currentStatus]);
    };
    const moveToTasks = () => {
        if (currentStatus === 'process' && onStatusChange) {
            onStatusChange(item.id, 'tasks');
        }
    };
    const moveToProces = () => {
        if (currentStatus === 'done' && onStatusChange) {
            onStatusChange(item.id, 'process');
        }
    };
    return (
        <div className="todo-item">
            {item.id === isSelected ? (
                <div>
                    <div className="item editing">
                        <input
                            className="search-input edit-input"
                            value={inpchangeValue}
                            onChange={(e) => setInpchangeValue(e.target.value)}
                            placeholder="Редактировать задачу"
                            autoFocus
                        />
                        <div className="button-group">

                            <button
                                className="btn save-btn"
                                onClick={() => {
                                    handleChange(item.id, inpchangeValue);
                                    cancelEditing();
                                }}
                            >
                                Сохранить
                            </button>
                            <button className="btn cancel-btn" onClick={cancelEditing}>
                                Отмена
                            </button>
                        </div>
                    </div>
                    <div>
                        <TodoSelectSubject
                            item={item}
                            handleLessonChange={handleLessonChange}
                            filteredArray={filteredArray}
                        />
                    </div>
                </div>
            ) : (
                <div className="item">

                    {currentStatus === 'process' && (
                        <button className="btn back-btn" onClick={moveToTasks} title="Вернуть в Задачи">
                            <img src="/arrow_back_24dp_000_FILL0_wght400_GRAD0_opsz24.png" alt=""/>
                        </button>
                    )}
                    {item.isDone && (<button className="btn back-btn" onClick={moveToProces} title="Вернуть в Задачи">
                        <img src="/arrow_back_24dp_000_FILL0_wght400_GRAD0_opsz24.png" alt=""/>
                    </button>)}
                    <h1
                        className={item.isDone ? "text-content Done" : "text-content NoDone"}
                        style={{ marginRight: 20, color: 'white' }}
                    >
                       <div style={{
                           maxWidth: '10ch',
                           whiteSpace: 'nowrap',
                           overflow: 'hidden',
                           textOverflow: 'ellipsis'
                       }} title={item.text}>{item.text}</div>
                    </h1>
                    <div className="button-group">

                        {item.isDone && (
                            <div>
                                <div style={{ marginLeft: 21.44, color: 'white', fontSize: 30,textDecoration: 'line-through' }}>
                                    <strong>Выполнено</strong>

                                </div>
                            </div>

                        )}
                        <button
                            className="btn delete-btn"
                            onClick={() => handleRemove(item.id)}
                        >
                            <img src="/free-icon-close-151882.png" alt="Удаление" style={{ width: 25 }}/>
                        </button>
                        <button
                            className={item.isDone ? "btn edit-btn none" : "btn edit-btn"}
                            onClick={() => startEditing(item.id)}
                        >
                            <img src="/free-icon-edit-button-84380.png" alt="Редактирование" style={{ width: 25 }}/>
                        </button>

                        <div>
                            {item.lesson ? (
                                <div>
                                    <div className={item.isDone ? "btn edit-btn none" : "lesson"}>
                                        {item.lesson}
                                    </div>

                                </div>


                            ) : (
                                <TodoSelectSubject
                                    item={item}
                                    handleLessonChange={handleLessonChange}
                                    filteredArray={filteredArray}
                                />
                            )}
                        </div>
                        {!item.isDone ? <>
                                <button onClick={handleCheckboxChange} className="btn back-btn">
                            <img src="/arrow_forward_24dp_000_FILL0_wght400_GRAD0_opsz24.png" alt=""/>
                        </button>

                        </>
                        :

                        <></>}

                    </div>
                </div>
            )}
        </div>
    );
}

export default TodoItem;