import React from 'react';
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function AlertWithToastify() {
    const [alertPosition, setAlertPosition] = useState(null)
    const showAlert = () => {
        const newAlertPosition = [152, 105]
        toast.error("  כיבוי ברז גז", {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true, 
            pauseOnHover: true,
            draggable: true,
            onClose: () => {  // הוספתי פונקציה שתופעל כשסוגרים את ההתראה
                setAlertPosition(newAlertPosition); // עדכון המיקום של ההתראה במפה
            },
        });
        // const [showAlert, setshowAlert] = useState(true);
  };

  return (
    <div>
      <button onClick={showAlert}>הצג התראה</button>

  <ToastContainer />

  
  {alertPosition && (
                <div>
                    {/* כאן הייתי מוסיף את הלוגיקה שלך להוספת סימון במפה, למשל */}
                    <p>הסמן נמצא במיקום: {alertPosition.join(", ")}</p>
                </div>
            )}
    </div>
    
  );
}

export default AlertWithToastify;