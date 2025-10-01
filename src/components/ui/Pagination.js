'use client';
import { Box, Pagination as MuiPagination, Typography } from '@mui/material';

export default function Pagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange}) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={3}
      flexDirection={{ xs: 'column', sm: 'row' }}
      gap={2}
    >
      <Typography variant="body2" color="textSecondary">
        Showing {startItem}-{endItem} of {totalItems} items
      </Typography>

      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => onPageChange(page)}
        color="primary"
        size="small"
      />
    </Box>
  );
}