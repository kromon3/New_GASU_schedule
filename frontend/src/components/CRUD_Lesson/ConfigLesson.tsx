interface ConfigLessonProps {
    inpValueGroup: string;
    setInpValueGroup: (value: string) => void;
    inpValueWeekType: string;
    setInpValueWeekType: (value: string) => void;
    weekday: string;
    setWeekday: (value: string) => void;
}
function ConfigLesson({
                        inpValueGroup,setInpValueGroup,
                        inpValueWeekType,setInpValueWeekType,
                        weekday,setWeekday,
                    }:ConfigLessonProps){
    return (
        <>


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
export default ConfigLesson;
