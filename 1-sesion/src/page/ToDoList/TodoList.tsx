import { useState, useMemo, useCallback, useContext, useEffect } from 'react';
import Header from '../../components/Header/header.tsx';
import '../../style/todolist.css';
import TodolistCounter from '../../components/Todo/TodolistCounter.tsx';
import { ItemPortal } from '../../contexts/GrupName.tsx';
import type { TodoItem } from '../../service/TodoItem.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { useTodo } from '../../hooks/useTodo.ts';
import { ThemeContext } from '../../contexts/Background.tsx';
import TodoItem from '../../components/Todo/TodoItem.tsx';
import TodoInput from '../../components/Todo/TodoInput.tsx';
import TodoButtonShow from '../../components/Todo/TodoButtonShow.tsx';
function TodoList() {
  const { grupName } = useContext(ItemPortal);
  const [value, setValue] = useLocalStorage('base', []);
  const [stateIsDone, setStateIsDone] = useState<'all' | 'active' | 'completed'>('all');
  const [optinShow, setOptinShow] = useState<boolean>(false);

  const {
    inpValue,
    setInpValue,
    inpchangeValue,
    setInpchangeValue,
    isSelected,
    handleAdd,
    handleRemove,
    handleChange,
    startEditing,
    cancelEditing,
  } = useTodo(value, setValue);

  const filteredTasks = useMemo(() => {
    if (stateIsDone === 'active') {
      return value.filter((item) => !item.isDone);
    }
    if (stateIsDone === 'completed') {
      return value.filter((item) => item.isDone);
    }
    return value;
  }, [value, stateIsDone]);

  const { isDoneValue, allValues, remainingValue } = useMemo(() => {
    const doneCount = value.filter((item) => item.isDone).length;
    const total = value.length;
    return {
      isDoneValue: doneCount,
      allValues: total,
      remainingValue: total - doneCount,
    };
  }, [value]);

  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/lessons')
      .then((res) => res.json())
      .then((data) => setScheduleData(data));
  }, []);

  const handleLessonChange = useCallback(
    (taskId: number, lesson: string) => {
      setValue((prev) => prev.map((item) => (item.id === taskId ? { ...item, lesson } : item)));
    },
    [setValue]
  );

  const { themeType } = useContext(ThemeContext);

  const filteredArray = useMemo(() => {
    const byGroup = scheduleData.filter((i) => i.group === grupName);
    return Array.from(new Map(byGroup.map((item) => [item.subject, item])).values());
  }, [scheduleData, grupName]);

  const dontInvertStyle = {
    filter: themeType ? 'invert(1)' : 'invert(0)',
  };

  return (
    <>
      <div
        className="schedule-background"
        style={{
          filter: themeType ? 'invert(1)' : 'invert(0)',
          transition: 'filter 0.5s ease-in-out',
        }}
      >
        <div style={dontInvertStyle}>
          <Header />
        </div>

        <div style={dontInvertStyle}>
          <TodolistCounter
            text={isDoneValue}
            allValues={allValues}
            remainingValue={remainingValue}
          />
        </div>

        <div className="container">
          <div className="input-and-button">
            <TodoInput
              inpValue={inpValue}
              setInpValue={setInpValue}
              handleAdd={handleAdd}
              setOptinShow={setOptinShow}
              optinShow={optinShow}
            />
          </div>

          {optinShow && (
            <TodoButtonShow stateIsDone={stateIsDone} setStateIsDone={setStateIsDone} />
          )}

          <div className="main">
            {filteredTasks.length === 0 ? (
              <h1>Введите задачу</h1>
            ) : (
              filteredTasks.map((item) => (
                <TodoItem
                  key={item.id}
                  item={item}
                  isSelected={isSelected}
                  inpchangeValue={inpchangeValue}
                  setInpchangeValue={setInpchangeValue}
                  handleChange={handleChange}
                  cancelEditing={cancelEditing}
                  setValue={setValue}
                  handleRemove={handleRemove}
                  startEditing={startEditing}
                  filteredArray={filteredArray}
                  handleLessonChange={handleLessonChange}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;
