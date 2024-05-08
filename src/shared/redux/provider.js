'use client';
import {store, dispatch} from './store';
import {Provider} from 'react-redux';

import {getInitialPublicData} from '@/shared/redux/slices/user';
export function Providers({children}) {
  dispatch(getInitialPublicData());

  return <Provider store={store}>{children}</Provider>;
}
