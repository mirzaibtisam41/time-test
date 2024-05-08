import style from '../auth.module.css';

// Components
import Loginform from '@/shared/components/auth/login';
import SideContainer from '@/shared/components/auth/sideContainer';

export default function Login() {
  return (
    <div className={style.container}>
      <div className={style.form}>
        <Loginform />
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
