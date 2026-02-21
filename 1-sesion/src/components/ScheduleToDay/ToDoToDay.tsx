function ToDoToDay({day,setValue,handleRemove}){
    return (
        <div className="item" key={day.id}>
            <input
                type="checkbox"
                checked={day.isDone}
                onChange={() => {
                    setValue((prev) =>
                        prev.map((v) => (v.id === day.id ? { ...v, isDone: !v.isDone } : v))
                    );
                }}
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
    )
}
export default ToDoToDay;