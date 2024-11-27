import React from 'react';
import iconDivuach from '../assets/speech-bubble.png';
import iconFire from '../assets/actions_icons/fire_ic.svg';
import iconFireActive from '../assets/actions_icons/fire_ic_active.svg';
import iconShalter from '../assets/actions_icons/iconShalter.svg';
import iconShalterActive from '../assets/actions_icons/iconShalterActive.svg';
import iconTrappedActive from '../assets/actions_icons/iconTrappedActive.svg';
import iconTrapped from '../assets/actions_icons/iconTrapped.svg';
import iconSmoke from '../assets/actions_icons/smoke-icon.svg';
import iconSmokeActive from '../assets/actions_icons/smoke-iconActive.svg';
import gasTapIcon from '../assets/actions_icons/gasTapIcon.svg';
import gasTapIconActive from '../assets/actions_icons/gasTapIconActive.svg';
import fireCabinetIcon from '../assets/actions_icons/fireCabinetIcon.svg';
import fireCabinetIconActive from '../assets/actions_icons/fireCabinetIconActive.svg';
import iconParking from '../assets/actions_icons/iconParking.svg';
// import iconParkingActive from '../assets/actions_icons/iconParkingActive';


const ActionsBar = ({ setActiveAction, activeAction, onParkingClick }) => {
    const actions = [
        { name: 'shalter', icon: iconShalter, activeIcon: iconShalterActive, reportText: 'הורדת שאלטר מערבי אגף 8' },
        { name: 'fire', icon: iconFire, activeIcon: iconFireActive, reportText: 'מוקד בעירה נוסף מסדרון' },
        { name: 'trapped', icon: iconTrapped, activeIcon: iconTrappedActive, reportText: 'דיווח על לכודים תא 12' },
        { name: 'smoke', icon: iconSmoke, activeIcon: iconSmokeActive, reportText: 'עשן חדר אוכל ותאים 2,3,4' },
        { name: 'gas', icon: gasTapIcon, activeIcon: gasTapIconActive, reportText: 'סגירת ברז גז' },
        { name: 'fireCabinet', icon: fireCabinetIcon, activeIcon: fireCabinetIconActive, reportText: 'ארון כיבוי' },

        { 
            name: 'parking', 
            icon: iconParking, 
            activeIcon: iconParking, 
            reportText: 'מיקומי חניות הוצגו על המפה',
            onClick: onParkingClick // הוספת פונקציה ללחיצה על כפתור החניה
        }
    ];

    return (
        <div className='actions-bar'>
            {actions.map(action => (
                <div 
                    key={action.name}
                    className='action' 
                    onClick={() => {
                        if (action.name === 'parking') {
                            console.log('Parking action triggered'); 
                            onParkingClick(); 
                        } else {
                            setActiveAction(action); 
                        }
                    }}
                >
                    <img 
                        className='action-icon' 
                        src={activeAction.name === action.name ? action.activeIcon : action.icon} 
                        alt={action.name} 
                    />
                </div>
            ))}
        </div>
    );
};

export default ActionsBar;
