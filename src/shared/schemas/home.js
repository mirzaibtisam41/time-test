import * as Yup from 'yup';

export const timeTracker = Yup.object().shape({
  organizationId: Yup.object()
    .typeError('Organization is required')
    .required('Organization is required'),
  departmentId: Yup.object()
    .typeError('Department is required')
    .required('Department is required'),
  employeeId: Yup.string().required('Employee Id is required'),
});
