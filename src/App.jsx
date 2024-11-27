import { useState, useEffect } from 'react';
import './App.css';
import Map from './components/Map';
import ReportsPage from './components/ReportsPage';
import fireIcon from './assets/fire-icon.svg';
import FireAlarm from './components/FireAlarm'
import appIcon from './assets/app-icon.png'
import loadingimg from './assets/landing.png'


function App() {
  const [location, setLocation] = useState(null); // מיקום שנבחר במפה
  const [isWaringOpoup, setIsWaringOpoup] = useState(false);
  const [isAppShown, setIsAppShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [fireFightingView, setFireFightingView] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      if (isAppShown) {
        setIsAppShown(false);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setIsWaringOpoup(true);
        }, 2000);
      }
    }, 2000);
  }, []
  )

  return (
    <>
      <div className='main'>
        <div class="fire-icon">
          <img src={fireIcon} alt="Fire Icon" width="50" height="50" />
        </div>
        <FireAlarm />

        <div className='title'>עין האש</div>
        <div className="updates-wrapper">
          <ReportsPage reports={reports} setReports={setReports} location={location} />
        </div>
        <div className='center' >
          <div className='map-wrapper'><Map fireFightingView={fireFightingView} reports={reports} setReports={setReports} ></Map></div>
        </div>
        <div style={{ position: 'absolute' }} onClick={() => setFireFightingView(!fireFightingView)}>תכנן פעולות כב"ה</div>

        {(isAppShown || loading || isWaringOpoup) && <div className="modal">
          <div className="modal-content"></div>
          {isAppShown ? <img style={{ width: '100%', height: '100%' }} src={appIcon}></img> :
            (loading ?
              <img src={loadingimg} style={{ width: '100%', height: '100%' }} ></img> :
              (isWaringOpoup &&
                <div className='warning-popup' onClick={() => {
                  console.log('dasdad');
                  setIsWaringOpoup(false)
                }}></div>))}


        </div>}





      </div >
    </>
  );
}

export default App;
