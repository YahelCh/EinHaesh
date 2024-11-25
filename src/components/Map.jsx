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
import parkingOption from '../assets/parking1.png'


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
    desc: 'opt1',
    id: 0,
    coords: [
      [602.3544723142452, 62.90889429018705],
      [602.3544723142452, 110.90889429018705],
      [647.3544723142452, 110.94868995633186],
      [647.3544723142452, 62.90889429018705]
    ],
  },
  {
    desc: 'opt2',
    id: 1,
    coords:
      [[576.3842877425461, 373.1805429677845],
      [621.3842877425461, 420.1805429677845],

      [560.3563653573119, 488.12286808931367],

      [517.3833412210128, 441.0917236549394],

      ],
  },
  {
    desc: 'opt3',
    id: 1,
    coords: [
      [431.45338381448175, 516.173621982368],
      [480.4301940369144, 552.1943849386174],
      [433.4524372929484, 598.220915382714],
      [392.4718409843824, 558.1978454313257]



    ],
  },
  {
    desc: 'opt4',
    id: 1,
    coords:
      [
        [212.2238574264967, 38.231471824598856],
        [207.2262237303301, 93.26319300775778],
        [127.26408459166475, 91.26203951018836],
        [127.26408459166475, 33.22858808067531]

      ],
  },
  {
    desc: 'opt5',
    id: 1,
    coords:
      [
        [89.61523899668714, 268.0305882837604],
        [89.61523899668714, 349.07730493532176],
        [47.6351159488878, 352.07903518167586],
        [53.63227638428771, 262.0271277910521],

      ],
  },
  ]);

  const parkingIcon1 = L.divIcon({
    className: "custom-icon",
    html: `<img src="${parkingOption}" style="width: 90px; height: 52px; transform: rotate(45deg);" />`, // סיבוב ב-45 מעלות
    iconSize: [100, 45],
    iconAnchor: [50, 25],
  });
  const parkingIcon = L.divIcon({
    className: "custom-icon",
    html: `<img src="${parkingOption}" style="width: 90px; height: 52px; transform: rotate(90deg);" />`, // סיבוב ב-45 מעלות
    iconSize: [100, 45],
    iconAnchor: [50, 25],
  });
const parkingIcon2 = L.divIcon({
    className: "custom-icon",
    html: `<img src="${parkingOption}" style="width: 90px; height: 52px;" />`, // סיבוב ב-45 מעלות
    iconSize: [100, 45],
    iconAnchor: [50, 25],
  });


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


        {/* //תמונה של אזור חניה רכב הצלה */}
        <Polygon positions={zones[0].coords} color="transparent" fillOpacity={0} />
        <Marker position={[568.88, 430.64]} icon={parkingIcon1} />


        <Polygon positions={zones[1].coords} color="transparent" fillOpacity={0} />
        <Marker position={[635.85, 86.92]} icon={parkingIcon} />

        <Polygon positions={zones[2].coords} color="transparent" fillOpacity={0} />
        <Marker position={[434.45, 556.7]} icon={parkingIcon1} />

        <Polygon positions={zones[3].coords} color="transparent" fillOpacity={0} />
        <Marker position={[168.99, 64.50]} icon={parkingIcon} />

        <Polygon positions={zones[4].coords} color="transparent" fillOpacity={0} />
        <Marker position={[ 64.62707051585426,  306.0525047375793]} icon={parkingIcon2} />



        <Marker icon={fireIcon} position={[652, 110]} />

        {/* {zones.map((zone, index) => <Polygon
          key={zone.id}
          positions={zone.coords}
          fillColor='transparent'
          pathOptions={{

            color: 'transparent',
            fillOpacity:  0,
            weight: 1, // עובי הגבול
          }}

        />)} */}



        <MapClickHandler />
      </MapContainer>

    </>
  );
};

export default Map;
