// src/hooks/useLocalStorage.js
import { useState } from 'react';

/** Hook to synchronize state with localStorage. */
function useLocalStorage(key, firstValue = null) {
  const initialValue = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(initialValue);

  /** Sync the state and localStorage */
  const setValue = (value) => {
    setItem(value);
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  };

  return [item, setValue];
}

export default useLocalStorage;
