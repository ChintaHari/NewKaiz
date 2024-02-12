// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// const ItemListTable = ({ items }) => {
//     return (
//         <TableContainer component={Paper}>
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>SKU</TableCell>
//                         <TableCell>Name</TableCell>
//                         <TableCell>Category</TableCell>
//                         <TableCell>Tags</TableCell>
//                         <TableCell>Stock Status</TableCell>
//                         <TableCell>Available Stock</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {items.map((item) => (
//                         <TableRow key={item.id}>
//                             <TableCell>{item.sku}</TableCell>
//                             <TableCell>{item.name}</TableCell>
//                             <TableCell>{item.category}</TableCell>
//                             <TableCell>{Array.isArray(item.tags) ? item.tags.join(', ') : JSON.stringify(item.tags)}</TableCell>
//                             <TableCell>{item.stock_status ? 'In Stock' : 'Out of Stock'}</TableCell>
//                             <TableCell>{item.available_stock}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// };

// export default ItemListTable;


import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, TextField, InputAdornment } from '@mui/material';
import { Add as AddIcon, FilterList as FilterListIcon, Sort as SortIcon } from '@mui/icons-material';

const ItemListTable = ({ items }) => {
  // Add any additional state or functions required for sorting and filtering

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />}>
          New Item
        </Button>
        <div>
          <TextField
            placeholder="Search..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SortIcon />
                  </IconButton>
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SKU</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>In Stock</TableCell>
              <TableCell>Available Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{Array.isArray(item.tags) ? item.tags.join(', ') : JSON.stringify(item.tags)}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.stock_status ? 'In Stock' : 'Out of Stock'}</TableCell>
                <TableCell>{item.available_stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ItemListTable;
