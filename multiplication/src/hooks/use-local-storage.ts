import { Dispatch, useEffect, useState } from 'react';

export function useLocalStorage<TValue>(
  storageKey: string,
  stateFunc: () => TValue
): [TValue, Dispatch<TValue>] {
  const initialState = (): TValue => {
    const json = localStorage.getItem(storageKey);
    return json == null ? stateFunc() : JSON.parse<TValue>(json);
  };

  const [value, setValue] = useState<TValue>(initialState);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
}
