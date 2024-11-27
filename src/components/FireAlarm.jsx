import React, { useEffect, useRef } from 'react';
import alarmSound from '../assets/577314__trp__school-fire-alarm-loud-beep.flac';

const FireAlarm = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    // הפעלת הסאונד כשהרכיב נטען
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true; // סאונד בלולאה
      audio.play().catch((err) => console.error('Audio play error:', err));
    }

    return () => {
      // עצירת הסאונד כשהרכיב מתפרק
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  return <audio ref={audioRef} src={alarmSound} />;
};

export default FireAlarm;
