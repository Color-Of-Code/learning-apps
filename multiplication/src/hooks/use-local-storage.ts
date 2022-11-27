import { Dispatch, useEffect, useState } from 'react';

export function useLocalStorage<TValue>(storageKey: string, fallbackState: TValue): [TValue, Dispatch<TValue>] {
  const json = localStorage.getItem(storageKey) || '{}';

  const [value, setValue] = useState<TValue>(
    JSON.parse(json) ?? fallbackState
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
}
