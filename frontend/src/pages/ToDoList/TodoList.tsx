import {useMemo, useCallback} from "react";
import Header from "../../components/Header/Header.tsx";
import '../../style/todolist.css'
import TodoListCounter from "../../components/Todo/TodoListCounter.tsx";
import type {Todo} from '../../type/todo.ts'
import {useLocalStorage} from "../../hooks/useLocalStorage.ts";
import {useTodo} from "../../hooks/useTodo.ts";
import {useFetch} from "../../hooks/useFetch.ts";
import FetchError from "../../components/Error/FetchError.tsx";
import {useStore} from "../../../store/useTestStore.ts";
import TodoItem from "../../components/Todo/TodoItem.tsx";
import {useTheme} from "../../../store/useTheme.ts";
function TodoList() {
    const { groupName} = useStore()
    const [value, setValue] = useLocalStorage('base', []);

    const tasks = useMemo(() => value.filter(t => t.status === 'tasks'), [value]);
    const processValuse = useMemo(() => value.filter(t => t.status === 'process'), [value]);
    const DoneValuse = useMemo(() => value.filter(t => t.status === 'done'), [value]);

    const {inpValue, setInpValue, inpchangeValue, setInpchangeValue, isSelected, handleAdd, handleRemove, handleChange, startEditing, cancelEditing,} = useTodo(value, setValue);
    const { isDoneValue, allValues, remainingValue } = useMemo(() => {
        const doneCount = value.filter(item => item.isDone).length;
        const total = value.length;
        return {
            isDoneValue: doneCount,
            allValues: total,
            remainingValue: total - doneCount,
        };
    }, [value,DoneValuse]);
    const { data: scheduleData ,loading,error} = useFetch('http://localhost:8000/lessons');
    const handleLessonChange = useCallback((taskId: number, lesson: string) => {
        setValue(prev =>
            prev.map(item =>
                item.id === taskId ? { ...item, lesson } : item
            )
        );
    }, [setValue]);
    const  themeType =  useTheme((s) => s.theme)
    const filteredArray = useMemo(() => {
        const byGroup = scheduleData.filter((i) => i.group === groupName);
        return Array.from(
            new Map(byGroup.map(item => [item.subject, item])).values()
        );
    }, [scheduleData, groupName]);
    const switchStatus = useCallback((taskId: number, newStatus: string) => {
        const status = newStatus.trim();
        if (!status) return;

        setValue(prev => prev.map(item =>
            item.id === taskId
                ? { ...item, status, isDone: status === 'done' }
                : item
        ));
    }, [setValue]);
    const dontInvertStyle = {
        filter: themeType==='dark'  ? 'invert(1)' : 'invert(0)',
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
        return (
                <>
                    <Header />
                    <FetchError
                        error={error}
                        loading={loading}
                    />
                </>
            )

    }
    return (
        <div className="schedule-background"
             style={{
                 filter: themeType==='dark' ? 'invert(1)' : 'invert(0)',
                 transition: 'filter 0.5s ease-in-out'
             }}
        >
            <div style={dontInvertStyle}>
                <Header />
            </div>
            {themeType}

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
                </div>
            </div>

            <div className="kanban-board" style={{
                justifyContent: 'center'}}>

                <div className="kanban-column">
                    <div className="kanban-column__header">
                        <h2 className="kanban-column__title">Задачи</h2>
                    </div>
                    <div className="kanban-list">
                        {tasks.length === 0 ? (
                            <div className="kanban-empty">Добавьте первую задачу </div>
                        ) : (
                            tasks.map((item) => (
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
                                    setDoneValuse={setValue}
                                    onStatusChange={switchStatus}
                                    currentStatus="tasks"
                                />
                            ))
                        )}
                    </div>
                </div>
                <div className="kanban-column">
                    <div className="kanban-column__header">
                        <h2 className="kanban-column__title">В процессе</h2>
                    </div>
                    <div className="kanban-list">
                        {processValuse.length === 0 ? (
                            <div className="kanban-empty">Добавьте первую задачу </div>
                        ) : (
                            processValuse.map((item) => (
                                <TodoItem
                                    key={item.id}
                                    item={item}
                                    isSelected={isSelected}
                                    inpchangeValue={inpchangeValue}
                                    setInpchangeValue={setInpchangeValue}
                                    handleChange={(id, value) => {
                                        setValue(prev => prev.map(v =>
                                            v.id === id ? { ...v, text: value } : v
                                        ));
                                    }}
                                    cancelEditing={cancelEditing}
                                    setValue={setValue}
                                    handleRemove={(id) => {
                                        setValue(prev => prev.filter(v => v.id !== id));
                                    }}
                                    startEditing={startEditing}
                                    filteredArray={filteredArray}
                                    handleLessonChange={(id, lesson) => {
                                        setValue(prev => prev.map(v =>
                                            v.id === id ? { ...v, lesson } : v
                                        ));
                                    }}
                                    setDoneValuse={setValue}
                                    onStatusChange={switchStatus}
                                    currentStatus="process"
                                />
                            ))
                        )}
                    </div>
                </div>
                <div className="kanban-column">
                    <div className="kanban-column__header">
                        <h2 className="kanban-column__title"> Выполнено</h2>
                    </div>
                    <div className="kanban-list">
                        {DoneValuse.length === 0 ? (
                            <div className="kanban-empty">Задачи появятся здесь </div>
                        ) : (
                            DoneValuse.map((item) => (
                                <TodoItem
                                    key={item.id}
                                    item={item}
                                    isSelected={isSelected}
                                    inpchangeValue={inpchangeValue}
                                    setInpchangeValue={setInpchangeValue}
                                    handleChange={(id, value) => {
                                        setValue(prev => prev.map(v =>
                                            v.id === id ? { ...v, text: value } : v
                                        ));
                                    }}
                                    cancelEditing={cancelEditing}
                                    setValue={setValue}
                                    handleRemove={(id) => {
                                        setValue(prev => prev.filter(v => v.id !== id));
                                    }}
                                    startEditing={startEditing}
                                    filteredArray={filteredArray}
                                    handleLessonChange={(id, lesson) => {
                                        setValue(prev => prev.map(v =>
                                            v.id === id ? { ...v, lesson } : v
                                        ));
                                    }}
                                    setDoneValuse={setValue}
                                    onStatusChange={switchStatus}
                                    currentStatus="done"
                                />
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default TodoList;