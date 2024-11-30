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
        if (indexMark >= positionList.length - 5)
            clearInterval(interval)
        setPosition(positionList[indexMark++])
    };

    useEffect(() => {
        const initialTimer = setTimeout(() => {
            if (positionList.length === 0) {
                let element = [95, 160];

                const newPositions1 = [];
                for (let index = 0; index < 150; index++) {
                    const newLatitude = element[0] + (index * 2);  // הוספת 2 לכל תיאום רוחב
                    newPositions1.push([newLatitude, element[1]]);
                }

                element = newPositions1[newPositions1.length - 1]
                for (let index = 0; index < 130; index++) {
                    const newLatitude = element[0] + (index * (-2));  // הוספת 2 לכל תיאום רוחב
                    newPositions1.push([newLatitude, element[1]]);
                }

                element = newPositions1[newPositions1.length - 1]
                for (let index = 0; index < 198; index++) {
                    const newLongitude = element[1] + (index * 2);  // הוספת 2 לכל תיאום אורך
                    newPositions1.push([element[0], newLongitude]);
                }

                element = newPositions1[newPositions1.length - 1]
                for (let index = 0; index < 80; index++) {
                    const newLatitude = element[0] + (index * 2);  // הוספת 2 לכל תיאום רוחב
                    newPositions1.push([newLatitude, element[1]]);
                }

                setPositionList(newPositions1);
            }
        }, 10000);

    }, [positionList.length]);

    useEffect(() => {
        if (positionList.length > 0) {
            const interval = setInterval(() => moveMarker(interval), 30); // עדכון המיקום כל שנייה
            return () => clearInterval(interval); // עצור את העדכון כשיש שינוי
        }
    }, [positionList]);

    return (<>
        {position &&
            <Marker position={position} icon={locationIcon}>
            </Marker>}</>)

}

export default MyLocation;