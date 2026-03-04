import { useState, useEffect } from 'react';
import type { Todo } from '../type/todo.ts';

export const useLocalStorage = (
  key: string,
  initialValue: Todo[] = []
): [Todo[], React.Dispatch<React.SetStateAction<Todo[]>>] => {
  const [value, setValue] = useState<Todo[]>(() => {
    const saved = localStorage.getItem(key);
    if (saved === null) return initialValue;
    try {
      return JSON.parse(saved);
    } catch (e) {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
