import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Map from './components/Map'
import './App.css'
import 'leaflet-draw/dist/leaflet.draw.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='main'>
        <div class="fire-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50" height="50">

            <radialGradient id="fireGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ff4500" /> 
              <stop offset="50%" stop-color="#ff8c00" /> 
              <stop offset="100%" stop-color="#ff0000" />
            </radialGradient>
            <circle cx="50" cy="50" r="30" fill="url(#fireGradient)" />

            <circle class="halo" cx="50" cy="50" r="40" fill="none" stroke="#ffa500" stroke-width="5" opacity="0.6" />
          </svg>
          <div className='title'>עין האש</div>
        </div>

        <div className='updates-wrapper'></div>
        <div className='center' >
          <div className='map-wrapper'><Map></Map></div>
        </div>
      </div>
    </>
  )
}

export default App
