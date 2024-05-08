import style from './auth.module.css';

import Image from 'next/image';

export default function AuthLayout({children}) {
  return (
    <div>
      <Image
        src="/images/logo.png"
        alt="logo"
        width={100}
        height={100}
        className={style.logo}
      />
      {children}
    </div>
  );
}
