import {useState, useMemo, useCallback, useContext} from "react";
import Header from "../../components/Header/Header.tsx";
import '../../style/todolist.css'
import TodoListCounter from "../../components/Todo/TodoListCounter.tsx";
import type {Todo} from '../../type/todo.ts'
import {useLocalStorage} from "../../hooks/useLocalStorage.ts";
import {useTodo} from "../../hooks/useTodo.ts";
import {useFetch} from "../../hooks/useFetch.ts";
import {ThemeContext} from "../../contexts/Background.tsx";
import FetchError from "../../components/Error/FetchError.tsx";
import {useStore} from "../../../store/useTestStore.ts";
import TodoItem from "../../components/Todo/TodoItem.tsx";
function TodoList() {
    const { groupName} = useStore()
    const [value, setValue] = useLocalStorage('base', []);
    const [DoneValuse, setDoneValuse] = useState([]);
    const [stateIsDone, setStateIsDone] = useState<'all' | 'active' | 'completed'>('all');
    const [optinShow, setOptinShow] = useState<boolean>(false);
    const {inpValue, setInpValue, inpchangeValue, setInpchangeValue, isSelected, handleAdd, handleRemove, handleChange, startEditing, cancelEditing,} = useTodo(value, setValue);
    const filteredTasks = useMemo(() => {
        if(stateIsDone === 'active') {
            return value.filter(item => !item.isDone);
        }
        if(stateIsDone === 'completed') {
            return value.filter(item => item.isDone);
        }
        return value;
    }, [value, stateIsDone]); // memo для фильтра задач чтобы было круче
    const { isDoneValue, allValues, remainingValue } = useMemo(() => {
        const doneCount = value.filter(item => item.isDone).length;
        const total = value.length;
        return {
            isDoneValue: doneCount,
            allValues: total,
            remainingValue: total - doneCount,
        };
    }, [value]);//Мониторинг данных
    const { data: scheduleData ,loading,error} = useFetch('http://localhost:8000/lessons');
    const handleLessonChange = useCallback((taskId: number, lesson: string) => {
        setValue(prev =>
            prev.map(item =>
                item.id === taskId ? { ...item, lesson } : item
            )
        );
    }, [setValue]);
    const { themeType } = useContext(ThemeContext);
    const filteredArray = useMemo(() => {
        const byGroup = scheduleData.filter((i) => i.group === groupName);
        return Array.from(
            new Map(byGroup.map(item => [item.subject, item])).values()
        );
    }, [scheduleData, groupName]);
    const dontInvertStyle = {
        filter: themeType ? 'invert(1)' : 'invert(0)',
    };
    const moveBackFromDone = (taskId) => {
        const taskToMoveBack = DoneValuse.find(t => t.id === taskId);

        if (taskToMoveBack) {
            setValue(prev => [...prev, { ...taskToMoveBack, isDone: false }]);
            setDoneValuse(prev => prev.filter(t => t.id !== taskId));
        }
    };
    if(loading){
        return (
            <>
                <Header />
                <div className="loading">
                    <img
                        src="/icons8-значок-загрузки-iphone.gif"
                        alt="loading"
                        style={{ width: '50px', height: '50px' }}
                    />
                </div>
            </>
        )
    }
    if(error){
        <>

            <Header />
            <FetchError
                error={error}
                loading={loading}
            />
        </>
    }
    return (
            <div className="schedule-background"
                 style={{
                     filter: themeType ? 'invert(1)' : 'invert(0)',
                     transition: 'filter 0.5s ease-in-out'
                 }}
            >
                <div style={dontInvertStyle}>
                    <Header />
                </div>
                <div style={dontInvertStyle}>
            <TodoListCounter
                text={isDoneValue}
                allValues={allValues}
                remainingValue={remainingValue}
            /></div>
            <div className="container">
                <div className="input-and-button">
                    <div className="input-container">
                        <input
                            className="search-input"
                            value={inpValue}
                            onChange={(e) => setInpValue(e.target.value)}
                            placeholder="Введите задачу"
                        />
                    </div>
                    <button className="btn" onClick={() => handleAdd(inpValue, '')}>
                        Добавить
                    </button>
                    <button className="btn" onClick={()=>setOptinShow(!optinShow)}>
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                </div>
                {
                    optinShow ? (
                        <div className="input-and-button">
                            <button className="btn" onClick={()=>setStateIsDone('active')}>активные</button>
                            <button className="btn" onClick={() => setStateIsDone('completed')}>выполненные</button>
                            <button className="btn" onClick={()=>setStateIsDone('all')}>все</button>
                        </div>) : ('')
                }
                <div className="main">
                    {
                        filteredTasks.length===0 ? (
                            <h1>Введите задачу</h1>
                        ) : (
                                    filteredTasks.map((item) => (
                                        <TodoItem
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
                                            filteredTasks={filteredTasks}
                                            setDoneValuse={setDoneValuse}
                                        />
                                    )
                                    )
                        )
                    }
                </div>
            </div>
                <div>
                      <div>
                          {
                              DoneValuse.map((item ) => (
                                  <TodoItem
                                      item={item}
                                      isSelected={isSelected}
                                      inpchangeValue={inpchangeValue}
                                      setInpchangeValue={setInpchangeValue}
                                      handleChange={(id, value) => {
                                          setDoneValuse(prev => prev.map(v =>
                                              v.id === id ? { ...v, text: value } : v
                                          ));
                                      }}
                                      cancelEditing={cancelEditing}
                                      setValue={setValue}
                                      handleRemove={(id) => {
                                          setDoneValuse(prev => prev.filter(v => v.id !== id));
                                      }}
                                      startEditing={startEditing}
                                      filteredArray={filteredArray}
                                      handleLessonChange={(id, lesson) => {
                                          setDoneValuse(prev => prev.map(v =>
                                              v.id === id ? { ...v, lesson } : v
                                          ));
                                      }}
                                      moveBack={moveBackFromDone}
                                  />
                              ))
                          }
                      </div>
                </div>

            </div>

    );
}

export default TodoList;