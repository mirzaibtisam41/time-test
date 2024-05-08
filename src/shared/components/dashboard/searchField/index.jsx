import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import {IoIosSearch} from 'react-icons/io';
import PropTypes from 'prop-types';

export default function SearchBox({label, handleSearch}) {
  return (
    <TextField
      size="medium"
      label={label}
      variant="outlined"
      onChange={handleSearch}
      sx={{
        width: '300px',
        '@media (max-width: 767px)': {
          width: '100%',
        },
        '& .MuiInputLabel-root': {
          color: 'var(--primary)!important',
          fontSize: 'medium',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'var(--primary)',
          },
          '&:hover fieldset': {
            borderColor: 'var(--primary)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'var(--primary)',
            color: 'var(--primary)!important',
          },
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <IoIosSearch style={{color: 'var(--primary)'}} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

SearchBox.propTypes = {
  label: PropTypes.string,
  handleSearch: PropTypes.func,
};
