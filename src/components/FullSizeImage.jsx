import { useMap,ImageOverlay } from 'react-leaflet';
import basePlan from '../assets/mapmap.png';



const BaseMap = ({ }) => {
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
      url={basePlan}
      bounds={imageBounds}
    />
  );
};

export default BaseMap;
