import showWay from '../assets/showWay.png';

import React, { useState, useEffect } from 'react';
import { Marker } from 'react-leaflet';


const ShowWay = ({ setZoomMap }) => {
  const iconSize = 40;

  const showWayIcon = L.divIcon({
    className: "custom",
    html: `<div ><img src="${showWay}" style=" height:${iconSize}px;"  /></div>`, // חניה שמאלית למטה
    iconSize: [iconSize, iconSize],
    iconAnchor: [20, 20],
    popupAnchor: [0, -32]
  })


  const ZoomMap = () => {
    setZoomMap(prev=> !prev)
  };

  return <Marker position={[73.52908908290192, 45.412020223598944]} icon={showWayIcon} eventHandlers={{
    click: ZoomMap,
  }}></Marker>
};

export default ShowWay;
