import { useState, useRef } from 'react';
import React from 'react';
import { MapContainer, TileLayer, ImageOverlay, Marker, FeatureGroup, Popup, Polyline, Polygon, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import basePlan from '../assets/agaf_1.png';
import { EditControl } from 'react-leaflet-draw';
import ActionsBar from './ActionsBar';
import iconDivuach from '../assets/speech-bubble.png'


const bounds = [[0, 0], [337, 211]]; // גבולות התמונה ביחידות מותאמות

const Map = () => {
  const [activeAction, setActiveAction] = useState();
  const [markers, setMarkers] = useState([]);

  //   const path = [
  //     markers[0].position, // מיקום נקודה 1
  //     markers[1].position, // מיקום נקודה 2
  //     markers[2].position, // מיקום נקודה 3
  //   ];

  const smokeZone = [
    [190, 100],
    [200, 150],
    [190, 150],
    [200, 50]
  ];

  const MapClickHandler = () => {
    const map = useMapEvents({
      click(event) {
        if (activeAction && activeAction.icon) { // בדוק אם יש אייקון פעיל
          const newMarker = event.latlng; // מיקום הלחיצה
          const icon = L.icon({
            iconUrl: iconDivuach, // השתמש באייקון שהמשתמש בחר
            iconSize: [32, 32], // גודל האייקון
            iconAnchor: [16, 32], // עוגן האייקון (המיקום שבו יושבת ה"ראש" של האייקון)
            popupAnchor: [0, -32], // מיקום הפופאפ ביחס לאייקון
          });
          setMarkers((prevMarkers) => [...prevMarkers, { position: newMarker, icon }]);
        }
      }
    });
  };


  return (
    <>
      <ActionsBar setActiveAction={setActiveAction} />
      <MapContainer
        center={[152, 105]} // נקודת ההתחלה של התצוגה
        zoom={-1} // שליטה ברמת הזום
        style={{ height: "100vh", width: "100%" }}
        crs={L.CRS.Simple} // משתמשים בקואורדינטות פשוטות ולא גיאוגרפיות
      >
        <ImageOverlay
          url={basePlan} // הנתיב לתמונה
          bounds={bounds}
        />
        {markers.map((marker, index) => (
          <Marker key={index}{...marker}>
            <Popup>{marker.popup}</Popup>
          </Marker>
        ))}

        {/* <Polyline positions={path} color="blue" /> */}
        <Polygon
          positions={smokeZone} // קואורדינטות הפוליגון
          color="red" // צבע הגבול
          fillColor="rgba(255, 0, 0, 0.5)" // צבע המילוי עם שקיפות
          weight={2} // רוחב הגבול
        />
        <MapClickHandler />
      </MapContainer>
    </>
  );
};

export default Map;
