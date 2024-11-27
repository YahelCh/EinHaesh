import { useState, useEffect } from 'react';
import './App.css';
import Map from './components/Map';
import ReportsPage from './components/ReportsPage';
import fireIcon from './assets/fire-icon.svg';
import FireAlarm from './components/FireAlarm'
import appIcon from './assets/apppp.png'
import appBoard from './assets/app-icon.png'
import loadingimg from './assets/landing.png'
import Timer from './components/Timer'


function App() {
  const [location, setLocation] = useState(null); // מיקום שנבחר במפה
  const [isWaringOpoup, setIsWaringOpoup] = useState(false);
  const [isAppShown, setIsAppShown] = useState(true);
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [highlighted, setHighlighted] = useState(null);


  const [fireFightingView, setFireFightingView] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsAnimating(true), 100);
    setTimeout(() => setIsAnimating(false), 800); // משך האנימציה

    setTimeout(() => {
      if (isAppShown) {
        setIsAppShown(false);

        setIsWaringOpoup(true);

      }
    }, 2000);
  }, []
  )

  return (
    <>
      {!(isAppShown || loading) && <div className='main'>


        <div className="updates-wrapper">
          <ReportsPage reports={reports} setReports={setReports} highlighted={highlighted} setHighlighted={setHighlighted} location={location} />
        </div>
        <div className='center' >
          <div className='header'>
            <div style={{display:'flex',flex:'1', alignItems: 'center',  gap: '10px'}}>
              <div class="">
                <img src={fireIcon} alt="Fire Icon" width="50" height="50" />
              </div>
              <FireAlarm />

              <div className='title'>עין האש</div>
            </div>
            <Timer />

          </div>
          <div className='map-wrapper'>
            <Map fireFightingView={fireFightingView} reports={reports} setReports={setReports} setHighlighted={setHighlighted} ></Map>
          </div>
        </div>
        {/* <div style={{ position: 'absolute' }} onClick={() => setFireFightingView(!fireFightingView)}>תכנן פעולות כב"ה</div> */}






      </div >}
      {(isAppShown || loading || isWaringOpoup) && <div className="modal">
        {isAppShown ? <div><img style={{ width: '100%', height: '100%' }} src={appBoard}></img>
          <img className={`appIcon ${isAnimating ? 'animate' : ''}`} src={appIcon}></img>
        </div> :
          (loading ?
            <img src={loadingimg} style={{ width: '100%', height: '100%' }} ></img> :
            (isWaringOpoup &&
              <div className='warning-popup' onClick={() => {
                console.log('dasdad');
                setIsWaringOpoup(false)
              }}></div>))}

      </div>}

    </>
  );
}

export default App;
