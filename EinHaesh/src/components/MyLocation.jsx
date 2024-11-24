import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
// import { positionList } from '../store/dec';
import location from '../assets/location.png'

const MyLocation = () => {
    let indexMark = 0
    const [position, setPosition] = useState(); // מיקום התחלתי (תל אביב לדוגמה)
    const [positionList, setPositionList] = useState([]);
   
    const locationIcon = new L.Icon({
        iconUrl: location, // אייקון דיפולטיבי של Leaflet
        iconSize: [50, 50], // גודל האייקון
        iconAnchor: [12, 41], // איפה לארח את ה-Anchor של האייקון
        popupAnchor: [0, -41], // הגדרת מיקום ה-popup יחסית לאייקון
      });
    // פונקציה שמעדכנת את המיקום על פי תזוזה מדומיינת
    const moveMarker = (interval) => {
        if (indexMark == positionList.length-2)
            clearInterval(interval)
        setPosition(positionList[indexMark++])
    };

    useEffect(() => {
        if (positionList.length === 0) {
            let element = [190.0853, 204.7818];

            const newPositions1 = [];
            for (let index = 0; index < 70; index++) {
                const newLongitude = element[1] + (index * 2);  // הוספת 2 לכל תיאום אורך
                newPositions1.push([element[0], newLongitude]);
            }

            element = newPositions1[newPositions1.length - 1]
            for (let index = 0; index < 150; index++) {
                const newLatitude = element[0] + (index * 2);  // הוספת 2 לכל תיאום רוחב
                newPositions1.push([newLatitude, element[1]]);
            }

            element = newPositions1[newPositions1.length - 1]
            for (let index = 0; index < 50; index++) {
                const newLatitude = element[0] + (index * (-2));  // הוספת 2 לכל תיאום רוחב
                newPositions1.push([newLatitude, element[1]]);
            }

            element = newPositions1[newPositions1.length - 1]
            for (let index = 0; index < 110; index++) {
                const newLongitude = element[1] + (index * (-2));  // הוספת 2 לכל תיאום רוחב
                newPositions1.push([element[0], newLongitude]);
            }

            setPositionList(newPositions1);
        }
    }, [positionList.length]);

    useEffect(() => {
        if (positionList.length > 0) {
            const interval = setInterval(() => moveMarker(interval), 50); // עדכון המיקום כל שנייה
            return () => clearInterval(interval); // עצור את העדכון כשיש שינוי
        }
    }, [positionList]);

    return (<>
        {position &&
            <Marker position={position} icon={locationIcon}>
                <Popup>Marker moving automatically</Popup>
            </Marker>}</>)

}

export default MyLocation;