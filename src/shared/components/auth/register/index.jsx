'use client';

import PropTypes from 'prop-types';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

// Components
import useSubmitFunction from '@/shared/hooks/useSubmitFunction';
import CustomMsg from '@/shared/components/general/customMsg';
import Form from '@/components/auth/register/form';

// Constant
import {AUTH_ROUTES} from '@/shared/constants/appRoutes';
import {ROLES} from '@/shared/constants/roles';

// Redux
import {registerManager, registerEmployee} from '@/shared/redux/slices/user';
import {jwtDecode} from '@/shared/utils/jwtUtils';

export default function Registerform({token}) {
  const router = useRouter();
  const {isLoading, onSubmitFunction} = useSubmitFunction();
  const {isTokenExpired, success, decodedToken} = jwtDecode({token});
  const [isRegisterd, setIsRegisterd] = useState(false);

  const {manager} = ROLES;

  const isManager = decodedToken.systemRole === manager.value;

  const onSubmit = (data) => {
    data.token = token;
    data.timezone = data?.timezone?.value || undefined;
    onSubmitFunction({
      reduxFunction: isManager ? registerManager : registerEmployee,
      data,
      onSuccess: () => setIsRegisterd(true),
    });
  };

  if (isTokenExpired || !success)
    return (
      <CustomMsg text="Invitation Link Expired. Please contact support and try again." />
    );
  if (isRegisterd)
    return (
      <CustomMsg
        text={'Registration Successful. Please login.'}
        onClick={() => router.push(AUTH_ROUTES.login)}
        btnText="Login"
      />
    );
  return (
    <Form
      onSubmit={onSubmit}
      isLoading={isLoading}
      isManager={isManager}
      decodedToken={decodedToken}
    />
  );
}

Registerform.propTypes = {
  token: PropTypes.string.isRequired,
};
