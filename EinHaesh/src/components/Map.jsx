import { useState } from 'react'
import React from 'react';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import basePlan from '../assets/agaf_1.png'
import { Polyline } from 'react-leaflet';


const bounds = [[0, 0], [337, 211]]; // גבולות התמונה ביחידות מותאמות
const Map=()=>{

    const markers = [
        { position: [2, 8], popup: "Point 1" },
        { position: [16, 73], popup: "Point 2" },
        { position: [305, 128], popup: "Point 3" },
      ];
      const path = [
        markers[0].position, // מיקום נקודה 1
        markers[1].position, // מיקום נקודה 2
        markers[2].position, // מיקום נקודה 3
      ];
      
     
     

      
  return (
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
        <Marker key={index} position={marker.position}>
          <Popup>{marker.popup}</Popup>
        </Marker>
      ))}

<Polyline positions={path} color="blue" />;
    </MapContainer>
  );
};

export default Map;
