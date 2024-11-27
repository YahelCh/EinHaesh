import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { MapContainer, ImageOverlay, Marker, Polygon, useMap, useMapEvents, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import basePlan from '../assets/mapmap.png';
import { EditControl } from 'react-leaflet-draw';
import ActionsBar from './ActionsBar';
import MapLegend from './MapLegend';
import fireIconImg from '../assets/fire-icon.svg';
import parkingOption from '../assets/parking1.png';
import Taim from './Taim';
import { TaimLst } from '../store/dec'

const bounds = [[0, 0], [700, 700]];

const Map = ({ setReports }) => {
  const [activeAction, setActiveAction] = useState({});
  const [markers, setMarkers] = useState([]);
  const [showParking, setShowParking] = useState(false);
  const [selectedParkingCoords, setSelectedParkingCoords] = useState(null);
  const [activeRoute, setActiveRoute] = useState(null);
  const [taimList, setTaimList] = useState(TaimLst);

  const mapRef = useRef();


  const Parking = ({ position, index, iconKey }) => {

    const map = useMap();

    const [iconSize, setIconSize] = useState(70);
    const [iconAnchor, setIconAnchor] = useState([50, 25]);

    useEffect(() => {

      const updateIconSize = () => {
        const zoomLevel = map.getZoom();
        if (zoomLevel == 0) {
          setIconSize(70)
          setIconAnchor([50, 25])
          return;
        }
        const newSize = (70 + zoomLevel) * (zoomLevel * 2)
        setIconSize(newSize); // עדכון גודל האייקון בהתאם לזום
        setIconAnchor([newSize / 2, newSize / 2])
        console.log('new size ', newSize);

      };
      // מאזינים לשינויי זום
      map.on('zoom', updateIconSize);

      // מנקים את המאזין כשעוזבים את הרכיב
      return () => {
        map.off('zoom', updateIconSize);
      };
    }, [map]);


    const parkingIcons = {
      parkingIcon0: L.divIcon({
        className: "custom-icon",
        html: `<img src="${parkingOption}" style=" height: ${iconSize}px;transform: rotate(43deg) scale(1);"  />`, // חניה שמאלית למעלה
        iconSize: [iconSize, iconSize],
        iconAnchor: iconAnchor,
      }),
      parkingIcon1: L.divIcon({
        className: "custom-icon",
        html: `<img src="${parkingOption}" style=" height: ${iconSize}px; " />`, //  החניות הימניות 2
        iconSize: [iconSize, iconSize],
        iconAnchor: iconAnchor,
      }),
      parkingIcon2: L.divIcon({
        className: "custom-icon",
        html: `<img src="${parkingOption}" style=" height: ${iconSize}px; transform: rotate(-47deg) scale(1);" />`, // חניה למטה
        iconSize: [iconSize, iconSize],
        iconAnchor: iconAnchor,
      }),
      parkingIcon3: L.divIcon({
        className: "custom-icon",
        html: `<img src="${parkingOption}" style=" height: ${iconSize}px; " />`, //  החניות הימניות 2
        iconSize: [iconSize, iconSize],
        iconAnchor: iconAnchor,
      }),

      parkingIcon4: L.divIcon({
        className: "custom-icon",
        html: `<img src="${parkingOption}" style=" height: ${iconSize}px;transform: rotate(43deg) scale(1);"  />`, // חניה שמאלית למטה
        iconSize: [iconSize, iconSize],
        iconAnchor: iconAnchor,
      })

    }
    return <Marker position={position}
      icon={parkingIcons[iconKey]}
      eventHandlers={{
        click: () => handleOnClickOnParking(`parking${index + 1}`), // שמירת החניה שנלחצה
      }}

    >
      <Popup>{`חניה ${index + 1}`}</Popup>
    </Marker>
  }

  useEffect(() => {
    console.log(activeAction.name);
  }, [activeAction]);

  // הגדרת נקודות החניות
  const parkingPoints = [
    { lat: 568.88, lng: 430.64, icon: 'parkingIcon1' },
    { lat: 635.85, lng: 86.92, icon: 'parkingIcon0' },
    { lat: 434.45, lng: 556.7, icon: 'parkingIcon3' },
    { lat: 168.99, lng: 64.50, icon: 'parkingIcon4' },
    { lat: 64.63, lng: 306.05, icon: 'parkingIcon2' },
  ];

  const MapClickHandler = () => {
    const map = useMapEvents({
      click(event) {
        if (activeAction && activeAction.activeIcon) {
          const newMarker = event.latlng;
          console.log(event.latlng);

          // const icon = L.icon({
          //   iconUrl: activeAction.activeIcon,
          //   iconSize: [32, 32],
          //   iconAnchor: [16, 32],
          //   popupAnchor: [0, -32],
          // });

          const icon = L.divIcon({
            className: "custom",
            html: `<div class="action-mark"><img src="${activeAction.activeIcon}" style=" height: 20px;, width:20px;"  /></div>`, // חניה שמאלית למטה
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -32]
          })

          const timeSent = new Date().toLocaleString('he-IL', {
            timeStyle: 'short'
          });
          setReports((prevReports) => [
            ...prevReports,
            { id: Date.now(), text: activeAction.reportText, isRecording: false, time: timeSent },
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

  const handleClickZone = (index) => {
    let desc = TaimLst.find(f => f.id == index)?.desc
    const timeSent = new Date().toLocaleString('he-IL', {
      timeStyle: 'short'
    });
    setReports((prevReports) => [
      ...prevReports,
      { id: Date.now(), text: `${activeAction.reportText} ${desc}`, isRecording: false, time: timeSent },
    ]);

    if (activeAction.name == "pinuy") {
      setTaimList((prevList) =>
        prevList.map((item) =>
          item.id === index ? { ...item, numAsirim: 0 } : item
        )
      );

    }
  };

  // הגדרת נקודות המסלול (נקודת התחלה + עיקולים + נקודת סיום)
  const parkingRoutes = {
    parking1: [
      { lat: 568.88, lng: 430.64 }, // חניה 1
      { lat: 517.1040482417274, lng: 502.0748148148148 },  // עיקול 1
      { lat: 468.0987528908293, lng: 453.0506172839506 },  // עיקול 2
      { lat: 558.10847904554, lng: 366.0076543209876 },  // עיקול 3
      fireCoords,                  // סיום
    ],
    parking2: [
      { lat: 635.85, lng: 86.92 }, // חניה 2
      { lat: 635.85, lng: 172.26425925925926 },  // עיקול 1

      fireCoords,                  // סיום
    ],
    parking3: [
      { lat: 434.45, lng: 556.7 }, // חניה 3
      { lat: 538.1063176778265, lng: 531.0891358024692 },  // עיקול 1
      { lat: 468.0987528908293, lng: 453.0506172839506 },  // עיקול 2
      { lat: 558.10847904554, lng: 366.0076543209876 },  // עיקול 3

      fireCoords,                  // סיום
    ],
    parking4: [
      { lat: 168.99, lng: 64.50 }, // חניה 4
      { lat: 220.071951931182, lng: 64.50 },  // עיקול 1
      { lat: 220.0742213672812, lng: 175.9138271604938 },  // עיקול 2
      fireCoords,                  // סיום
    ],
    parking5: [
      { lat: 64.63, lng: 306.05 }, // חניה 5
      { lat: 64.63, lng: 179.91580246913583 },  // עיקול 1
      fireCoords,                  // סיום
    ],
  };
  const FireIcon = () => {
    const map = useMap();
    const [fireIconSize, setFireIconSize] = useState({ width: 50, height: 50 });
    const [sizeIncreasedOnce, setSizeIncreasedOnce] = useState(false);
    const firePosition = [570.1097758661681, 177.9148148148148];

    useEffect(() => {
      // פונקציה שמגדילה את גודל האש כל 3 שניות אחרי שהגדלנו פעם ראשונה
      const increaseFireSize = () => {
        setFireIconSize(prevSize => {
          if (prevSize.width >= 160) {
            return prevSize; // אם הגודל הגיע ל-160, לא לשנות אותו
          }
          return {
            width: prevSize.width + 10,
            height: prevSize.height + 10,
          };
        });
      };

      const initialTimer = setTimeout(() => {
        setSizeIncreasedOnce(true);
        increaseFireSize();
      }, 10000);

      let intervalTimer;
      if (sizeIncreasedOnce) {
        intervalTimer = setInterval(increaseFireSize, 3000);
      }

      return () => {
        clearTimeout(initialTimer);
        if (intervalTimer) {
          clearInterval(intervalTimer);
        }
      };
    }, [sizeIncreasedOnce]);

    useEffect(() => {
      const updateFireIconSize = () => {
        const zoomLevel = map.getZoom();
        let newWidth = 50;

        if (zoomLevel === -1) {
          newWidth = 50;
        } else if (zoomLevel === 0) {
          newWidth = 50;
        } else if (zoomLevel === 1) {
          newWidth = 100;
        } else if (zoomLevel >= 2) {
          newWidth = 150;
        }

        setFireIconSize({ width: newWidth });
      };

      const focusOnFire = () => {
        const zoomLevel = map.getZoom();
        map.setView(firePosition, zoomLevel, { animate: true });
      };

      map.on("zoom", () => {
        updateFireIconSize();
        focusOnFire();
      });
      return () => {
        map.off("zoom", updateFireIconSize);
        map.off("zoom", focusOnFire);
      };
    }, [map]);

    const fireIcon = L.divIcon({
      className: "fire-icon",
      html: `<img src="${fireIconImg}" alt="Fire Icon" style="width: ${fireIconSize.width}px; height: ${fireIconSize.height}px;" />`,
      iconSize: [fireIconSize.width, fireIconSize.height],
      iconAnchor: [fireIconSize.width / 2, fireIconSize.height / 2],
    });

    return <Marker position={firePosition} icon={fireIcon} />;
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

          </Marker>
        ))}



        {showParking && (
          <>

            {parkingPoints.map((point, index) => (
              <>
                <Parking index={index} key={index} position={[point.lat, point.lng]}
                  iconKey={point.icon} />
                {/* <Marker 
                eventHandlers={{
                  click: () => handleOnClickOnParking(`parking${index + 1}`), // שמירת החניה שנלחצה
                }}

              >
                <Popup>{`חניה ${index + 1}`}</Popup>
              </Marker> */}

                {selectedParkingCoords &&
                  <Polyline positions={routePoints.map(point => [point.lat, point.lng])} color="blue" weight={5} opacity={0.7} />}
              </>
            ))}
          </>
        )}
        <FireIcon />
        <Taim handleClickZone={handleClickZone} taimList={taimList} />
        <MapClickHandler />
      </MapContainer>
    </>
  );
};

export default Map;
