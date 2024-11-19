import React from 'react';
import iconDivuach from '../assets/speech-bubble.png'
import fireDivuach from '../assets/fire.jpg'

const ActionsBar = ({ setActiveAction }) => {



    return <div className='actions-bar'>
        <div className='action' onClick={() => setActiveAction({ name: 'fire', icon: fireDivuach, id:1 })}>
            <img src={fireDivuach} alt="fire" style={{ width: '32px', height: '32px' }} /></div>
        <div className='action' onClick={() => setActiveAction({ name: 'updtae', icon: iconDivuach })}>
            <img src={iconDivuach} alt="speech-bubble" style={{ width: '32px', height: '32px' }} /></div>
        <div className='action'></div>
        <div className='action'></div>
        <div className='action'></div>
        <div className='action'></div>
    </div>
}

export default ActionsBar;