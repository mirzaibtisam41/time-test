import {IoHomeOutline} from 'react-icons/io5';
import {TbReportSearch} from 'react-icons/tb';
import {GoOrganization} from 'react-icons/go';
import {IoSettingsOutline} from 'react-icons/io5';
import {ROLES} from './roles';

const {admin, manager, employee} = ROLES;

export const SIDEBAR_LINKS = {
  dashboard: {
    id: 1,
    title: 'Dashboard',
    link: '/dashboard',
    icon: <IoHomeOutline size={22} color="#fff" />,
    allowed: [admin.value, manager.value, employee.value],
  },
  reports: {
    id: 2,
    title: 'Reports',
    link: '/dashboard/reports',
    icon: <TbReportSearch size={22} color="#fff" />,
    allowed: [manager.value],
  },
  department: {
    id: 3,
    title: 'Department',
    link: '/dashboard/departments',
    icon: <GoOrganization size={22} color="#fff" />,
    allowed: [manager.value],
  },
  company: {
    id: 4,
    title: 'Company',
    link: '/dashboard/company',
    icon: <GoOrganization size={22} color="#fff" />,
    allowed: [manager.value],
  },
  configuration: {
    id: 5,
    title: 'Configuration',
    link: '/dashboard/configuration',
    icon: <IoSettingsOutline size={22} color="#fff" />,
    allowed: [manager.value],
  },
};
