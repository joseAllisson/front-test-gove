/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { JSX, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Box,
  Pagination,
  PaginationItem,
  Menu,
  MenuItem
} from '@mui/material';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
  KeyboardArrowDown,
  MoreVert
} from '@mui/icons-material';

export interface ActionsDataTable {
    icon: JSX.Element;
    onClick: (row: any) => void;
    color?: string;
    label: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: {
    key: string;
    label: string;
    align?: 'left' | 'center' | 'right';
    width?: string;
    render?: (value: any, row: T) => React.ReactNode;
  }[];
  loading: boolean;
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
  actions?: ActionsDataTable[];
  orderBy?: string;
  order?: 'asc' | 'desc';
  onSort?: (column: string) => void;
}

export function DataTable<T>({
  data,
  columns,
  loading,
  page,
  totalPages,
  totalItems,
  onPageChange,
  actions = [],
  orderBy = '',
  order = 'asc',
  onSort
}: DataTableProps<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleSort = (column: string) => {
    if (onSort) {
      onSort(column);
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, row: T) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleActionClick = (action: ActionsDataTable) => {
    if (selectedRow) {
      action.onClick(selectedRow);
      handleMenuClose();
    }
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Table sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                align={column.align || 'left'}
                onClick={() => handleSort(column.key)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  },
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                <div className="flex items-center gap-1">
                  {column.label}
                  {orderBy === column.key && (
                    order === 'asc' ? <KeyboardArrowUp fontSize="small" /> : <KeyboardArrowDown fontSize="small" />
                  )}
                </div>
              </TableCell>
            ))}
            {actions.length > 0 && (
              <TableCell
                align="center"
                sx={{
                  width: '80px',
                  minWidth: '80px'
                }}
              >
                Ações
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length + (actions.length > 0 ? 1 : 0)} align="center">
                <Box py={4}>
                  <CircularProgress />
                </Box>
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (actions.length > 0 ? 1 : 0)} align="center">
                Nenhum registro encontrado
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={index} hover>
                {columns.map((column) => (
                  <TableCell 
                    key={`${index}-${column.key}`} 
                    align={column.align || 'left'}
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {column.render 
                      ? column.render((row as never)[column.key], row)
                      : (row as never)[column.key]}
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={(event) => handleMenuClick(event, row)}
                    >
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {actions.map((action, index) => (
          <MenuItem
            key={index} 
            onClick={() => handleActionClick(action)}
            sx={{ color: action.color || 'inherit' }}
          >
            <span className="pr-2">{action.icon}</span>
            {action.label}
          </MenuItem>
        ))}
      </Menu>

      <Box display="flex" justifyContent="space-between" p={2}>
        <p className='text-gray-500'>
          Total: {totalItems}
        </p>

        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => onPageChange(value)}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: KeyboardArrowLeft, next: KeyboardArrowRight }}
              {...item}
              sx={{
                '&:not(.Mui-selected)': {
                  backgroundColor: '#d3d3d3'
                }
              }}
            />
          )}
          siblingCount={1}
          boundaryCount={1}
          showFirstButton={true}
          showLastButton={true}
          color='primary'
        />
      </Box>
    </TableContainer>
  );
}