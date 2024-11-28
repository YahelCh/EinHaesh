
import parkingSignIcon from '../assets/blabla.png';
import React,{useState,useEffect} from 'react';
import { useMap ,Marker} from 'react-leaflet';

const ParkingLegendMark = ({ handleParkingClick}) => {

    const map = useMap();

    const [iconSize, setIconSize] = useState(40);
    const [iconAnchor, setIconAnchor] = useState([20, 20]);

    useEffect(() => {

        const updateIconSize = () => {
            const zoomLevel = map.getZoom();
            if (zoomLevel == 0) {
                setIconSize(40)
                setIconAnchor([20, 20])
                return;
            }
            const newSize = (40 + zoomLevel) * (zoomLevel * 2)
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


    const parkingSign = L.divIcon({
        className: "custom",
        html: `<div ><img src="${parkingSignIcon}" style=" height:${iconSize}px;"  /></div>`, // חניה שמאלית למטה
        iconSize: [iconSize, iconSize],
        iconAnchor: iconAnchor,
        popupAnchor: [0, -32]
    })

    const position = [240, 48]
    return <Marker position={position} icon={parkingSign} eventHandlers={{
        click: () => handleParkingClick(), // הצגת חניות
    }}></Marker>

}

export default ParkingLegendMark;