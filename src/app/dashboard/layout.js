import style from './style.module.css';

import Sidebar from '@/components/dashboard/sideBar';
import TopBar from '@/components/dashboard/topBar';
import Footer from '@/shared/components/dashboard/footer';

import GlobalLayout from './globalLayout';

export default function DashboardLayout({children}) {
  return (
    <GlobalLayout>
      <div className={style.container}>
        <div className={style.siderBarWrapper}>
          <Sidebar />
        </div>
        <div className={style.topBarAndChildrenWrapper}>
          <TopBar />
          <div className={style.children}>{children}</div>
          <Footer />
        </div>
      </div>
    </GlobalLayout>
  );
}
