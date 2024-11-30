import React, { useEffect } from 'react';
import cancelIcon from '../assets/actions_icons/cancel.png';
import rightArrowImg from '../assets/actions_icons/right-arrow.svg'; 
import leftArrowImg from '../assets/actions_icons/left-arrow.svg'; 

    const PopupMessage = ({ message: { message, arrow }, onClose }) => {

  useEffect(() => {
    console.log(message)
    const timer = setTimeout(() => {
      onClose(); 
    }, 3000); 

    return () => clearTimeout(timer); 
  }, [onClose]);
  const arrowImg = arrow === 'rightArrow' ? rightArrowImg : leftArrowImg;

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
        src={arrowImg} 
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
