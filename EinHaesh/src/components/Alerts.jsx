import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AlertWithToastify() {
  const showAlert = () => {
    toast.error("כיבוי ברז ג'", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div>
      <button onClick={showAlert}>הצג התראה</button>
      <ToastContainer />
    </div>
  );
}

export default AlertWithToastify;