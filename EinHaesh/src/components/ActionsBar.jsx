import React from 'react';
import iconDivuach from '../assets/speech-bubble.png'
import iconLechudim from '../assets/icon_trapped.jpg'

const ActionsBar = ({ setActiveAction }) => {



    return <div className='actions-bar'>
        <div className='action' onClick={() => setActiveAction({ name: 'updtae', icon: iconDivuach })}>
            <img src={iconDivuach} alt="speech-bubble" style={{ width: '32px', height: '32px' }} /></div>
        <div className='action' onClick={() => setActiveAction({ name: 'updtae', icon: iconLechudim })}>
            <img src={iconLechudim} alt="speech-bubble" style={{ width: '32px', height: '32px' }} /></div>
        <div className='action' onClick={() => setActiveAction({ name: 'updtae', icon: iconDivuach })}>
            <img src={iconDivuach} alt="speech-bubble" style={{ width: '32px', height: '32px' }} /></div>
        <div className='action' onClick={() => setActiveAction({ name: 'updtae', icon: iconDivuach })}>
            <img src={iconDivuach} alt="speech-bubble" style={{ width: '32px', height: '32px' }} /></div>
        <div className='action' onClick={() => setActiveAction({ name: 'updtae', icon: iconDivuach })}>
            <img src={iconDivuach} alt="speech-bubble" style={{ width: '32px', height: '32px' }} /></div>
        <div className='action' onClick={() => setActiveAction({ name: 'smoke', icon: iconDivuach })}>
        <div>עשן</div>
            </div>
        <div className='action' onClick={() => setActiveAction({ name: 'fire', icon: iconDivuach })}>
            <div>אש</div>
           </div>

    </div>
}

export default ActionsBar;