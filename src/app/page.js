'use client';
import style from './auth/auth.module.css';

import SideContainer from '@/components/auth/sideContainer';
import HomeComponent from '@/components/home';

export default function Home() {
  return (
    <div className={style.container}>
      <div className={style.form}>
        <HomeComponent />
      </div>
      <div className={style.side}>
        <SideContainer
          heading={'Welcome Back!'}
          description={
            'To keep connected with us please login with your personal info'
          }
        />
      </div>
    </div>
  );
}
