// src/hooks/useTodo.ts
import { useCallback, useState } from 'react';
import type { Todo } from '../type/todo.ts';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export const useTodo = (value: Todo[], setValue: SetState<Todo[]>) => {
  const [inpValue, setInpValue] = useState('');
  const [inpchangeValue, setInpchangeValue] = useState('');
  const [isSelected, setIsSelected] = useState<number | null>(null);

  const handleAdd = useCallback(
    (text: string, lesson: string) => {
      if (!text.trim()) return;
      const newItem: Todo = {
        id: Date.now(),
        text: text.trim(),
        isDone: false,
        lesson,
      };
      setValue((prev) => [...prev, newItem]);
      setInpValue('');
    },
    [setValue]
  );

  const handleRemove = useCallback(
    (id: number) => {
      setValue((prev) => prev.filter((item) => item.id !== id));
    },
    [setValue]
  );

  const handleChange = useCallback(
    (id: number, newValue: string) => {
      if (newValue.trim()) {
        setValue((prev) =>
          prev.map((item) => (item.id === id ? { ...item, text: newValue.trim() } : item))
        );
        setInpchangeValue('');
        setIsSelected(null);
      }
    },
    [setValue]
  );

  const startEditing = useCallback(
    (id: number) => {
      const itemToEdit = value.find((item) => item.id === id);
      if (itemToEdit) {
        setIsSelected(id);
        setInpchangeValue(itemToEdit.text);
      }
    },
    [value]
  );

  const cancelEditing = useCallback(() => {
    setIsSelected(null);
    setInpchangeValue('');
  }, []);

  return {
    inpValue,
    setInpValue,
    inpchangeValue,
    isSelected,
    setInpchangeValue,
    handleAdd,
    handleRemove,
    handleChange,
    startEditing,
    cancelEditing,
  };
};
