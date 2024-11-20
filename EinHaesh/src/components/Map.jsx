import { useState, useRef } from 'react';
import React from 'react';
import { MapContainer, TileLayer, ImageOverlay, Marker, FeatureGroup, Popup, Polyline, Polygon, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import basePlan from '../assets/Hospital_Floor_Plan_700x700.png';
import { EditControl } from 'react-leaflet-draw';
import ActionsBar from './ActionsBar';
import iconDivuach from '../assets/speech-bubble.png'
import MapLegend from './MapLegend'


const bounds = [[0, 0], [700, 700]]; // גבולות התמונה ביחידות מותאמות

const Map = () => {
  const [activeAction, setActiveAction] = useState();
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

  const [zones, setZones] = useState([{
    desc: 'כניסה',
    id: 0,
    coords: [
      [653.3333435058594, 339.33331298828125],
      [589.3333435058594, 339.33331298828125],
      [581.3333435058594, 285.33331298828125],
      [431.3333435058594, 282.33331298828125],
      [433.3333435058594, 434.33331298828125],
      [586.3333435058594, 437.33331298828125],
      [589.3333435058594, 385.33331298828125],
      [651.3333435058594, 384.33331298828125],
    ],
  },
  // {
  //   desc: 'מכבסה',
  //   id: 1,
  //   coords: [
  //     [51.505, -0.09],
  //     [51.51, -0.1],
  //     [51.51, -0.08],
  //   ],
  // },
  {
    desc: 'בית כנסת',
    id: 1,
    coords: [
      [586, 497],
      [429, 492],
      [424, 634],
      [588, 637],
    ],
  },
  {
    desc: 'מטבח',
    id: 2,
    coords: [
      [51.505, -0.09],
      [51.51, -0.1],
      [51.51, -0.08],
    ],
  },
  {
    desc: 'תא 1',
    id: 3,
    coords: [
      [51.505, -0.09],
      [51.51, -0.1],
      [51.51, -0.08],
    ],
  },
  {
    desc: 'תא 2',
    id: 4,
    coords: [
      [51.505, -0.09],
      [51.51, -0.1],
      [51.51, -0.08],
    ],
  },
  {
    desc: 'תא 3',
    id: 5,
    coords: [
      [51.505, -0.09],
      [51.51, -0.1],
      [51.51, -0.08],
    ],
  },

  {
    id: 6,
    coords: [
      [51.49, -0.1],
      [51.5, -0.12],
      [51.5, -0.09],
    ],
  },
  ]);

  const MapClickHandler = () => {
    const map = useMapEvents({
      click(event) {
        if (activeAction && activeAction.icon && !(['fire', 'smoke'].includes(activeAction.name))) { // בדוק אם יש אייקון פעיל
          const newMarker = event.latlng; // מיקום הלחיצה
          console.log(event.latlng);

          const icon = L.icon({
            iconUrl: activeAction.icon, // השתמש באייקון שהמשתמש בחר
            iconSize: [32, 32], // גודל האייקון
            iconAnchor: [16, 32], // עוגן האייקון (המיקום שבו יושבת ה"ראש" של האייקון)
            popupAnchor: [0, -32], // מיקום הפופאפ ביחס לאייקון
          });
          setMarkers((prevMarkers) => [...prevMarkers, { position: newMarker, icon }]);

        }
      }
    });
  };

  const handleZoneClick = (zoneIndex) => {
    if (activeAction.name == 'fire') {
      setZones(prev => {
        let temp = [...prev];
        temp[zoneIndex].color = 'rgba(255, 0, 0, 0.5)';
        return temp;
      })}
      if(activeAction.name == 'smoke'){
        setZones(prev => {
          let temp = [...prev];
          temp[zoneIndex].color = '#333333';
          return temp;
        })
    }

  }

  return (
    <>
      <ActionsBar setActiveAction={setActiveAction} />
      <MapContainer
        center={[350, 350]} // נקודת ההתחלה של התצוגה
        zoom={-1} // שליטה ברמת הזום
        style={{ height: "100vh", width: "100%" }}
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

        {zones.map((zone, index) => <Polygon
          key={zone.id}
          positions={zone.coords}
          fillColor={zone.color}
          pathOptions={{

            color: zone.color || 'transparent',
            fillOpacity: zone.color ? 0.5 : 0,
            weight: 1, // עובי הגבול
          }}
          eventHandlers={{
            click: () => handleZoneClick(index),
          }}
        />)}

        {/* <Polyline positions={path} color="blue" />
        <Polygon
          positions={zones[1].coords} // קואורדינטות הפוליגון
          color="red" // צבע הגבול
          fillColor="rgba(255, 0, 0, 0.5)" // צבע המילוי עם שקיפות
          weight={2} // רוחב הגבול
        />

        <Polygon
          positions={zones[0].coords} // קואורדינטות הפוליגון
          color="red" // צבע הגבול
          fillColor="rgba(255, 0, 0, 0.5)" // צבע המילוי עם שקיפות
          weight={2} // רוחב הגבול
        /> */}

        <MapClickHandler />
      </MapContainer>
      {/* <MapLegend/> */}
    </>
  );
};

export default Map;



