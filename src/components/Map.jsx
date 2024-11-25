import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { MapContainer, ImageOverlay, Marker, Polygon, useMapEvents, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import basePlan from '../assets/mapmap.png';
import { EditControl } from 'react-leaflet-draw';
import ActionsBar from './ActionsBar';
import MapLegend from './MapLegend';
import fireIconImg from '../assets/fire-icon.svg';
import parkingOption from '../assets/parking1.png';

const bounds = [[0, 0], [700, 700]]; // 

const Map = ({ setReports }) => {
  const [activeAction, setActiveAction] = useState({});
  const [markers, setMarkers] = useState([]);
  const [showParking, setShowParking] = useState(false); 
  const [selectedParkingCoords, setSelectedParkingCoords] = useState(null); 
  const [activeRoute, setActiveRoute] = useState(null); 

const mapRef = useRef(); 
  // Icons לחניות
  const parkingIcon0 = L.divIcon({
    className: "custom-icon",
    html: `<img src="${parkingOption}" style=" height: 70px;transform: rotate(43deg) scale(1);"  />`, // חניה שמאלית למעלה
    iconSize: [100, 45],
    iconAnchor: [50, 25],
  });

  const parkingIcon1 = L.divIcon({
    className: "custom-icon",
    html: `<img src="${parkingOption}" style=" height: 70px; " />`, //  החניות הימניות 2
    iconSize: [100, 45],
    iconAnchor: [50, 25],
  }); 
   const parkingIcon2 = L.divIcon({
    className: "custom-icon",
    html: `<img src="${parkingOption}" style=" height: 70px; transform: rotate(-47deg) scale(1);" />`, // חניה למטה
    iconSize: [100, 45],
    iconAnchor: [50, 25],
  });
  const parkingIcon3 = L.divIcon({
    className: "custom-icon",
    html: `<img src="${parkingOption}" style=" height: 70px; " />`, //  החניות הימניות 2
    iconSize: [100, 45],
    iconAnchor: [50, 25],
  });

  const parkingIcon4 = L.divIcon({
    className: "custom-icon",
    html: `<img src="${parkingOption}" style=" height: 70px;transform: rotate(43deg) scale(1);"  />`, // חניה שמאלית למטה
    iconSize: [100, 45],
    iconAnchor: [50, 25],
  });



  const fireIcon = L.divIcon({
    className: 'fire-icon',
    html: `<img src="${fireIconImg}" alt="Fire Icon" width="50" height="50" />`, 
    iconSize: [20, 20], 
    iconAnchor: [10, 10] 
  });
  

  useEffect(() => {
    console.log(activeAction.name);
  }, [activeAction]);

  // הגדרת נקודות החניות
const parkingPoints = [
  { lat: 568.88, lng: 430.64, icon: parkingIcon1 },
  { lat: 635.85, lng: 86.92, icon: parkingIcon0 },
  { lat: 434.45, lng: 556.7, icon: parkingIcon3 },
  { lat: 168.99, lng: 64.50, icon: parkingIcon4 },
  { lat: 64.63, lng: 306.05, icon: parkingIcon2 }, 
];


  const MapClickHandler = () => {
    const map = useMapEvents({
      click(event) {
        if (activeAction && activeAction.activeIcon) { 
          const newMarker = event.latlng; 
          console.log(event.latlng);

          const icon = L.icon({
            iconUrl: activeAction.activeIcon, 
            iconSize: [32, 32], 
            iconAnchor: [16, 32], 
            popupAnchor: [0, -32], 
          });

          const timeSent = new Date().toLocaleString('he-IL', {
            timeStyle: 'short'
          });
          setReports((prevReports) => [
            ...prevReports,
            { id: Date.now(), text: activeAction.reportText, isRecording: false , time: timeSent },
          ]);
          setMarkers((prevMarkers) => [...prevMarkers, { position: newMarker, icon }]);
        }
      }
    });
  };


  
  const handleParkingClick = () => {
    setShowParking(prevState => !prevState);
 
  };

  const fireCoords = { lat: 570.11, lng: 177.91 }; // הנקודה של האש 

  const handleOnClickOnParking = (parkingName) => {
    console.log(`Clicked on: ${parkingName}`); // בדיקה: הדפסת שם החניה

    const route = parkingRoutes[parkingName]; // שליפת המסלול לפי שם החניה
    if (activeRoute === parkingName) {
      if (mapRef.current) {
        mapRef.current.eachLayer((layer) => {
          if (layer instanceof L.Polyline) {
            mapRef.current.removeLayer(layer); // מסיר את המסלול
          }
        });
      }
      setActiveRoute(null); 
    } else {
     
      const route = parkingRoutes[parkingName];
      if (route && mapRef.current) {
        const map = mapRef.current;
        const polyline = L.polyline(route.map(point => [point.lat, point.lng]), {
          color: 'blue',
          weight: 5,
          opacity: 0.7,
        }).addTo(map);
 
        setActiveRoute(parkingName); 
      }
    }
  };
 
  // הגדרת נקודות המסלול (נקודת התחלה + עיקולים + נקודת סיום)
const parkingRoutes = {
  parking1: [
    { lat: 568.88, lng: 430.64 }, // חניה 1
    { lat: 517.1040482417274, lng: 502.0748148148148 },  // עיקול 1
    {  lat: 468.0987528908293, lng: 453.0506172839506 },  // עיקול 2
    { lat: 558.10847904554, lng: 366.0076543209876 },  // עיקול 3
    fireCoords,                  // סיום
  ],
  parking2: [
    { lat: 635.85, lng: 86.92 }, // חניה 2
    { lat: 635.85, lng:  172.26425925925926 },  // עיקול 1
  
    fireCoords,                  // סיום
  ],
  parking3: [
    { lat: 434.45, lng: 556.7 }, // חניה 3
    { lat: 538.1063176778265, lng: 531.0891358024692},  // עיקול 1
    {  lat: 468.0987528908293, lng: 453.0506172839506 },  // עיקול 2
    { lat: 558.10847904554, lng: 366.0076543209876 },  // עיקול 3

    fireCoords,                  // סיום
  ],
  parking4: [
    { lat: 168.99, lng: 64.50 }, // חניה 4
    { lat: 220.071951931182, lng: 64.50},  // עיקול 1
     { lat: 220.0742213672812, lng: 175.9138271604938 },  // עיקול 2
    fireCoords,                  // סיום
  ],
  parking5: [
    { lat: 64.63, lng: 306.05 }, // חניה 5
    { lat: 64.63, lng: 179.91580246913583},  // עיקול 1
    fireCoords,                  // סיום
  ],
};


  return (
    <>
      <ActionsBar activeAction={activeAction} setActiveAction={setActiveAction} onParkingClick={handleParkingClick} />
      
      <MapContainer
        center={[350, 350]} 
        zoom={-1} 
        style={{ marginTop: '10%', height: "90%", width: "100%", borderRadius: '10px' }}
        crs={L.CRS.Simple} 
        ref={mapRef} 
      >
        <ImageOverlay
          url={basePlan}
          bounds={bounds}
        />
        {markers.map((marker, index) => (
          <Marker key={index} {...marker}>
            <Popup>{marker.popup}</Popup>
          </Marker>
        ))}

        {showParking && (
          <>
       
              {parkingPoints.map((point, index) => (
      <><Marker key={index} position={[point.lat, point.lng]} 
      icon={point.icon}
      eventHandlers={{
        click: () => handleOnClickOnParking(`parking${index + 1}`), // שמירת החניה שנלחצה
      }}

      >
                  <Popup>{`חניה ${index + 1}`}</Popup>
                </Marker>{selectedParkingCoords &&
                 <Polyline positions={routePoints.map(point => [point.lat, point.lng])} color="blue" weight={5} opacity={0.7} />}
                </>
    ))}
          </>
        )}
  <Marker  position={[ 570.1097758661681, 177.9148148148148]} icon={fireIcon} />


        <MapClickHandler />
      </MapContainer>
    </>
  );
};

export default Map;
