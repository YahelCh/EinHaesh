import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { MapContainer, ImageOverlay, Marker, Polygon, useMap, useMapEvents, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import BaseMap from './FullSizeImage'
import basePlan from '../assets/mapmap.png';
import { EditControl } from 'react-leaflet-draw';
import ActionsBar from './ActionsBar';
import MapLegend from './MapLegend';
import fireIconImg from '../assets/fire-icon.svg';
import ParkingLegendMark from './ParkingLegendMark'
import locationIcon from '../assets/location.svg'
import parkingOption from '../assets/parking1.png';
import Taim from './Taim';
import PopupMessage from './PopupMessage';
import { TaimLst } from '../store/dec'
import AlertWithToastify from './Alerts';
import ShowWay from './showWay';
import MyLocation from './MyLocation'


const bounds = [[0, 0], [700, 700]];
const fireCoords = { lat: 510.11, lng: 177.91 };

const FireIcon = () => {
  const map = useMap();
  const fireSizeRef=useRef({ width: 30, height: 30 })
  const [fireIconSize, setFireIconSize] = useState({ width: 30, height: 30 });
  const [sizeIncreasedOnce, setSizeIncreasedOnce] = useState(false);
  // const firePosition = [500.1097758661681, 177.9148148148148];

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
      fireSizeRef.current={
        width:  fireSizeRef.current.width + 10,
        height:  fireSizeRef.current.height + 10,
      }
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

  // useEffect(() => {
  //   const updateFireIconSize = () => {
  //     const zoomLevel = map.getZoom();
  //     let newWidth = 50;

  //     if (zoomLevel === -1) {
  //       newWidth = 50;
  //     } else if (zoomLevel === 0) {
  //       newWidth = 50;
  //     } else if (zoomLevel === 1) {
  //       newWidth = 100;
  //     } else if (zoomLevel >= 2) {
  //       newWidth = 150;
  //     }

  //     setFireIconSize({ width: newWidth });
  //   };

  //   const focusOnFire = () => {
  //     const zoomLevel = map.getZoom();
  //     map.setView(firePosition, zoomLevel, { animate: true });
  //   };

  //   map.on("zoom", () => {
  //     updateFireIconSize();
  //     focusOnFire();
  //   });
  //   return () => {
  //     map.off("zoom", updateFireIconSize);
  //     map.off("zoom", focusOnFire);
  //   };
  // }, [map]);

  const fireIcon = L.divIcon({
    className: "fire-icon",
    html: `<img src="${fireIconImg}" alt="Fire Icon" style="width: ${ fireSizeRef.current.width}px; height: ${ fireSizeRef.current.height}px;" />`,
    iconSize: [ fireSizeRef.current.width,  fireSizeRef.current.height],
    iconAnchor: [ fireSizeRef.current.width / 2,  fireSizeRef.current.height / 2],
  });

  return <Marker position={fireCoords} icon={fireIcon} />;
};

const Map = ({ setReports, setHighlighted, isWaringOpoup }) => {
  const [activeAction, setActiveAction] = useState({});
  const [markers, setMarkers] = useState([]);
  const [showParking, setShowParking] = useState(false);
  const [selectedParkingCoords, setSelectedParkingCoords] = useState(null);
  const [activeRoute, setActiveRoute] = useState(null);
  const [taimList, setTaimList] = useState(TaimLst);
  const [locationMarker, setLocationMarker] = useState(null);
  const [zoomMap, setZoomMap] = useState(false);

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
        html: `<img src="${parkingOption}" style=" height: ${iconSize}px;transform: rotate(43deg) scale(1); zIndex: 70;"  />`, // חניה שמאלית למעלה
        iconSize: [iconSize, iconSize],
        iconAnchor: iconAnchor,
      }),
      parkingIcon1: L.divIcon({
        className: "custom-icon",
        html: `<img src="${parkingOption}" style=" height: ${iconSize}px;transform: rotate(-4deg) scale(1) zIndex: 70;" />`, //  החניות הימניות 2
        iconSize: [iconSize, iconSize],
        iconAnchor: iconAnchor,
      }),
      parkingIcon2: L.divIcon({
        className: "custom-icon",
        html: `<img src="${parkingOption}" style=" height: ${iconSize}px; transform: rotate(-47deg) scale(1); zIndex: 70;" />`, // חניה למטה
        iconSize: [iconSize, iconSize],
        iconAnchor: iconAnchor,
      }),
      parkingIcon3: L.divIcon({
        className: "custom-icon",
        html: `<img src="${parkingOption}" style=" height: ${iconSize}px; rotate(-4deg) scale(1)zIndex: 70;" />`, //  החניות הימניות 2
        iconSize: [iconSize, iconSize],
        iconAnchor: iconAnchor,
      }),

      parkingIcon4: L.divIcon({
        className: "custom-icon",
        html: `<img src="${parkingOption}" style=" height: ${iconSize}px;transform: rotate(43deg) scale(1);zIndex: 70;"  />`, // חניה שמאלית למטה
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
    { lat: 530.73, lng: 455.39, icon: 'parkingIcon1' },
    { lat: 590.76, lng: 91.39, icon: 'parkingIcon0' },
    // { lat: 434.45, lng: 556.7, icon: 'parkingIcon3' },
    { lat: 410.09, lng: 572.32, icon: 'parkingIcon3' },

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

          const newReport = { id: Date.now(), text: activeAction.reportText, isRecording: false, time: timeSent }

          setReports((prevReports) => [
            ...prevReports,
            newReport,

          ]);

          setHighlighted(newReport.id)

          setMarkers((prevMarkers) => [...prevMarkers, { position: newMarker, icon }]);
        }
      }
    });
  };

 // הנקודה של האש 
  const [activeMessage, setActiveMessage] = useState(null)
  const [popupMessage, setPopupMessage] = useState(""); 

  const handleOnClickOnParking = (parkingName) => {
    console.log(`Clicked on: ${parkingName}`);
    const route = parkingRoutes[parkingName];

    const { message, arrow } = parkingMessages[parkingName]; // נשלוף גם את ההודעה וגם את סוג החץ
    setActiveMessage(message);
    setPopupMessage({ message, arrow }); 

    if (activeRoute === parkingName) {
      setActiveRoute(null);
      setLocationMarker(null);
      setPopupMessage("");
      if (mapRef.current) {
        mapRef.current.eachLayer((layer) => {
          if (layer instanceof L.Polyline) {
            mapRef.current.removeLayer(layer);
          }
        });
      }
    } else {

      setActiveRoute(parkingName);
      setLocationMarker(route[0]);
      if (route && mapRef.current) {
        const map = mapRef.current;
        const polyline = L.polyline(route.map((point) => [point.lat, point.lng]), {
          color: '#007AFF',
          weight: 5,
          opacity: 0.7,
        }).addTo(map);
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
      { lat: 530.73, lng: 455.39 }, // חניה 1
      { lat: 503.0883480794362, lng: 537.2487562189054 },  // עיקול 1
      { lat: 427.12579532552115, lng: 474.26231438228706 },  // עיקול 2
      { lat: 520.08489899098095, lng: 371.2844809033711 },  // עיקול 3
      { lat: 520.08489899098095, lng: 208.2844809033711 },  // עיקול 4

      fireCoords,                  // סיום
    ],
    parking2: [
      { lat: 590.76, lng: 91.39 }, // חניה 2
      { lat: 590.85, lng: 172.26425925925926 },  // עיקול 1

      fireCoords,                  // סיום
    ],
    parking3: [
      // { lat: 434.45, lng: 556.7 }, // חניה 3
      { lat: 410.09, lng: 572.32 },
      { lat: 503.0883480794362, lng: 537.2487562189054 },  // עיקול 1
      { lat: 427.12579532552115, lng: 474.26231438228706 },  // עיקול 2
      { lat: 520.08489899098095, lng: 371.2844809033711 },  // עיקול 3
      { lat: 520.08489899098095, lng: 208.2844809033711 },  // עיקול 4
      fireCoords,                  // סיום
    ],
    parking4: [
      { lat: 168.99, lng: 64.50 }, // חניה 4
      { lat: 205.071951931182, lng: 64.50 },  // עיקול 1
      { lat: 205.0742213672812, lng: 175.9138271604938 },  // עיקול 2
      fireCoords,                  // סיום
    ],
    parking5: [
      { lat: 64.63, lng: 306.05 }, // חניה 5
      { lat: 64.63, lng: 179.91580246913583 },  // עיקול 1
      fireCoords,                  // סיום
    ],
  };
  const parkingMessages = {
    parking1: { message: 'לך 100 מטר לכיוון מקור השריפה, 3 דלתות ושער 1 בדרך', arrow: 'rightArrow' },
    parking2: { message: 'לך 200 מטר לכיוון מקור השריפה, 2 דלתות ושער 1 בדרך', arrow: 'rightArrow' },
    parking3: { message: 'לך 400 מטר לכיוון מקור השריפה, 4 דלתות ושער 1 בדרך', arrow: 'leftArrow' },
    parking4: { message: 'לך 300 מטר לכיוון מקור השריפה, 3 דלתות ושער 1 בדרך', arrow: 'rightArrow' },
    parking5: { message: 'לך 700 מטר לכיוון מקור השריפה, 2 דלתות ושער 1 בדרך', arrow: 'leftArrow' }
  };
  
 
  const LocationIcon = () => {
    const map = useMap();
    const [locationIconSize, setLocationIconSize] = useState({ width: 40, height: 40 });

    useEffect(() => {
      const updateIconSize = () => {
        const zoomLevel = map.getZoom();
        let newSize = 40;

        if (zoomLevel === -1) newSize = 40;
        else if (zoomLevel === 0) newSize = 50;
        else if (zoomLevel === 1) newSize = 60;
        else if (zoomLevel >= 2) newSize = 80;

        setLocationIconSize({ width: newSize, height: newSize });
      };

      map.on("zoom", updateIconSize);
      return () => map.off("zoom", updateIconSize);
    }, [map]);

    if (!locationMarker) {
      return null;
    }

    const locationDivIcon = L.divIcon({
      className: "location-icon",
      html: `<img src="${locationIcon}" style="width: ${locationIconSize.width}px; height: ${locationIconSize.height}px; pointer-events: none;" />`,
      iconSize: [locationIconSize.width, locationIconSize.height],
      iconAnchor: [locationIconSize.width / 2, locationIconSize.height / 2],
    });

    // Marker component with zIndex customization
    return (
      <Marker
        position={[locationMarker.lat, locationMarker.lng]}
        icon={locationDivIcon}
        zIndexOffset={1000} // Adjust the zIndexOffset here
      />
    );
  };
  const handleClosePopup = () => {
    setPopupMessage(""); // לסגור את ההודעה
  };
  



  return (
    <div className='map'>
      <ActionsBar activeAction={activeAction} setActiveAction={setActiveAction} />
      <MapContainer
        center={[350, 350]}
        zoomControl={false}
        zoom={-1}
        maxBounds={bounds}
        maxBoundsViscosity={0.8}
        style={{ position: 'absolute', bottom: '0', height: "90%", width: "100%", borderRadius: '10px' }}
        crs={L.CRS.Simple}
        ref={mapRef}
      >
        {!isWaringOpoup && <AlertWithToastify />}
        <ShowWay setZoomMap={setZoomMap} />
        <BaseMap zoomMap={zoomMap} />
        {!zoomMap &&
          markers.map((marker, index) => (
            <Marker key={index} {...marker}>

            </Marker>
          ))}

        {!zoomMap && <ParkingLegendMark handleParkingClick={() => setShowParking(prev => !prev)} />}
        {/* {!zoomMap && <MyLocation/>} */}

        {/* {showParking && !zoomMap && (
        <BaseMap /> */}
        
        {markers.map((marker, index) => (
          <Marker key={index} {...marker} />
        ))}
        {locationMarker && <LocationIcon />}
        <ParkingLegendMark handleParkingClick={() => setShowParking(prev => !prev)} />
  
        {showParking && (
          <>
            {parkingPoints.map((point, index) => (
              <>
                <Parking 
                  index={index} 
                  key={index} 
                  position={[point.lat, point.lng]} 
                  iconKey={point.icon} 
                />
              </>
            ))}
          </>
        )}

        {!zoomMap && <FireIcon />}
        {!zoomMap && <Taim handleClickZone={handleClickZone} taimList={taimList} />}
  
        {/* הצגת ההודעה הקופצת */}
        {popupMessage && <PopupMessage message={popupMessage} onClose={handleClosePopup} />}
  
      
        <Taim handleClickZone={handleClickZone} taimList={taimList} />
        <MapClickHandler />
      </MapContainer>
    </div>
  );
  
};

export default Map;
