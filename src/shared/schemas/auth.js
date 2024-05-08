import * as Yup from 'yup';
import {organizationRoles} from '../constants/roles';

const commonFieldsSchema = {
  firstName: Yup.string()
    .min(3, 'At least 3 characters')
    .max(255)
    .required('First name is required'),
  lastName: Yup.string()
    .min(3, 'At least 3 characters')
    .max(255)
    .required('Last name is required'),
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(
      8,
      'Must contain at least 8 characters and at least 1 uppercase letter'
    )
    .matches(
      /[A-Z]/,
      'Must contain at least 8 characters and at least 1 uppercase letter'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
};

export const loginUserSchema = Yup.object().shape({
  email: commonFieldsSchema.email,
  password: Yup.string().required('Password is required'),
});

export const registerManagerSchema = Yup.object().shape({
  firstName: commonFieldsSchema.firstName,
  lastName: commonFieldsSchema.lastName,
  password: commonFieldsSchema.password,
  confirmPassword: commonFieldsSchema.confirmPassword,
  organizationName: Yup.string()
    .max(255)
    .required('Organization name is required'),
  timezone: Yup.object().required('Timezone is required'),
});

export const registerEmployeeSchema = Yup.object().shape({
  firstName: commonFieldsSchema.firstName,
  lastName: commonFieldsSchema.lastName,
  password: commonFieldsSchema.password,
  confirmPassword: commonFieldsSchema.confirmPassword,
});

export const sendResetPasswordLinkSchema = Yup.object().shape({
  email: commonFieldsSchema.email,
});

export const resetPasswordSchema = Yup.object().shape({
  password: commonFieldsSchema.password,
  confirmPassword: commonFieldsSchema.confirmPassword,
});

export const inviteManagerSchema = Yup.object().shape({
  firstName: commonFieldsSchema.firstName,
  lastName: commonFieldsSchema.lastName,
  email: commonFieldsSchema.email,
});

export const inviteEmployeeSchema = Yup.object().shape({
  firstName: commonFieldsSchema.firstName,
  lastName: commonFieldsSchema.lastName,
  email: commonFieldsSchema.email,
  employeeId: Yup.string().required('Employee id is required'),
  organizationRole: Yup.object()
    .typeError('Organization role is required')
    .required('Organization role is required')
    .label('Organization role')
    .test('Check Role', (item) => {
      return Object.keys(organizationRoles).includes(item.value);
    }),
});
