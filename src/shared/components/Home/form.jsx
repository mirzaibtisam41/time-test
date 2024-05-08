'use client';
import style from './style.module.css';

import PropTypes from 'prop-types';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

// MUI
import {Grid} from '@mui/material';

// React hook form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

// Components
import ControlledSearchAbleSelectField from '@/components/selects/controlledSearchAbleSelectField';
import ControlledTextInput from '@/components/inputs/controlledTextInput';
import Button from '@/components/button';
import useSubmitFunction from '@/shared/hooks/useSubmitFunction';

// Constants
import {status} from '@/constants/timeTrackingConstant';
import {timeTracker} from '@/schemas/home';
import {getFormattedTime} from '@/shared/utils/timeUtils';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  getDepartments,
  setDepartmentForTracking,
  getDepartmentForTracking,
} from '@/redux/slices/department';
import {
  getOrganizations,
  setOrganizationForTracking,
  getOrganizationForTracking,
} from '@/redux/slices/organization';
import {
  setEmployeeIdForTracking,
  getEmployeeForTracking,
  isFetchingInitialPublicData,
} from '@/redux/slices/user';
import {
  getCurrentTimeTracking,
  startTracking,
} from '@/redux/slices/timeTracking';

export default function Form({elapsedTime}) {
  // Redux
  const dispatch = useDispatch();

  const router = useRouter();

  const {onSubmitFunction, isLoading} = useSubmitFunction();

  const departments = useSelector(getDepartments);
  const organizations = useSelector(getOrganizations);
  const selectedDepartment = useSelector(getDepartmentForTracking);
  const selectedOrganization = useSelector(getOrganizationForTracking);
  const selectedEmployeeId = useSelector(getEmployeeForTracking);
  const isFetching = useSelector(isFetchingInitialPublicData);

  const organizationArr = organizations.map((org) => ({
    id: org.id,
    label: org.name,
  }));

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(timeTracker),
    defaultValues: {
      organizationId: selectedOrganization,
      departmentId: selectedDepartment,
      employeeId: selectedEmployeeId,
    },
  });

  const value = watch();

  const departmentArr = departments
    .filter((dep) => dep.organizationId === watch('organizationId')?.id)
    .map((item) => ({
      id: item.id,
      label: item.name,
    }));

  const onSubmit = async () => {
    await onSubmitFunction({
      reduxFunction: startTracking,
      data: {status: status.checkin.value},
    });
  };

  const handleActions = async (action) => {
    await onSubmitFunction({
      reduxFunction: startTracking,
      data: {status: action},
    });
  };

  const currentTimeTracking = useSelector(getCurrentTimeTracking);

  const currentStatus = currentTimeTracking?.currentStatus;

  const isCheckin = currentStatus === status.checkin.value;
  const isCheckout = currentStatus === status.checkout.value;
  const isOnBreak = currentStatus === status.break.value;

  const checkoutBtnDisabled =
    isFetching || isCheckout || !currentTimeTracking?.currentStatus;

  const returnFromBreakBtnDisabled = isFetching || isCheckin || !isOnBreak;

  useEffect(() => {
    if (value.organizationId)
      dispatch(setOrganizationForTracking(value.organizationId));

    if (value.departmentId)
      dispatch(setDepartmentForTracking(value.departmentId));

    if (value.employeeId) dispatch(setEmployeeIdForTracking(value.employeeId));
  }, [value]);

  useEffect(() => {
    if (value.organizationId?.id !== selectedOrganization?.id) {
      setValue('departmentId', '');
      dispatch(setDepartmentForTracking(''));
    }
  }, [value.organizationId]);

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h5 className={style.date}>
          {new Date().toLocaleString('us').split(',')[0]}
        </h5>
        <h5 className={style.time}>
          {isFetching ? 'Syncing...' : getFormattedTime(elapsedTime)}
        </h5>
      </div>

      {isOnBreak && !isFetching && <h3 className={style.breakTxt}>On Break</h3>}

      <ControlledSearchAbleSelectField
        name="organizationId"
        label="Select Company"
        control={control}
        options={organizationArr}
        errors={errors}
        getOptionLabel={(option) => option.label}
        sx={{mt: 2}}
        disabled={isFetching || isCheckin || isOnBreak}
      />

      <ControlledSearchAbleSelectField
        name="departmentId"
        label="Department"
        control={control}
        options={departmentArr}
        errors={errors}
        getOptionLabel={(option) => option.label}
        sx={{mt: 2}}
        disabled={isFetching || isCheckin}
      />

      <ControlledTextInput
        label="Employee ID"
        name="employeeId"
        control={control}
        error={errors}
        placeholder={'Enter Employee ID'}
        sx={{my: 2}}
        disabled={isFetching || isCheckin || isOnBreak}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Button
            type={'submit'}
            btnText={'Check In'}
            variant="outlined"
            sx={{
              color: '#fff',
              fontWeight: 'bold',
              py: 1.8,
              backgroundColor: '#49ACA8',
              '&:hover': {
                color: 'var(--primary)',
              },
            }}
            disabled={isFetching || isLoading || isCheckin || isOnBreak}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Button
            type={'button'}
            btnText={isOnBreak ? 'Return / Check Out' : 'Check Out'}
            onClick={() => handleActions('checkout')}
            variant="outlined"
            sx={{
              color: 'var(--primary)',
              fontWeight: 'bold',
              py: 1.8,
              backgroundColor: '#e8f3f3',
            }}
            disabled={isLoading || checkoutBtnDisabled}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Button
            type={'button'}
            btnText={'Leave on Break'}
            onClick={() => handleActions('break')}
            variant="outlined"
            sx={{
              color: 'var(--primary)',
              fontWeight: 'bold',
              py: 1.8,
              backgroundColor: '#e8f3f3',
            }}
            disabled={isFetching || isLoading || !isCheckin}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Button
            type={'button'}
            btnText={'Return from Break'}
            onClick={() => handleActions('checkin')}
            variant="outlined"
            sx={{
              color: 'var(--primary)',
              fontWeight: 'bold',
              py: 1.8,
              backgroundColor: '#e8f3f3',
            }}
            disabled={isLoading || returnFromBreakBtnDisabled}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Button
            type={'button'}
            btnText={'Log On to dashboard'}
            onClick={() => router.push('/dashboard')}
            sx={{
              backgroundColor: 'var(--primary)',
              fontWeight: 'bold',
              py: 1.7,
            }}
          />
        </Grid>
      </Grid>
    </form>
  );
}

Form.propTypes = {
  formatTime: PropTypes.func,
  elapsedTime: PropTypes.number,
};
