import React, { useEffect } from 'react';
import cancelIcon from '../assets/actions_icons/cancel.png';
import rightArrow from '../assets/actions_icons/rightArrow.png'; // הכנס את הנתיב לתמונה של החץ

const PopupMessage = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // סוגר את ההודעה אחרי 3 שניות
    }, 3000); 

    return () => clearTimeout(timer); 
  }, [onClose]);

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '6%',
        left: '50%',
        transform: 'translateX(-93%)',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        zIndex: 9999,
        textAlign: 'center',
        fontSize: 'large',
        display: 'flex', 
        alignItems: 'center', 
      }}
    >
      <img 
        src={rightArrow} 
        alt="חץ" 
        style={{
          width: '60px', 
          height: '60px', 
          marginRight: '5px', 
        }} 
      />
      <p>{message}</p>
      <img 
        src={cancelIcon} 
        alt="סגור" 
        onClick={onClose} 
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          cursor: 'pointer',
          width: '20px',
          height: '20px',
        }} 
      />
    </div>
  );
};

export default PopupMessage;
