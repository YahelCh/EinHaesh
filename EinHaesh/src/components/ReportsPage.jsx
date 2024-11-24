import React, { useState, useRef } from 'react';
import './ReportsPage.css';

const ReportsPage = ({ location }) => {
  const [currentReport, setCurrentReport] = useState('');
  const [reports, setReports] = useState([]);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const [currentTranscript, setCurrentTranscript] = useState(''); // משתנה לשמירת התמלול בזמן אמת


  // פונקציה שמתחילה את ההקלטה
  const startRecording = () => {
    setRecording(true);
    audioChunksRef.current = [];
    setCurrentTranscript(''); // איפוס התמלול לפני כל הקלטה חדשה
  
    let finalTranscript = ''; // הגדרת משתנה חיצוני לתמלול הסופי
  
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
  
        // אתחיל את התמלול ברגע שההקלטה מתחילה
        recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        const recognition = recognitionRef.current;
  
        recognition.lang = 'he-IL';
        recognition.interimResults = true; // עדכון תמלול בזמן אמת
  
        recognition.onstart = () => {
          console.log('התחל תמלול');
        };
  
        recognition.onresult = (event) => {
          // רק תמלולים סופיים יתווספו
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) { // רק אם מדובר בתמלול סופי
              finalTranscript += event.results[i][0].transcript; // הוספת תמלול סופי לתוך finalTranscript
            }
          }
  
          console.log('תמלול עדכני: ', finalTranscript);
          setCurrentTranscript(finalTranscript); // עדכון state עם התמלול הנוכחי
        };
  
        recognition.onerror = (event) => {
          console.error('שגיאה בתמלול:', event.error);
        };
  
        recognition.onend = () => {
          console.log('ההכרה הסתיימה');
          console.log("finalTranscript: ", finalTranscript); // הדפסת התמלול הסופי
  
          // שולח את התמלול אם יש
          if (finalTranscript.trim() !== '') {
            sendTranscription(finalTranscript); // שליחה של התמלול
            setCurrentTranscript(finalTranscript); // עדכון state עם התמלול הסופי
          }
        };
  
        recognition.start();
  
        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
  
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
  
          // הוספת ההקלטה לרשימת הדיווחים (בלי תמלול בהתחלה)
          const newReport = { id: Date.now(), audioUrl, transcript: '', isRecording: false };
          setReports((prevReports) => [...prevReports, newReport]);
  
          // סיום ההקלטה
          recognition.stop(); // סיום התמלול
        };
  
        mediaRecorderRef.current.start();
      })
      .catch((err) => {
        console.error('Error accessing microphone:', err);
      });
  };
  

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const sendTranscription = (transcript) => {
    setReports((prevReports) => {
      const updatedReports = [...prevReports];
      const lastReportIndex = updatedReports.length - 1; // ניקח את הדיווח האחרון
  
      if (lastReportIndex >= 0) {
        updatedReports[lastReportIndex].transcript = transcript; // עדכון התמלול לדיווח האחרון
        updatedReports[lastReportIndex].text = `תמלול ההקלטה: ${transcript}`; // הוספת התמלול להודעה
        updatedReports[lastReportIndex].isTranscription = true; // הגדרת סוג ההודעה לתמלול
      }
  
      return updatedReports;
    });
  };
  

  const addReport = () => {
    if (currentReport.trim() !== '') {
      setReports((prevReports) => [
        ...prevReports,
        { id: Date.now(), text: currentReport, isRecording: false },
      ]);
      setCurrentReport(''); // נקה את השדה אחרי שליחה
    }
  };

  return (
    <div className="report-page">
      <div className="reports-title">עדכונים</div>
      <div className="reports-list">
        {reports.map((report) => (
          <React.Fragment key={report.id}>
            {/* הצגת ההקלטה */}
            {report.audioUrl && (
              <div>
                <audio controls src={report.audioUrl}></audio>
              </div>
            )}
            {/* הצגת טקסט אם קיים */}
            {report.text && (
       <div className={`chat-bubble ${report.isTranscription ? 'transcription' : ''}`}>
       <p>{report.text}</p>
     </div>
     
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="input-bar">
        <textarea
          value={currentReport}
          onChange={(e) => setCurrentReport(e.target.value)}
          placeholder="Type a message"
        />
        {currentReport && (
          <button onClick={addReport} className="send-button">
            ➤
          </button>
        )}
        <button
          onClick={recording ? stopRecording : startRecording}
          className={`record-button ${recording ? 'active' : ''}`}
        >
          {recording ? '⏹' : '🎙️'}
        </button>
      </div>
    </div>
  );
};

export default ReportsPage;
