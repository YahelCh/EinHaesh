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
import pinuyActive from '../assets/actions_icons/pinuyActive.svg';
import pinuy from '../assets/actions_icons/pinuy.svg';
import manReport1 from '../assets/actions_icons/manReport.png';
import manReport2 from '../assets/actions_icons/manReport2.png';
import manReport3 from '../assets/actions_icons/manReport3.png';
import manReport4 from '../assets/actions_icons/manReport4.png';
import manReport5 from '../assets/actions_icons/manReport5.png';
import manReport6 from '../assets/actions_icons/manReport6.png';





const ActionsBar = ({ setActiveAction, activeAction, onParkingClick }) => {
    const actions = [
        { name: 'shalter', icon: iconShalter, activeIcon: iconShalterActive, reportText: 'הורדת שאלטר מערבי אגף 8', profilePic: manReport1 },
        { name: 'trapped', icon: iconTrapped, activeIcon: iconTrappedActive, reportText: 'דיווח על לכודים תא 12' , profilePic: manReport2},
        { name: 'smoke', icon: iconSmoke, activeIcon: iconSmokeActive, reportText: 'עשן חדר אוכל ותאים 2,3,4', profilePic: manReport3 },
        { name: 'gas', icon: gasTapIcon, activeIcon: gasTapIconActive, reportText: 'סגירת ברז גז', profilePic: manReport4 },
        { name: 'fireCabinet', icon: fireCabinetIcon, activeIcon: fireCabinetIconActive, reportText: 'שימוש בציוד ארון כיבוי' , profilePic: manReport5},
        { name: 'pinuy', icon: pinuy, activeIcon: pinuyActive, reportText: 'פינוי אסירים' , profilePic: manReport6},
    ];

    return (
        <div className='actions-bar'>
            {actions.map(action => (
                <div 
                    key={action.name}
                    className={`action ${activeAction.name === action.name?'active':'' }`}
                    onClick={() => {
                        if (action.name === 'parking') {
                            console.log('Parking action triggered'); 
                            onParkingClick(); 
                            
                        } 
                        setActiveAction(action); 
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
