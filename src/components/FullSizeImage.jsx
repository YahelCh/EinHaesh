import { useMap,ImageOverlay } from 'react-leaflet';
import basePlan from '../assets/mapmap.png';
import mapZoom from '../assets/mapZoom.png';



const BaseMap = ({zoomMap }) => {
  const map = useMap();

  // קבלת גבולות המפה (bounds)
  const bounds = map.getBounds();

  // המרת bounds לפורמט המתאים ל-ImageOverlay
  const imageBounds = [[0,0],[650,720]]
  //   [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
  //   [bounds.getNorthEast().lat, bounds.getNorthEast().lng],
  // ];

  return (
    <ImageOverlay
      url={zoomMap?mapZoom:basePlan}
      bounds={imageBounds}
    />
  );
};

export default BaseMap;
