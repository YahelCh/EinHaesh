import { useState } from 'react';
import './App.css';
import Map from './components/Map';
import ReportsPage from './components/ReportsPage';
import fireIcon from './assets/fire-icon.svg';
import FireAlarm from './components/FireAlarm'

function App() {
  const [location, setLocation] = useState(null); // מיקום שנבחר במפה
  const [isWaringOpoup, setIsWaringOpoup] = useState(true); // מיקום שנבחר במפה

  return (
    <>
      <div className='main'>
        <div class="fire-icon">
          <img src={fireIcon} alt="Fire Icon" width="50" height="50" />
        </div>
        <FireAlarm />

        <div className='title'>עין האש</div>
        <div className="updates-wrapper">
          <ReportsPage location={location} />
        </div>
        <div className='center' >
          <div className='map-wrapper'><Map></Map></div>
        </div>
        {isWaringOpoup &&
          <div className="modal">
            <div className="modal-content"></div>
            <div className='warning-popup' onClick={() => { setIsWaringOpoup(false) }}></div>
          </div>
        }

      </div >
    </>
  );
}

export default App;
