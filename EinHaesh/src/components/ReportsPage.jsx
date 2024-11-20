// ReportsPage.js
import React, { useState } from 'react';
import './ReportsPage.css'; // ייבוא קובץ ה-CSS החדש

const ReportsPage = ({ location }) => {
  const [currentReport, setCurrentReport] = useState('');
  const [reports, setReports] = useState([]);
  const [showAddReportButton, setShowAddReportButton] = useState(false);

  const addReport = () => {
    if (currentReport.trim() !== "") {
      setReports((prevReports) => [
        ...prevReports,
        { id: Date.now(), text: currentReport, location: location },
      ]);
      setCurrentReport("");  // נקה את השדה אחרי שליחה
    }
  };

  return (
    <div className="report-page">
      <h2>הוספת דיווח</h2>
      {showAddReportButton && (
        <button onClick={() => setShowAddReportButton(false)}>הוסף דיווח</button>
      )}
      <textarea
        value={currentReport}
        onChange={(e) => setCurrentReport(e.target.value)}
        placeholder="הקלד את הדיווח כאן..."
      />
      <button onClick={addReport}>שלח דיווח</button>

      <div className="reports-list">
        <h3>הדיווחים שלך:</h3>
        {reports.map((report) => (
          <div key={report.id}>
            <p>{report.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
