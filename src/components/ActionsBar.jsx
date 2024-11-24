import React from 'react';
import iconDivuach from '../assets/speech-bubble.png'
import iconFire from '../assets/actions_icons/fire_ic.svg'
import iconFireActive from '../assets/actions_icons/fire_ic_active.svg'

import iconShalter from '../assets/actions_icons/iconShalter.svg'
import iconShalterActive from '../assets/actions_icons/iconShalterActive.svg'

import iconTrappedActive from '../assets/actions_icons/iconTrappedActive.svg'
import iconTrapped from '../assets/actions_icons/iconTrapped.svg'

import iconSmoke from '../assets/actions_icons/smoke-icon.svg'
import iconSmokeActive from '../assets/actions_icons/smoke-iconActive.svg'



const ActionsBar = ({ setActiveAction, activeAction }) => {

    const actions = [{ name: 'shalter', icon: iconShalter, activeIcon: iconShalterActive, reportText:'הורדת שאלטר מערבי אגף 8' },
    { name: 'fire', icon: iconFire, activeIcon: iconFireActive,reportText: 'מוקד בעירה נוסף מסדרון'},
    { name: 'trapped', icon: iconTrapped, activeIcon: iconTrappedActive,reportText:'דיווח על לכודים תא 12' },
    { name: 'smoke', icon: iconSmoke, activeIcon: iconSmokeActive,reportText:'עשן חדר אוכל ותאים 2,3,4' },
    ];

    return <div className='actions-bar'>
        {actions.map(action => <div className='action' onClick={() => setActiveAction(action)}>
            <img className='action-icon' src={activeAction.name == action.name ? action.activeIcon : action.icon} alt="speech-bubble" /></div>)}
{/* 

        <div className='action' onClick={() => setActiveAction({ name: 'shalter', icon: iconShalterActive })}>
            <img className='action-icon' src={activeAction.name == 'shalter' ? iconShalterActive : iconShalter} alt="speech-bubble" /></div>

        {/* <div className='action' onClick={() => setActiveAction({ name: 'updtae', icon: iconDivuach })}>
            <img className='action-icon' src={activeAction.name == 'updtae' ? iconDivuachActive : iconDivuach} alt="speech-bubble" /></div> 

        <div className='action' onClick={() => setActiveAction({ name: 'fire', icon: iconFireActive })}>
            <img className='action-icon' src={activeAction.name == 'fire' ? iconFireActive : iconFire} alt="speech-bubble" /></div>

        <div className='action' onClick={() => setActiveAction({ name: 'trapped', icon: iconTrappedActive })}>
            <img className='action-icon' src={activeAction.name == 'trapped' ? iconTrappedActive : iconTrapped} alt="speech-bubble" /></div>


        <div className='action' onClick={() => setActiveAction({ name: 'smoke', icon: iconSmokeActive })}>
            <img className='action-icon' src={activeAction.name == 'smoke' ? iconSmokeActive : iconSmoke} alt="speech-bubble" /></div> */}


    </div>
}

export default ActionsBar;