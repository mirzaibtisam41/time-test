import Button from '@/shared/components/button/IconButtonWithMenu';
import DialogWrapper from '@/components/dialogueWrapper';
import {ROLES} from '@/shared/constants/roles';
import useSubmitFunction from '@/shared/hooks/useSubmitFunction';
import {reInviteManager} from '@/shared/redux/slices/user';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import {BsFillSendCheckFill} from 'react-icons/bs';

export default function Dialogue({open, setOpen, userToReInvite}) {
  const {isLoading, onSubmitFunction} = useSubmitFunction();

  const handleReInvite = async () => {
    const {email} = userToReInvite;
    await onSubmitFunction({
      reduxFunction: reInviteManager,
      data: {email, role: ROLES.manager.value},
      onSuccess: () => setOpen(false),
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogWrapper
      title="Re-invite Manager"
      open={open}
      handleClose={handleClose}
    >
      <Box>
        <Typography fontWeight={'bold'}>Confirm Email</Typography>
        <Typography style={{wordBreak: 'break-word'}}>
          {userToReInvite?.email}
        </Typography>
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
          btnText={'Re Invite'}
          type="submit"
          icon={BsFillSendCheckFill}
          handleClick={handleReInvite}
          loading={isLoading}
        />
      </Box>
    </DialogWrapper>
  );
}

Dialogue.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  userToReInvite: PropTypes.object,
};
