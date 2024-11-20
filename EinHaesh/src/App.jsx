import { useState } from 'react';
import './App.css';
import MapPage from './components/MapPage';
import ReportsPage from './components/ReportsPage';

function App() {
  const [location, setLocation] = useState(null); // מיקום שנבחר במפה

  return (
    <div className="main">
      <div className="map-wrapper">
        <MapPage setLocation={setLocation} />
      </div>
      <div className="updates-wrapper">
        <ReportsPage location={location} />
      </div>
    </div>
  );
}

export default App;
