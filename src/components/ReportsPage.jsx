import React, { useState, useRef } from 'react';
import './ReportsPage.css';

const ReportsPage = ({ reports, setReports }) => {
  const [currentReport, setCurrentReport] = useState('');
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const [currentTranscript, setCurrentTranscript] = useState('');

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
    setReports((prevReports) => {
      const updatedReports = [...prevReports];
      const lastReportIndex = updatedReports.length - 1;

      if (lastReportIndex >= 0) {
        updatedReports[lastReportIndex].transcript = transcript;
        updatedReports[lastReportIndex].text = `תמלול ההקלטה: ${transcript}`;
        updatedReports[lastReportIndex].time = timeSent;
      }

      return updatedReports;
    });
  };

  const addReport = () => {
    if (currentReport.trim() !== '') {
      const timeSent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setReports((prevReports) => [
        ...prevReports,
        {
          id: Date.now(),
          text: currentReport,
          isRecording: false,
          time: timeSent,
        },
      ]);
      setCurrentReport('');
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
          className={`chat-bubble ${
            report.isOutgoing ? 'outgoing' : ''
          } ${report.isTranscription ? 'transcription' : ''}`}
        >
          <p>{report.text}</p>
          <div className="message-meta">
            <span className="time">{report.time}</span>
            {/* <span className="seen">{report.isSeen ? '✓✓' : ''}</span> */}
          </div>
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
