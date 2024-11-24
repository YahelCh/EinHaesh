import { useState } from 'react';
import './App.css';
import Map from './components/Map';
import ReportsPage from './components/ReportsPage';
import fireIcon from './assets/fire-icon.svg';
import FireAlarm from './components/FireAlarm'
import AlertWithToastify from './components/AlertWithToastify';

function App() {
  const [location, setLocation] = useState(null); // מיקום שנבחר במפה
  const [isWaringPopup, setIsWaringPopup] = useState(true); // מיקום שנבחר במפה
  const [reports, setReports] = useState([]);

  return (
    <>
      <div className='main'>
        <div className="fire-icon">
          <img src={fireIcon} alt="Fire Icon" width="50" height="50" />
        </div>
        {/* {!isWaringPopup && <FireAlarm /> } */}
        <div className='title'>עין האש</div>
        <div className="updates-wrapper">
          <ReportsPage reports={reports} setReports={setReports} location={location} />
        </div>
        <div className='center' >
          <div className='map-wrapper'><Map isWaringPopup={isWaringPopup} reports={reports} setReports={setReports} ></Map></div>
        </div>
        {isWaringPopup &&
          <div className="modal">
            <div className="modal-content"></div>
            <div className='warning-popup' onClick={() => { setIsWaringPopup(false) }}></div>
          </div>
        }
        <div> <AlertWithToastify /> </div>

      </div >
    </>
  );
}

export default App;
