import Button from '@/components/button/IconButtonWithMenu';
import DialogWrapper from '@/components/dialogueWrapper';
import ControlledTextInput from '@/components/inputs/controlledTextInput';
import ControlledSearchAbleSelectField from '@/components/selects/controlledSearchAbleSelectField';
import {ROLES, organizationRoles} from '@/shared/constants/roles';
import useSubmitFunction from '@/shared/hooks/useSubmitFunction';
import {getCurrentOrganization} from '@/shared/redux/slices/organization';
import {inviteEmployee} from '@/shared/redux/slices/user';
import {inviteEmployeeSchema} from '@/shared/schemas/auth';
import {yupResolver} from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import {useForm} from 'react-hook-form';
import {BsFillSendCheckFill} from 'react-icons/bs';
import {useSelector} from 'react-redux';

export default function Dialogue({open, setOpen}) {
  const {
    handleSubmit,
    control,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(inviteEmployeeSchema),
  });

  const {isLoading, onSubmitFunction} = useSubmitFunction();

  const currentOrganization = useSelector(getCurrentOrganization);

  const onSuccess = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    const {firstName, lastName, email, employeeId, organizationRole} = data;

    const employeeObj = {
      firstName,
      lastName,
      email,
      employeeId,
      organizationRole: organizationRole?.value,
      systemRole: ROLES.employee?.value,
      organizationId: currentOrganization?.id,
    };

    onSubmitFunction({
      reduxFunction: inviteEmployee,
      data: employeeObj,
      onSuccess,
    });
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const organizationRoleOptions = Object.keys(organizationRoles).map((key) => ({
    label: organizationRoles[key].label,
    value: organizationRoles[key].value,
  }));

  return (
    <DialogWrapper
      title="Invite Employee"
      open={open}
      handleClose={handleClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{flexGrow: 1}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ControlledTextInput
                name={'firstName'}
                label="First Name"
                error={errors}
                placeholder="Enter first name"
                control={control}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ControlledTextInput
                name={'lastName'}
                label="Last Name"
                error={errors}
                placeholder="Enter last name"
                control={control}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextInput
                name={'email'}
                label="Email"
                error={errors}
                placeholder="Enter email"
                control={control}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextInput
                name={'employeeId'}
                label="Employee Id"
                error={errors}
                placeholder="Enter employee id"
                control={control}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledSearchAbleSelectField
                control={control}
                label="Organization Role"
                name="organizationRole"
                errors={errors}
                options={organizationRoleOptions}
                getOptionLabel={(option) => option.label}
              />
            </Grid>
          </Grid>
        </Box>
        <Button
          sx={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            textTransform: 'capitalize',
            borderRadius: '5px',
            letterSpacing: 1,
            padding: '.5rem',
            width: '100%',
            marginTop: '1rem',
            '&:hover': {
              backgroundColor: 'var(--primary)',
              opacity: '0.9',
            },
          }}
          btnText={'Send Invite'}
          type="submit"
          icon={BsFillSendCheckFill}
          loading={isLoading}
          handleClick={() => {}}
        />
      </form>
    </DialogWrapper>
  );
}

Dialogue.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
