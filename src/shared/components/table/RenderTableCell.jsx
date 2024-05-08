import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import Chip from '@mui/material/Chip';

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const commonChipStyle = {
  minWidth: '75px',
  border: '0px',
};

const getChipStyle = ({status}) => {
  if (status.toLowerCase() === 'active') {
    return {
      ...commonChipStyle,
      backgroundColor: '#E6FFFA',
      color: '#13DEB9',
    };
  } else {
    return {
      ...commonChipStyle,
      backgroundColor: '#FDEDE8',
      color: '#FA896B',
    };
  }
};

export default function TableCellContent({content, type}) {
  switch (type) {
    case 'string':
      return (
        <StyledTableCell sx={{border: '0px'}}>
          <Typography noWrap sx={{maxWidth: '250px', fontSize: '15px'}}>
            {content}
          </Typography>
        </StyledTableCell>
      );
    case 'status':
      return (
        <StyledTableCell sx={{border: '0px'}}>
          <Chip
            sx={getChipStyle({status: content})}
            label={content}
            variant="outlined"
          />
        </StyledTableCell>
      );
  }
}
