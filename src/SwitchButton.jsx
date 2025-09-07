import React, {useContext} from 'react';
import clsx from 'clsx';
import { ThemeContext } from './context/ThemeContext';

export default function SwitchButton({ on = false, onToggle }) {

    const { darkMode } = useContext(ThemeContext);
  
  return (
    <button
      className={clsx(
        'block w-12 h-6 m-1 rounded-full cursor-pointer  focus:outline-sky-950 relative transition-colors duration-200',
        on ? 'bg-rose-800' : 'bg-gray-500'
      )}
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onToggle && onToggle(!on)}
    >
      <span
        className={clsx(
          'block w-6 h-6 rounded-full bg-white transition-transform duration-200 ease-in-out absolute top-0 left-0',
          on ? 'translate-x-6' : 'translate-x-0'
        )}
      />
    </button>
  );
}