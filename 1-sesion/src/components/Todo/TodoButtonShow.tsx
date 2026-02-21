interface TodoButtonShowProps {
  stateIsDone: 'all' | 'active' | 'completed';
  setStateIsDone: (filter: 'all' | 'active' | 'completed') => void;
}

function TodoButtonShow({ stateIsDone, setStateIsDone }: TodoButtonShowProps) {
  return (
    <div className="input-and-button">
      <button
        className={`btn ${stateIsDone === 'active' ? 'active' : ''}`}
        onClick={() => setStateIsDone('active')}
      >
        активные
      </button>
      <button
        className={`btn ${stateIsDone === 'completed' ? 'active' : ''}`}
        onClick={() => setStateIsDone('completed')}
      >
        выполненные
      </button>
      <button
        className={`btn ${stateIsDone === 'all' ? 'active' : ''}`}
        onClick={() => setStateIsDone('all')}
      >
        все
      </button>
    </div>
  );
}
export default TodoButtonShow;
