import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import appReducer from './slices/app';
import userReducer from './slices/user';
import organizationReducer from './slices/organization';
import departmentReducer from './slices/department';
import timeTrackingReducer from './slices/timeTracking';

import {clearStore} from './utils';

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const appPersistConfig = {
  key: 'app',
  storage,
  keyPrefix: 'redux-',
};

const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
};

const organizationPersistConfig = {
  key: 'organization',
  storage,
  keyPrefix: 'redux-',
};

const departmentPersistConfig = {
  key: 'department',
  storage,
  keyPrefix: 'redux-',
};

const timeTrackingPersistConfig = {
  key: 'timeTracking',
  storage,
  keyPrefix: 'redux-',
};

const reduxAppReducer = combineReducers({
  app: persistReducer(appPersistConfig, appReducer),
  user: persistReducer(userPersistConfig, userReducer),
  organization: persistReducer(organizationPersistConfig, organizationReducer),
  department: persistReducer(departmentPersistConfig, departmentReducer),
  timeTracking: persistReducer(timeTrackingPersistConfig, timeTrackingReducer),
});

const rootReducer = (state, action) => {
  if (action.type === clearStore.type) {
    storage.removeItem('persist:root');
    storage.removeItem('persist:app');
    storage.removeItem('persist:user');
    localStorage.clear();
    return reduxAppReducer(undefined, action);
  }

  return reduxAppReducer(state, action);
};

export {rootPersistConfig, rootReducer};
