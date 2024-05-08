import React, {Fragment} from 'react';
import authStyle from '../auth.module.css';

import Link from 'next/link';
import PropTypes from 'prop-types';

// MUI
import Grid from '@mui/material/Grid';

// React hook form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

// Components
import PasswordInput from '@/components/inputs/passwordInput';
import ControlledTextInput from '@/shared/components/inputs/controlledTextInput';
import Button from '@/shared/components/button';
import ControlledSearchAbleSelectField from '@/components/selects/controlledSearchAbleSelectField';

// Constant
import {
  registerManagerSchema,
  registerEmployeeSchema,
} from '@/shared/schemas/auth';
import {sanitizedAlphabetInput} from '@/shared/utils/general';
import {TIMEZONES} from '@/shared/constants/times';

export default function Form({onSubmit, isLoading, isManager, decodedToken}) {
  const registerSchema = isManager
    ? registerManagerSchema
    : registerEmployeeSchema;

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: decodedToken?.firstName || '',
      lastName: decodedToken?.lastName || '',
    },
  });

  const timezonesOptions = Object.keys(TIMEZONES).map((key) => ({
    label: key,
    value: TIMEZONES[key].value,
  }));

  return (
    <form
      className={authStyle.form}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <div style={{height: '80px'}}></div>
      <h1 className={authStyle.heading}>Sign Up</h1>

      <div className={authStyle.registerPersonal}>
        <span>Personal Details</span>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <ControlledTextInput
            name={'firstName'}
            label="First Name"
            error={errors}
            placeholder="Enter your first Name"
            control={control}
            onInput={(e) =>
              (e.target.value = sanitizedAlphabetInput(e.target.value))
            }
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <ControlledTextInput
            name={'lastName'}
            label="Last Name"
            error={errors}
            placeholder="Enter your last Name"
            control={control}
            onInput={(e) =>
              (e.target.value = sanitizedAlphabetInput(e.target.value))
            }
            fullWidth
            type="text"
          />
        </Grid>
      </Grid>

      <PasswordInput
        name={'password'}
        error={errors}
        control={control}
        label="Password"
        sx={{mt: 2.6}}
      />

      <PasswordInput
        name={'confirmPassword'}
        error={errors}
        control={control}
        label="Confirm Password"
        sx={{mt: 2.6}}
      />

      {isManager && (
        <Fragment>
          <div className={authStyle.registerOrg}>
            <span>Organiztion Details</span>
          </div>

          <ControlledTextInput
            name={'organizationName'}
            label="Organization Name"
            error={errors}
            placeholder="Enter your organization Name"
            control={control}
            fullWidth
          />

          <ControlledSearchAbleSelectField
            control={control}
            label="Time Zone"
            name="timezone"
            errors={errors}
            options={timezonesOptions}
            getOptionLabel={(option) => option.label}
            sx={{mt: 2}}
          />
        </Fragment>
      )}

      <Button
        type={'submit'}
        loading={isLoading}
        btnText="Register"
        sx={{
          my: 2.6,
          width: '100%',
          backgroundColor: 'var(--primary)',
          color: 'white',
        }}
      />
      <Link href={`/auth/login`} className={authStyle.link}>
        Already have an account?
      </Link>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  isManager: PropTypes.bool,
  decodedToken: PropTypes.object,
};
