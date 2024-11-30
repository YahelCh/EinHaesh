import React, { useState, useRef, useEffect } from 'react';
import './ReportsPage.css';
import man1 from '../assets/actions_icons/man1.png';
import man2 from '../assets/actions_icons/man2.png';
import man3 from '../assets/actions_icons/man3.png';
import man4 from '../assets/actions_icons/man4.png';
import man5 from '../assets/actions_icons/man5.png';

const ReportsPage = ({ reports, setReports,highlighted, setHighlighted }) => {
  const [currentReport, setCurrentReport] = useState('');
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const [currentTranscript, setCurrentTranscript] = useState('');
  
  const lastReportRef = useRef(null);

  const [userIndex, setUserIndex] = useState(0);

  const allReports = [
    {
      text: "דיווח ארוע לפיד בוער רמה 4",
       profilePic: man1 ,
    },
    {
      text: "כוחות כב\"ה בדרך",
    profilePic: man2 ,
    },
    {
      text: "דלת ראשית חדר אוכל יצאה משימוש",
     profilePic: man3,
    },
    {
      text: "2 פצועים לפינוי",
      profilePic: man4 ,
    },
    {
      text: "כוחות מד\"א בדרך",
      profilePic: man5 ,
    },
  ];
  

  useEffect(() => {
    // 
// let reportTimeout= setTimeout(() => {
//   addReport( allReports[0])
// }, 10);
    let index = 1; // אינדקס לדיווח הבא
    const interval = setInterval(() => {
      if (index < allReports.length) {
        addReport( allReports[index])
        index++;
      } else {
        clearInterval(interval); // עצירת הטיימר אם סיימנו לדחוף הכל
      }
    }, 3000); // כל 3 שניות
    return () => {clearInterval(interval); // ניקוי הטיימר
      
      // clearTimeout(reportTimeout)
      }
  }, []); 

  const startRecording = () => {
    setRecording(true);
    audioChunksRef.current = [];
    setCurrentTranscript('');
    let finalTranscript = '';

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);

        recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        const recognition = recognitionRef.current;

        recognition.lang = 'he-IL';
        recognition.interimResults = true;

        recognition.onstart = () => {
          console.log('התחל תמלול');
        };

        recognition.onresult = (event) => {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }

          setCurrentTranscript(finalTranscript);
        };

        recognition.onerror = (event) => {
          console.error('שגיאה בתמלול:', event.error);
        };

        recognition.onend = () => {
          if (finalTranscript.trim() !== '') {
            sendTranscription(finalTranscript);
            setCurrentTranscript(finalTranscript);
          }
        };

        recognition.start();

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);

          const timeSent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const newReport = { id: Date.now(), audioUrl, transcript: '', time: timeSent, isRecording: false };
          setReports((prevReports) => [...prevReports, newReport]);

          recognition.stop();
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
    const timeSent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const currentUser = allReports[userIndex];  // שליפה של המשתמש הנוכחי
    setReports((prevReports) => {
      const updatedReports = [...prevReports];
      const lastReportIndex = updatedReports.length - 1;

      if (lastReportIndex >= 0) {
        updatedReports[lastReportIndex].transcript = transcript;
        updatedReports[lastReportIndex].text = `תמלול ההקלטה: ${transcript}`;
        updatedReports[lastReportIndex].time = timeSent;
        updatedReports[lastReportIndex].profilePic = currentUser.profilePic; // הוספת פרופיל להקלטה

      }

      return updatedReports;
    });
  };

  const addReport = (content) => {
    console.log(content);
    if (content && content.text.trim() !== '') {
        const timeSent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // בחר את המשתמש הנוכחי לפי userIndex
        const currentUser = content;
        
        // עדכון ה-index כך שבכל דיווח המשתמש יתחלף
        const nextIndex = (userIndex + 1) % allReports.length;
        setUserIndex(nextIndex); // עדכון ה-userIndex אחרי יצירת הדיווח

        const newReport = {
            id: Date.now(),
            text: content.text,
            profilePic: content.profilePic, // הוספת תמונת פרופיל של המשתמש
            user: currentUser,  // הצגת המשתמש הנוכחי
            isRecording: false,
            time: timeSent,
        };

        setHighlighted(newReport.id);

        // הוספת הדיווח לרשימה
        setReports((prevReports) => [...prevReports, newReport]);
        setCurrentReport('');
    }
};


  

useEffect(()=>{
if(highlighted){
  setTimeout(() => {
    setHighlighted(null);
  }, 2000);}
  
},[highlighted])

useEffect(() => {
  if (lastReportRef.current) {
    lastReportRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [reports]);

  return (
    <div className="report-page">
      <div className="reports-title">עדכונים</div>
      <div className="reports-list">
        {reports.map((report) => (
          <div 
          // className='check' 
          key={report.id}  ref={report.id === reports[reports.length - 1].id ? lastReportRef : null}>
         <div className="profile-circle">
              <img src={report.profilePic} className="profile-image" />
            </div>
            {/* {report.user&&<div className='user'></div>} */}
            {/* הצגת ההקלטה */}
                        {report.audioUrl && (
              <div className="audio-container">
                <audio controls src={report.audioUrl}></audio>
                <div className="message-meta">
                  <span className="time">{report.time}</span>
                </div>
              </div>
            )}
            {/* הצגת טקסט אם קיים */}
            {report.text && (
              <div
                className={`chat-bubble ${report.isOutgoing ? 'outgoing' : ''
                  } ${report.isTranscription ? 'transcription' : ''}  ${highlighted === report.id ? "highlight" : ""}`}
              >
                <p>{report.text}</p>
                <div className="message-meta">
                  <span className="time">{report.time}</span>
                  {/* <span className="seen">{report.isSeen ? '✓✓' : ''}</span> */}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="input-bar">
        <input className='textbox' type={'text'}   onChange={(e) => setCurrentReport(e.target.value)}
          placeholder="Type a message"/>
        {/* <textarea className='textbox'
          value={currentReport}
        
        /> */}
        {currentReport && (
   <button onClick={() => addReport({ text: currentReport, profilePic: allReports[userIndex].profilePic })} className="send-button">            ➤
          </button>
        )}
        <button
          onClick={recording ? stopRecording : startRecording}
          className={`record-button ${recording ? 'active' : 'inactive'}`}
        >
          {recording ? '⏹' : ''}
        </button>
      </div>
    </div>
  );
};

export default ReportsPage;
