import React, { useEffect, useRef, useState } from 'react';
import alarmSound from '../assets/577314__trp__school-fire-alarm-loud-beep.flac';

const FireAlarm = () => {
  const audioRef = useRef(null);
  const [isAudioReady, setIsAudioReady] = useState(false);

  const handleUserInteraction = () => {
    // שים לב שהמשתמש ביצע אינטראקציה כלשהי עם הדף
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true; // הפעלת השמע בלולאה
      audio.play().catch((err) => console.error('Audio play error:', err));
      setIsAudioReady(true);
    }
  };

  useEffect(() => {
    // מציג הודעה למשתמש או פעולה עם אינטראקציה
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('scroll', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  return (
    <div>
      {!isAudioReady && (
        <div>
          {/* <p>השעון יתחיל לפעול ברגע שתבצע פעולה כלשהי (כמו גלילה או לחיצה).</p> */}
        </div>
      )}
      <audio ref={audioRef} src={alarmSound} />
    </div>
  );
};

export default FireAlarm;
