'use client';

import Link from 'next/link';
import style from './style.module.css';
import {usePathname} from 'next/navigation';

import {sideBarLinks} from '@/shared/constants/siderBarLinks';
import {getCurrentUser} from '@/shared/redux/slices/user';
import {useSelector} from 'react-redux';

export default function Sidebar({onClick}) {
  const pathname = usePathname();
  const currentUser = useSelector(getCurrentUser);

  return (
    <div className={style.container}>
      <h1 style={{color: 'white', fontWeight: 'bold', padding: '11px'}}>
        Time Clock
      </h1>
      <hr />

      <div
        style={{
          overflowY: 'auto',
        }}
      >
        {sideBarLinks({currentUserRole: currentUser?.systemRole}).map(
          (item) => {
            const isActive = pathname === item.link;
            return (
              <Link
                href={item.link}
                key={item.id}
                className={style.linkStyle}
                onClick={onClick}
              >
                <div
                  className={`${style.nameAndIconsWrapper} ${
                    isActive ? style.active : ''
                  }`}
                >
                  {item.icon}
                  {item.title}
                </div>
                <div
                  className={style.borderSideColor}
                  style={{display: isActive ? 'block' : 'none'}}
                ></div>
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
}
