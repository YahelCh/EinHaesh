import React from 'react';
import iconDivuach from '../assets/speech-bubble.png'
import iconFire from '../assets/actions_icons/fire_ic.svg'
import iconShalter from '../assets/actions_icons/shalter_ic.png'
import iconTrapped from '../assets/actions_icons/trapped_ic.png'
import iconSmoke from '../assets/actions_icons/warning_ic.png'
const ActionsBar = ({ setActiveAction }) => {



    return <div className='actions-bar'>
        <div className='action' onClick={() => setActiveAction({ name: 'updtae', icon: iconDivuach })}>
            <img className='action-icon' src={iconDivuach} alt="speech-bubble" /></div>

        <div className='action' onClick={() => setActiveAction({ name: 'updtae', icon: iconShalter })}>
            <img className='action-icon' src={iconShalter} alt="speech-bubble" /></div>

        <div className='action' onClick={() => setActiveAction({ name: 'updtae', icon: iconFire })}>
            <img className='action-icon' src={iconFire} alt="speech-bubble" /></div>

        <div className='action' onClick={() => setActiveAction({ name: 'updtae', icon: iconTrapped })}>
            <img className='action-icon' src={iconTrapped} alt="speech-bubble" /></div>


        <div className='action' onClick={() => setActiveAction({ name: 'updtae', icon: iconSmoke })}>
            <img className='action-icon' src={iconSmoke} alt="speech-bubble" /></div>


    </div>
}

export default ActionsBar;