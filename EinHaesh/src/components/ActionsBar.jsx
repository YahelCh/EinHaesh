import React from 'react';
import iconDivuach from '../assets/speech-bubble.png'
import iconLechudim from '../assets/icon_trapped.jpg'
import iconFire from '../assets/fire.png'
import iconSmoke from '../assets/smoke.png'
import iconButton from '../assets/button.png'
const ActionsBar = ({ setActiveAction }) => {



    return <div className='actions-bar'>
        <div className='action' onClick={() => setActiveAction({ name: 'updtae', icon: iconDivuach })}>
            <img src={iconDivuach} alt="speech-bubble" style={{ width: '32px', height: '32px' }} /></div>
        <div className='action' onClick={() => setActiveAction({ name: 'updtae', icon: iconButton })}>
            <img src={iconButton} alt="speech-bubble" style={{ width: '32px', height: '32px' }} /></div>
        <div className='action' onClick={() => setActiveAction({ name: 'updtae', icon: iconDivuach })}>
            <img src={iconDivuach} alt="speech-bubble" style={{ width: '32px', height: '32px' }} /></div>
        <div className='action' onClick={() => setActiveAction({ name: 'updtae', icon: iconDivuach })}>
            <img src={iconDivuach} alt="speech-bubble" style={{ width: '32px', height: '32px' }} /></div>


        <div className='action' onClick={() => setActiveAction({ name: 'updtae', icon: iconSmoke })}>
            <img src={iconSmoke} alt="speech-bubble" style={{ width: '32px', height: '32px' }} /></div>

        <div className='action' onClick={() => setActiveAction({ name: 'updtae', icon: iconFire })}>
            <img src={iconFire} alt="speech-bubble" style={{ width: '32px', height: '32px' }} /></div>
    </div>
}

export default ActionsBar;