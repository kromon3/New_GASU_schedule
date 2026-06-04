interface CRUDlessonProps {
    inpValueName: string;
    setInpValueName: (value: string) => void;
    inpValueGroup: string;
    setInpValueGroup: (value: string) => void;
    inpValueTeacher: string;
    setInpValueTeacher: (value: string) => void;
    inpValueType: string;
    setInpValueType: (value: string) => void;
    inpValueWeekType: string;
    setInpValueWeekType: (value: string) => void;
    inpValueAuditori: string;
    setInpValueAuditori: (value: string) => void;
    startTime: string;
    setStartTime: (value: string) => void;
    endTime: string;
    setEndTime: (value: string) => void;
    weekday: string;
    setWeekday: (value: string) => void;
}
function CRUDlesson({inpValueName,setInpValueName,
                        inpValueGroup,setInpValueGroup,
                        inpValueTeacher,setInpValueTeacher,
                        inpValueType,setInpValueType,
                        inpValueWeekType,setInpValueWeekType,
                        inpValueAuditori,setInpValueAuditori,
                        startTime,setStartTime,
                        endTime,setEndTime,
                        weekday,setWeekday,
                    }:CRUDlessonProps){
    return (
        <>
            <div>
                <h3 style={{color:'white'}}>Название предмета</h3>
                <input
                    className="search-input"
                    value={inpValueName}
                    onChange={(e) => setInpValueName(e.target.value)}
                    placeholder="Введите название предмета"
                />
            </div>

            <div>
                <h3 style={{color:'white'}}>Группа</h3>
                <input
                    className="search-input"
                    value={inpValueGroup}
                    onChange={(e) => setInpValueGroup(e.target.value)}
                    placeholder="Введите группу"
                />
            </div>

            <div>
                <h3 style={{color:'white'}}>Преподаватель</h3>
                <input
                    className="search-input"
                    value={inpValueTeacher}
                    onChange={(e) => setInpValueTeacher(e.target.value)}
                    placeholder="Введите преподавателя"
                />
            </div>

            <div>
                <h3 style={{color:'white'}}>Тип занятия</h3>
                <select
                    className="search-input"
                    value={inpValueType}
                    onChange={(e) => setInpValueType(e.target.value)}
                >
                    <option value="">Выберите тип</option>
                    <option value="Лекция">Лекция</option>
                    <option value="Практика">Практика</option>
                    <option value="Лабораторная">Лабораторная</option>
                </select>
            </div>

            <div>
                <h3 style={{color:'white'}}>Тип недели</h3>
                <select
                    className="search-input"
                    value={inpValueWeekType}
                    onChange={(e) => setInpValueWeekType(e.target.value)}
                >
                    <option value="">Выберите тип недели</option>
                    <option value="Четная">Четная</option>
                    <option value="НеЧетная">НеЧетная</option>
                    <option value="Обе">Обе</option>
                </select>
            </div>

            <div>
                <h3 style={{color:'white'}}>Аудитория</h3>
                <input
                    className="search-input"
                    value={inpValueAuditori}
                    onChange={(e) => setInpValueAuditori(e.target.value)}
                    placeholder="Введите аудиторию"
                />
            </div>

            <div>
                <h3 style={{color:'white'}}>Время начала</h3>
                <input
                    type="time"
                    className="search-input"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
            </div>

            <div>
                <h3 style={{color:'white'}}>Время окончания</h3>
                <input
                    type="time"
                    className="search-input"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                />
            </div>

            <div>
                <h3 style={{color:'white'}}>День недели</h3>
                <select
                    className="search-input"
                    value={weekday}
                    onChange={(e) => setWeekday(e.target.value)}
                >
                    <option value="Понедельник">Понедельник</option>
                    <option value="Вторник">Вторник</option>
                    <option value="Среда">Среда</option>
                    <option value="Четверг">Четверг</option>
                    <option value="Пятница">Пятница</option>
                    <option value="Суббота">Суббота</option>
                </select>
            </div>
        </>
    )
}
export default CRUDlesson;
