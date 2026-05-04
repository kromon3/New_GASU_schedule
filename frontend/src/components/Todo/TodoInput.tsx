interface TodoInputProps {
    inpValue: string;
    setInpValue: (value: string) => void;
    handleAdd: (title: string, description: string) => void;
    setOptinShow: (value: boolean) => void;
    optinShow: boolean;
}

function TodoInput({ inpValue, setInpValue, handleAdd, setOptinShow, optinShow }: TodoInputProps) {
    return (
        <div className="input-and-button">
            <div className="input-container">
                <input
                    className="search-input"
                    value={inpValue}
                    onChange={(e) => setInpValue(e.target.value)}
                    placeholder="Введите задачу"
                />
            </div>
            <button className="btn" onClick={() => setOptinShow(!optinShow)}>
                <span className="material-symbols-outlined">more_vert</span>
            </button>
            <button className="btn" onClick={() => handleAdd(inpValue, '')}>
                Добавить
            </button>
        </div>
    );
}

export default TodoInput;