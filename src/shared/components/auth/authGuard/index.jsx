'use client';

import {useEffect} from 'react';
import {useRouter, usePathname} from 'next/navigation';

// Constants
import {AUTH_ROUTES, DASHBOARD_ROUTES} from '@/constants/appRoutes';

// Redux
import {useSelector} from 'react-redux';
import {getCurrentUser} from '@/redux/slices/user';

// Hooks
import useRouteType from '@/hooks/useRouteType';

export default function AuthGuard({children}) {
  const router = useRouter();
  const pathname = usePathname();

  const {isPublicRoute, isDashboardRoute, isAuthRoute} = useRouteType();

  const currentUser = useSelector(getCurrentUser);

  useEffect(() => {
    if (currentUser?.id) {
      if (isPublicRoute || isDashboardRoute) return;
      else router.push(DASHBOARD_ROUTES.home);
    } else if (!isPublicRoute && !isAuthRoute) router.push(AUTH_ROUTES.login);
  }, [currentUser, router, pathname]);

  return children;
}
