import '../../style/todolistcounter.css';
function TodolistCounter(props) {
  return (
    <>
      <div className="todolist-counter">
        <span>
          Готовые задачи <strong>{props.text}</strong>{' '}
        </span>
        <span>
          Все задачи <strong>{props.allValues}</strong>{' '}
        </span>
        <span>
          Осталось задач <strong className="highlight">{props.remainingValue}</strong>{' '}
        </span>
      </div>
    </>
  );
}

export default TodolistCounter;
