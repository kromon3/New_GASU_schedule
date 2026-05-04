import {useMemo, useCallback} from "react";
import Header from "../../components/Header/Header";
import '../../style/todolist.css'
import type {Todo} from '../../type/todo'
import type {Lesson} from "../../type/lesson";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import {useTodo} from "../../hooks/useTodo";
import {useFetch} from "../../hooks/useFetch";
import FetchError from "../../components/Error/FetchError";
import {useStore} from "../../../store/useTestStore";
import TodoItem from "../../components/Todo/TodoItem";
import {useTheme} from "../../../store/useTheme";

const TodoList: React.FC = () => {
    const { groupName} = useStore()
    const [value, setValue] = useLocalStorage('base', []);

    const tasks:Todo[] = useMemo(() => value.filter(t => t.status === 'tasks'), [value]);
    const processValuse:Todo[] = useMemo(() => value.filter(t => t.status === 'process'), [value]);
    const DoneValuse:Todo[] = useMemo(() => value.filter(t => t.status === 'done'), [value]);

    const {inpValue, setInpValue, inpchangeValue, setInpchangeValue, isSelected, handleAdd, handleRemove, handleChange, startEditing, cancelEditing,} = useTodo(value, setValue);

    const { data: scheduleData ,loading,error} = useFetch<Lesson[]>('http://localhost:8000/lessons');

    const handleLessonChange = useCallback((taskId: string, lesson: string) => {
        setValue(prev =>
            prev.map(item =>
                item.id === taskId ? { ...item, lesson } : item
            )
        );
    }, [setValue]);
    const  themeType =  useTheme((s) => s.theme)
    const filteredArray: Lesson[] = useMemo(() => {
        const byGroup: Lesson[] = scheduleData?.filter((i:Lesson) => i.group === groupName) || [];
        const uniqueLessons = new Map<string, Lesson>();
        byGroup.forEach(item => uniqueLessons.set(item.subject, item));
        return Array.from(uniqueLessons.values());
    }, [scheduleData, groupName]);
    const switchStatus = useCallback((taskId: string, newStatus: string) => {
        const status:string = newStatus.trim();
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
                                    handleRemove={handleRemove}
                                    startEditing={startEditing}
                                    filteredArray={filteredArray}
                                    handleLessonChange={handleLessonChange}
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
                            processValuse.map((item:Todo) => (
                                <TodoItem
                                    key={item.id}
                                    item={item}
                                    isSelected={isSelected}
                                    inpchangeValue={inpchangeValue}
                                    setInpchangeValue={setInpchangeValue}
                                    handleChange={(id: string, value: string) => {
                                        setValue(prev => prev.map(v =>
                                            v.id === id ? { ...v, text: value } : v
                                        ));
                                    }}
                                    cancelEditing={cancelEditing}
                                    handleRemove={(id: string) => {
                                        setValue(prev => prev.filter(v => v.id !== id));
                                    }}
                                    startEditing={startEditing}
                                    filteredArray={filteredArray}
                                    handleLessonChange={(id: string, lesson: string) => {
                                        setValue(prev => prev.map(v =>
                                            v.id === id ? { ...v, lesson } : v
                                        ));
                                    }}
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
                            DoneValuse.map((item:Todo) => (
                                <TodoItem
                                    key={item.id}
                                    item={item}
                                    isSelected={isSelected}
                                    inpchangeValue={inpchangeValue}
                                    setInpchangeValue={setInpchangeValue}
                                    handleChange={(id: string, value: string) => {
                                        setValue(prev => prev.map(v =>
                                            v.id === id ? { ...v, text: value } : v
                                        ));
                                    }}
                                    cancelEditing={cancelEditing}
                                    handleRemove={(id: string) => {
                                        setValue(prev => prev.filter(v => v.id !== id));
                                    }}
                                    startEditing={startEditing}
                                    filteredArray={filteredArray}
                                    handleLessonChange={(id: string, lesson: string) => {
                                        setValue(prev => prev.map(v =>
                                            v.id === id ? { ...v, lesson } : v
                                        ));
                                    }}
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