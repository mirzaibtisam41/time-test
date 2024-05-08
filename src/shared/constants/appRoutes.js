export const appInfo = {
  title: 'Time Clock',
  description:
    'Manage employee time tracking and attendance with the Time Clock website',
};

const path = (root, path) => `${root}${path}`;

export const ROOT_ROUTE = '/';
export const AUTH_ROOT = '/auth';
export const DASHBOARD_ROOT = '/dashboard';

export const AUTH_ROUTES = {
  login: path(AUTH_ROOT, '/login'),
  register: path(AUTH_ROOT, '/register'),
  forgotPassword: path(AUTH_ROOT, '/forgot-password'),
};

export const DASHBOARD_ROUTES = {
  home: path(DASHBOARD_ROOT, '/'),
};
