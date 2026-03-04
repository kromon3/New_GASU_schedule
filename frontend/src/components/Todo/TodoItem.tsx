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
}) {
  return (
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
          <input
            type="checkbox"
            style={{
              width: '40px',
              height: '30px',
              borderRadius: '50%',
            }}
            checked={item.isDone}
            onChange={() => {
              setValue((prev) =>
                prev.map((v) => (v.id === item.id ? { ...v, isDone: !v.isDone } : v))
              );
            }}
          />
          <h1
            className={item.isDone ? 'text-content Done' : 'text-content NoDone'}
            style={{ marginRight: 20, color: 'white' }}
          >
            {item.text}
          </h1>
          <div className="button-group">
            {item.isDone ? (
              <div style={{ marginLeft: 21.44, color: 'white', fontSize: 30 }}>
                <strong>Выполнено</strong>
              </div>
            ) : (
              ''
            )}
            <button className={'btn delete-btn '} onClick={() => handleRemove(item.id)}>
              <img src="/free-icon-close-151882.png" alt="Удаление" style={{ width: 25 }} />
            </button>
            <button
              className={item.isDone ? 'btn edit-btn none' : 'btn edit-btn'}
              onClick={() => startEditing(item.id)}
            >
              <img
                src="/free-icon-edit-button-84380.png"
                alt="Редактирование"
                style={{ width: 25 }}
              />
            </button>
            <div>
              {item.lesson ? (
                <div className={item.isDone ? 'btn edit-btn none' : 'lesson'}>{item.lesson}</div>
              ) : (
                <select
                  className={item.isDone ? 'btn edit-btn none' : 'btn edit-btn'}
                  value={item.lesson || ''}
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
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
