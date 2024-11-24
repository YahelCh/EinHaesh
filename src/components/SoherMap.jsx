import React, { useEffect, useState } from 'react';
import { Marker, Polyline, Popup } from 'react-leaflet';
// import { positionList } from '../store/dec';
import location from '../assets/location.png'

const SoherMap = () => {

    const blockedPoints = [
        { id: 1, lat: 392.8183265324425, lng: 114.0505991254472, description: 'נקודה חסומה 1' },
        { id: 2, lat: 575.8429442625891, lng: 114.0505991254472, description: 'נקודה חסומה 2' },
        { id: 3, lat: 575.8429442625891, lng: 350.88500198761994, description: 'נקודה חסומה 3' },
        { id: 4, lat: 466.853302542487, lng: 468.82469191890505, description: 'נקודה חסומה 4' },
        { id: 5, lat: 623.8744226716291, lng: 642.7357601226645, description: 'נקודה חסומה 5' }
    ];

    const positions = blockedPoints.map(point => [point.lat, point.lng]);


    return <Polyline positions={positions} color="blue" weight={5} opacity={0.7} />


}

export default SoherMap;