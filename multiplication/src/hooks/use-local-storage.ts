import { Dispatch, useEffect, useState } from 'react';

export function useLocalStorage<TValue>(storageKey: string, fallbackState: TValue): [TValue, Dispatch<TValue>] {
  const initialState = (): TValue => {
    const json = localStorage.getItem(storageKey) ?? '{}';
    const state: TValue = JSON.parse<TValue>(json);
    return state ?? fallbackState;
  };

  const [value, setValue] = useState<TValue>(initialState);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
}
