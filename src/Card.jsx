import React, {useContext, useRef, useEffect, useState} from 'react';
import SwitchButton from './SwitchButton';
import { ThemeContext } from './context/ThemeContext';
import clsx from 'clsx';
import './Card.css';

export default function Card({ id, url, title, description, isActive, onToggle, onRemove, filter }) {
  const { darkMode } = useContext(ThemeContext);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [filterFading, setFilterFading] = useState(false);
  const prevActive = useRef(isActive);
  const prevFilter = useRef(filter);

  // Remove animáció
  useEffect(() => {
    if (removing) {
      setFading(true);
      const timeout = setTimeout(() => {
        setVisible(false);
        if (onRemove) onRemove(id);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [removing, id, onRemove]);

 

  if (!visible) return null;

  return (
    <div className={clsx(
      "card-layout  w-[375px] h-[200px]  transition-opacity duration-300",
      darkMode ? "bg-[#202535] text-gray-100" : "bg-[#FBFDFE]",
      (fading || filterFading) ? "opacity-40" : "opacity-100"
    )}>
      <div className="card-first-row">
          <div >
            <img src={url} alt={title} className="card-img"/>
          </div>
          <div className="card-texts">
            <h2 className={clsx("text-bold font-size-[20px] ", darkMode ? "text-[#FDFBFE]" : "text-[#091540]")}>{title}</h2>
            <p className={clsx("text-regular font-size-[16px]", darkMode ? "text-[#C6C6C6]" : "text-[#535868]")}>{description}</p>
          </div>
    </div>
      <div className="card-buttons-row">
        <button className={clsx("remove-button text-medium text-size-[16px] cursor-pointer  focus:outline-sky-950", 
                darkMode ? "bg-[#C6C6C6] text-[#091540]" : "bg-[#C6C6C6] text-[#091540]")}
           onClick={() => setRemoving(true)}>Remove</button>
        <div className='switch-btn'>
           <SwitchButton
             on={isActive}
             onToggle={(next) => onToggle && onToggle(id, next)}
             tabOrder={0}
          />
      </div>
      </div>
      </div>
  );
}