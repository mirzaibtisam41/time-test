export const ManagerTableHeaderFields = {
  firstName: {
    title: 'First Name',
    type: 'string',
  },
  lastName: {
    title: 'Last Name',
    type: 'string',
  },
  email: {
    title: 'Email',
    type: 'string',
  },
  organization: {
    title: 'Organization',
    type: 'string',
  },
  status: {
    title: 'Status',
    type: 'status',
  },
};

export const managerTableSearchKeys = {
  name: 'firstName',
  email: 'email',
  organization: 'organization',
};

// -----------------------------Employees Detail

export const employeeTableHeaderFields = {
  employeeId: {
    title: 'Employee Id',
    type: 'string',
  },
  firstName: {
    title: 'First Name',
    type: 'string',
  },
  lastName: {
    title: 'Last Name',
    type: 'string',
  },
  email: {
    title: 'Email',
    type: 'string',
  },
  organizationRole: {
    title: 'Role',
    type: 'string',
  },
};

export const employeeTableSearchKeys = {
  employeeId: 'employeeId',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  organizationRole: 'organizationRole',
};
