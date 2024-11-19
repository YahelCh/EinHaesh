import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { MapContainer, TileLayer, ImageOverlay, Marker, FeatureGroup, Popup, Polyline, Polygon, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import basePlan from '../assets/map.jpg';
import { EditControl } from 'react-leaflet-draw';
import ActionsBar from './ActionsBar';
import iconDivuach from '../assets/speech-bubble.png'


const bounds = [[0, 0], [337, 211]]; // גבולות התמונה ביחידות מותאמות

const Map = () => {
  const [activeAction, setActiveAction] = useState();
  const [markers, setMarkers] = useState([]);
  const [smokeZone, setSmokeZone] = useState([]);
  //   const path = [
  //     markers[0].position, // מיקום נקודה 1
  //     markers[1].position, // מיקום נקודה 2
  //     markers[2].position, // מיקום נקודה 3
  //   ];

  const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', // אייקון דיפולטיבי של Leaflet
    iconSize: [25, 41], // גודל האייקון
    iconAnchor: [12, 41], // איפה לארח את ה-Anchor של האייקון
    popupAnchor: [0, -41], // הגדרת מיקום ה-popup יחסית לאייקון
  });


  const MapClickHandler = () => {
    const map = useMapEvents({
      click(event) {
        if (activeAction && activeAction.icon) { // בדוק אם יש אייקון פעיל
          const newMarker = event.latlng; // מיקום הלחיצה
          const icon = L.icon({
            iconUrl: activeAction.icon, // השתמש באייקון שהמשתמש בחר
            iconSize: [32, 32], // גודל האייקון
            iconAnchor: [16, 32], // עוגן האייקון (המיקום שבו יושבת ה"ראש" של האייקון)
            popupAnchor: [0, -32], // מיקום הפופאפ ביחס לאייקון
          });
          setMarkers((prevMarkers) => [...prevMarkers, { position: newMarker, icon }]);
          if (activeAction?.id == 1) {
            setSmokeZone([markers?.[0].position, newMarker])
          }
        }
      }
    });
  };

  useEffect(() => {
    // מבצע קריאה למיקום הנוכחי של המשתמש
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // עדכון המיקום הנוכחי
          const { latitude, longitude } = position.coords;
          setMarkers((prevMarkers) => [...prevMarkers, { position: [latitude, longitude], popup: "המיקום שלי" }]);
        },
        (error) => {
          console.error("Error getting geolocation: ", error);
        }
      );
    }
  }, []);
  return (
    <>
      <ActionsBar setActiveAction={setActiveAction} />
      <MapContainer
        center={[152, 105]} // נקודת ההתחלה של התצוגה
        zoom={1} // שליטה ברמת הזום
        style={{ height: "100vh", width: "100%" }}
        crs={L.CRS.Simple} // משתמשים בקואורדינטות פשוטות ולא גיאוגרפיות
      >
        <ImageOverlay
          url={basePlan} // הנתיב לתמונה
          bounds={bounds}
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} icon={marker.icon || defaultIcon} >
            {marker.popup && <Popup>{marker.popup}</Popup>}
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
