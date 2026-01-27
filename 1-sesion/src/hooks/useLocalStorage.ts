import { useState, useEffect } from "react";
import type { TodoItem } from '../service/TodoItem.ts';

export const useLocalStorage = (key: string, initialValue: TodoItem[] = []): [TodoItem[], React.Dispatch<React.SetStateAction<TodoItem[]>>] => {
    const [value, setValue] = useState<TodoItem[]>(() => {
        const saved = localStorage.getItem(key);
        if (saved === null) return initialValue;
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error(`Failed to parse localStorage item "${key}"`, e);
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]); // ← добавил key в зависимости на всякий случай

    return [value, setValue];
};