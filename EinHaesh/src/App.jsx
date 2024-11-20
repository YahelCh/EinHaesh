import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Map from './components/Map'
import './App.css'
import 'leaflet-draw/dist/leaflet.draw.css';
import AlertWithToastify from './components/Alerts.Jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='main'>
       <div className='updates-wrapper'>דיווחים ועדכונים</div>
       <div className='map-wrapper'><Map></Map>  </div>
       <div> <AlertWithToastify></AlertWithToastify> </div>
      </div>
    </>
  )
}

export default App
