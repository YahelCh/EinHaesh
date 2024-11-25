import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { MapContainer, ImageOverlay, Marker, Polygon, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import basePlan from '../assets/mapmap.png';
import { EditControl } from 'react-leaflet-draw';
import ActionsBar from './ActionsBar';
import MapLegend from './MapLegend'
import fireIconImg from '../assets/fire-icon.svg';
import parkingOption from '../assets/parking.png'


const bounds = [[0, 0], [700, 700]]; // גבולות התמונה ביחידות מותאמות

const Map = ({ setReports, fireFightingView }) => {
  const [activeAction, setActiveAction] = useState({});
  const [markers, setMarkers] = useState([]);


  //   const path = [
  //     markers[0].position, // מיקום נקודה 1
  //     markers[1].position, // מיקום נקודה 2
  //     markers[2].position, // מיקום נקודה 3
  //   ];

  const smokeZone = [
    [173, 42],
    [173, 70],
    [113, 70],

    [113, 42]

  ];

  const signs = [
    { text: 'ארון כיבוי', color: 'white' },
    { text: 'ברז גז', color: 'red' },
    { text: 'שער', color: 'green' },
    { text: 'גנרטור', color: 'blue' },
    { text: 'הידרנט', color: '#36caca' },
    { text: 'דלת', color: '#c72830' },
    { text: 'לוח חשמל', color: '#eeba11' },
  ]

  function createColorfulIcon(color) {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="point" style="background-color:${color};"></div>`,
      iconSize: [5, 5], // גודל האייקון
      iconAnchor: [10, 10] // המרכז של האייקון
    });
  }
  const colors = ['red', 'green', 'blue', '#36caca', '#c72830', '#eeba11'];

  const [signsOnMap, setSignsOnMap] = useState([

  ])

  const generateRandomCoordinates = () => {
    const lat = Math.floor(Math.random() * (445 - 0 + 1) + 0);
    // טווח אקראי של קו רוחב
    const lng = Math.floor(Math.random() * (424 - 0 + 1) + 0);  // טווח אקראי של קו אורך
    return [lat, lng];
  };

  const fireIcon = L.divIcon({
    className: 'fire-icon',
    html: `
          <img src="${fireIconImg}" alt="Fire Icon" width="50" height="50" />
        `,
    iconSize: [20, 20], // גודל האייקון
    iconAnchor: [10, 10] // המרכז של האייקון
  })

  useEffect(() => {


    const newMarkers = [];
    for (let i = 0; i < 20; i++) {  // יצירת 5 נקודות אקראיות
      const randomCoords = generateRandomCoordinates();
      const color = colors[i % colors.length];
      newMarkers.push({
        position: randomCoords,
        icon: createColorfulIcon(color),
        id: i,
        popup: `Marker ${i + 1}`,
      });
    }
    setSignsOnMap(newMarkers);
  }, []);

  const crossIcon = L.divIcon({
    className: 'cross-icon',
    html: `
      <div style="width: 30px; height: 30px; background-color: transparent; position: relative;">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                    color: red; font-size: 20px; font-weight: bold; 
     background: 
         linear-gradient(to top left,
             rgba(0,0,0,0) 0%,
             rgba(0,0,0,0) calc(50% - 0.8px),
             rgba(0,0,0,1) 50%,
             rgba(0,0,0,0) calc(50% + 0.8px),
             rgba(0,0,0,0) 100%),
         linear-gradient(to top right,
             rgba(0,0,0,0) 0%,
             rgba(0,0,0,0) calc(50% - 0.8px),
             rgba(0,0,0,1) 50%,
             rgba(0,0,0,0) calc(50% + 0.8px),
             rgba(0,0,0,0) 100%);
">
         0
        </div>
      </div>
    `,
    iconSize: [30, 30], // גודל האייקון
    iconAnchor: [15, 15], // העוגן יהיה במרכז
  });


  const [zones, setZones] = useState([{
    //   desc: 'opt1',
    //   id: 0,
    //   coords: [
    //     [647.3544723142452, 124.94868995633186]
    //     [647.3544723142452, 55.90889429018705]
    //   ],
    // },
    // {
    //   desc: 'מכבסה',
    //   id: 1,
    //   coords: [
    //     [51.505, -0.09],
    //     [51.51, -0.1],
    //     [51.51, -0.08],
    //   ],
    // },
    // {
    desc: 'opt2',
    id: 1,
    coords:
      [[576.3842877425461, 373.1805429677845],
      [621.3842877425461, 420.1805429677845],

      [560.3563653573119, 488.12286808931367],

      [517.3833412210128, 441.0917236549394],

      ],
  },
  ]);

  useEffect(() => {
    console.log(activeAction.name);

  }, [activeAction])

  const MapClickHandler = () => {
    const map = useMapEvents({
      click(event) {
        if (activeAction && activeAction.activeIcon) { // בדוק אם יש אייקון פעיל
          const newMarker = event.latlng; // מיקום הלחיצה
          console.log(event.latlng);

          const icon = L.icon({
            iconUrl: activeAction.activeIcon, // השתמש באייקון שנבחר
            iconSize: [32, 32], // גודל האייקון
            iconAnchor: [16, 32], // עוגן האייקון
            popupAnchor: [0, -32], // מיקום הפופאפ ביחס לאייקון
          });
          setReports((prevReports) => [
            ...prevReports,
            { id: Date.now(), text: activeAction.reportText, isRecording: false },
          ]);
          setMarkers((prevMarkers) => [...prevMarkers, { position: newMarker, icon }]);
        }
      }
    });
  };

  const handleZoneClick = (zoneIndex) => {
    if (activeAction.name === 'fire') {
      setZones(prev => {
        let temp = [...prev];
        temp[zoneIndex].color = 'rgba(255, 0, 0, 0.5)'; // צבע אדום עם שקיפות עבור אש
        return temp;
      })
    }
    if (activeAction.name == 'smoke') {
      setZones(prev => {
        let temp = [...prev];
        temp[zoneIndex].color = '#333333';
        return temp;
      })
    }
  };

  return (
    <>
      <ActionsBar activeAction={activeAction} setActiveAction={setActiveAction} />

      <MapContainer
        center={[350, 350]} // נקודת ההתחלה של התצוגה
        zoom={-1} // שליטה ברמת הזום
        style={{ marginTop: '10%', height: "90%", width: "100%", borderRadius: '10px' }}
        crs={L.CRS.Simple} // משתמשים בקואורדינטות פשוטות ולא גיאוגרפיות
      >
        <ImageOverlay
          url={basePlan} // הנתיב לתמונה
          bounds={bounds}
        />
        {markers.map((marker, index) => (
          <Marker key={index} {...marker}>
            <Popup>{marker.popup}</Popup>
          </Marker>
        ))}

      
//תמונה של אזור חניה רכב הצלה
        <Polygon positions={zones[0].coords} color="blue" fillOpacity={0.3} />

        {/* הצגת האייקון של איקס אדום בתוך הפוליגון */}
        <Marker position={[568.88, 430.64]} icon={crossIcon} />

        <Marker icon={fireIcon} position={[652, 110]} />

        {zones.map((zone, index) => <Polygon
          key={zone.id}
          positions={zone.coords}
          fillColor={zone.color}
          pathOptions={{

            color: 'red',
            fillOpacity: zone.color ? 0.5 : 0,
            weight: 1, // עובי הגבול
          }}

        />)}



        <MapClickHandler />
      </MapContainer>
    
    </>
  );
};

export default Map;
