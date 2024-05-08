'use client';
import style from './style.module.css';

import {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// MUI
import {CircularProgress} from '@mui/material';

// Components
const Form = dynamic(() => import('./form'), {
  ssr: false,
  loading: () => <CircularProgress size={100} sx={{color: 'var(--primary)'}} />,
});

// Constants
import {status} from '@/shared/constants/timeTrackingConstant';

// Redux
import {useSelector} from 'react-redux';
import {getCurrentTimeTracking} from '@/redux/slices/timeTracking';

export default function HomeComponent() {
  const timeTracking = useSelector(getCurrentTimeTracking);

  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const elapsed = now - startTime;
        setElapsedTime(elapsedTime + elapsed);
        setStartTime(now);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, elapsedTime]);

  useEffect(() => {
    setElapsedTime(timeTracking?.activeTime || 0);
    setIsRunning(timeTracking?.currentStatus === status.checkin.value);
    setStartTime(new Date().getTime());
  }, [timeTracking]);

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <Image src={'/images/logo.png'} alt="logo" width={100} height={100} />
      </div>
      <div className={style.dividerBtwLogoAndText}></div>
      <Form elapsedTime={elapsedTime} />
    </div>
  );
}
