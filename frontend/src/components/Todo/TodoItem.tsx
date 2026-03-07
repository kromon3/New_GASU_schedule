import TodoSelectSubject from "./TodoSelectSubject.tsx";


function TodoItem({
                      item,
                      isSelected,
                      inpchangeValue,
                      setInpchangeValue,
                      handleChange,
                      cancelEditing,
                      setValue,
                      handleRemove,
                      startEditing,
                      filteredArray,
                      handleLessonChange,
                      setDoneValuse
                  }) {


    const toggleDone = () => {

        setDoneValuse(prev => [...prev, { ...item, isDone: !item.isDone }]);

        setValue(prev => prev.filter(t => t.id !== item.id));
    };
    const backtoggleDone = () => {

        setValue(prev => [...prev, { ...item, isDone: !item.isDone }]);

        setDoneValuse(prev => prev.filter(t => t.id !== item.id));
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
                                onClick={() => handleChange(item.id, inpchangeValue)}
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
                    <input
                        type="checkbox"
                        style={{
                            width: '40px',
                            height: '30px',
                            borderRadius: '50%',
                        }}
                        checked={item.isDone}
                        onChange={item.isDone ? backtoggleDone : toggleDone}
                    />
                    <h1
                        className={item.isDone ? "text-content Done" : "text-content NoDone"}
                        style={{ marginRight: 20, color: 'white' }}
                    >
                        {item.text}
                    </h1>
                    <div className="button-group">
                        {item.isDone && (
                            <div style={{ marginLeft: 21.44, color: 'white', fontSize: 30,textDecoration: 'line-through' }}>
                                <strong>Выполнено</strong>
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
                                <div className={item.isDone ? "btn edit-btn none" : "lesson"}>
                                    {item.lesson}
                                </div>
                            ) : (
                                <TodoSelectSubject
                                    item={item}
                                    handleLessonChange={handleLessonChange}
                                    filteredArray={filteredArray}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TodoItem;