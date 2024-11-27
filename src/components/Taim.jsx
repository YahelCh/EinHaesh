import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, ImageOverlay, Marker, Polygon, useMap, useMapEvents, Popup, Polyline } from 'react-leaflet';


const Label = ({ zone }) => {

  const calculateCentroid = (coordinates) => {
    let area = 0;
    let x = 0;
    let y = 0;

    for (let i = 0; i < coordinates.length; i++) {
      const [x1, y1] = coordinates[i];
      const [x2, y2] = coordinates[(i + 1) % coordinates.length];

      const crossProduct = x1 * y2 - x2 * y1;
      area += crossProduct;
      x += (x1 + x2) * crossProduct;
      y += (y1 + y2) * crossProduct;
    }

    area = area / 2;
    x = x / (6 * area);
    y = y / (6 * area);

    return [x, y];
  };

  const centroid = calculateCentroid(zone.points.map(({ lat, lng }) => [lat, lng])

  );

  const map = useMap();

  const point = map.latLngToLayerPoint(centroid); // ממיר קואורדינטות למיקום על המסך

  const asir = `(${zone.numAsirim})`

  const style = {
    position: 'absolute',
    color:'#363636',
    top: point.y,
    left: point.x,
    transform: 'translate(-50%, -50%)',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '10px',
    pointerEvents: 'none',
    zIndex: 1000,
    textAlign: 'center'
  };

  return <div style={style}>
    <div >{zone.desc}</div>
    <div >{asir} </div>
  </div>
};

const Taim = ({ handleClickZone,taimList }) => {

  return (
    <>

      {taimList.map((zone, index) => <div key={index}><Polygon
        key={zone.id}
        positions={zone.points}
        fillColor={'transparent'} // zone.color
        pathOptions={{
          color: zone.color || 'transparent',
          fillOpacity: zone.color ? 0.5 : 0,
          weight: 1,
        }}
        eventHandlers={{
          click: () => handleClickZone(zone.id),
        }}

      />   <Label zone={zone} />
      </div>
      )}
    </>
  );
};

export default Taim;