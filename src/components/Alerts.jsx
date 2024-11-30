import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Alerts.css';

const AlertWithToastify = () => {

  const notify = (text = "ההודעה שלך כאן!") => toast(text);

  useEffect(() => {
    notify("יש לסגור ברז גז מס’ 675")
    
    
    const timeout1 = setTimeout(() => {
      notify("יש להוריד שאלטר בלוח חשמל מערבי אגף 6");
    }, 2500);

    const timeout2 = setTimeout(() => {
      notify("יש לערוך סריקה אגף 6 תאים 1-12");
    }, 5000);

    // ניקוי הטיימרים במקרה של unmount
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  return (
    <div>
      <ToastContainer
        position="bottom-left" // מיקום ההודעה בצד שמאל למעלה
      />
    </div>
  );
};

export default AlertWithToastify;