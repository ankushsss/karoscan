import React from 'react'
import { Typography, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../components/Iconify';

export function Menu() {

  return (
    <div>
     <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Add Menu
        </Typography>
        <Button variant="contained"  component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
          Add Menu
        </Button>
        </Stack>
    </div>
  )
}

