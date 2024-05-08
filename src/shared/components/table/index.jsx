'use client';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {styled} from '@mui/material/styles';
import RenderTableCell from './RenderTableCell';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import Pagination from '../pagination';
import Tooltip from '@mui/material/Tooltip';

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function TableComponent({
  headerList,
  dataList,
  actions,
  itemsToShow,
  totalItems,
  handlePages,
  loading,
}) {
  return (
    <>
      <TableContainer component={Paper} className={styles.table_container}>
        <Table sx={{minWidth: 700}} aria-label="customized table">
          <TableHead>
            <TableRow>
              {Object.values(headerList)?.map((head) => {
                return (
                  <StyledTableCell
                    key={head.title}
                    className={styles.table_header}
                  >
                    {head?.title}
                  </StyledTableCell>
                );
              })}
              {actions?.length > 0 && (
                <StyledTableCell className={styles.table_header}>
                  Action
                </StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={
                    Object.values(headerList).length +
                    (actions?.length > 0 ? 1 : 0)
                  }
                  sx={{textAlign: 'center'}}
                >
                  <Box textAlign={'center'}>
                    <CircularProgress sx={{color: 'var(--primary)'}} />
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              dataList?.map((data) => (
                <StyledTableRow key={data?.id}>
                  {Object.entries(headerList)?.map(([key, value]) => {
                    return (
                      <RenderTableCell
                        key={`${data?.id}-${key}`}
                        content={data[key]}
                        type={value?.type}
                      />
                    );
                  })}
                  <StyledTableCell sx={{border: '0px'}}>
                    {actions?.map((action) => {
                      return (
                        <Tooltip key={action.id} title={action.label}>
                          <IconButton
                            style={{
                              cursor: 'pointer',
                              color: 'var(--primary)',
                            }}
                            onClick={() => action?.method({user: data})}
                          >
                            {action.icon}
                          </IconButton>
                        </Tooltip>
                      );
                    })}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={styles.pagination_container}>
        <Pagination
          totalItems={totalItems}
          itemsToShow={itemsToShow}
          handlePages={handlePages}
        />
      </Box>
    </>
  );
}

TableComponent.propTypes = {
  headerList: PropTypes.object,
  dataList: PropTypes.array,
  actions: PropTypes.array,
  itemsToShow: PropTypes.number,
  totalItems: PropTypes.number,
  handlePages: PropTypes.func,
  loading: PropTypes.bool,
};
