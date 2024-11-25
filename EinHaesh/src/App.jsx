import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Map from './components/Map'
import './App.css'
import 'leaflet-draw/dist/leaflet.draw.css';
import AlertWithToastify from './components/Alerts.Jsx';

import { AlertProvider } from './components/AlertContext'
function App() {
  const [count, setCount] = useState(0)

  return (
   
    <div className='main'>
        <AlertProvider>
       <div className='updates-wrapper'>דיווחים ועדכונים</div>
       <div className='map-wrapper'><Map></Map>  </div>
       <div> <AlertWithToastify></AlertWithToastify> </div>
      </AlertProvider>
      </div>
  
  )
}

export default App
