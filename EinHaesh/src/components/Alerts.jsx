import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useAlertContext } from './AlertContext.jsx';

const AlertWithToastify = () => {
  const [alertPosition, setAlertPosition] = useState(null);
  const { updateAlertPosition } = useAlertContext();

  // פונקציה שמגדירה את אפשרויות ההתראה
  const configureToast = (message, onCloseAction) => {
    return {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClose: onCloseAction,
    };
  };

  // הצגת התראה
  const showAlert = () => {
    const newAlertPosition = [32.0853, 34.7818]; // מיקום לדוגמה של תל אביב
    const message = "כיבוי ברז גז";

    toast.error(message, configureToast(message, () => {
      setAlertPosition(newAlertPosition); // עדכון מיקום ההתראה
    }));
  };

  return (
    <div>
      <button onClick={showAlert}>הצג התראה</button>

      {/* רכיב ההתראה */}
      <ToastContainer />

      {/* הצגת מיקום ההתראה על המפה */}
      {alertPosition && (
        <div style={{ marginTop: "20px", height: "400px" }}>
          <h2>מיקום ההתראה:</h2>
          <p>X: {alertPosition[0]}, Y: {alertPosition[1]}</p>

          {/* מפה עם סימון המיקום */}
          <MapContainer center={alertPosition} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={alertPosition}>
              <Popup>
                התראה: כיבוי ברז גז
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default AlertWithToastify;
