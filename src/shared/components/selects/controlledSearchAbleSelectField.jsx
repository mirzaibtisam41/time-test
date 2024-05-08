import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import PropTypes from 'prop-types';

import {Controller} from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import {Fragment} from 'react';

export default function ControlledSearchAbleSelectField({
  sx,
  label,
  name,
  control,
  options = [],
  getOptionLabel,
  errors,
  ...rest
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <Fragment>
          <Autocomplete
            id={`combo-box-${name}`}
            options={options}
            sx={sx}
            renderInput={(params) => (
              <TextField {...params} label={label} placeholder="Search" />
            )}
            fullWidth
            {...rest}
            {...field}
            onChange={(_, newValue) => {
              field.onChange(newValue);
            }}
            value={field.value || null}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            getOptionLabel={getOptionLabel}
          />
          {errors[name] && (
            <FormHelperText sx={{color: '#d32f2f', fontSize: '12px', ml: 1.5}}>
              {errors[name]?.message}
            </FormHelperText>
          )}
        </Fragment>
      )}
    />
  );
}

ControlledSearchAbleSelectField.propTypes = {
  sx: PropTypes.object,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  rest: PropTypes.any,
  getOptionLabel: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};
