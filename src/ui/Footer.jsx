import React from 'react';
import { Box, Typography } from '@mui/material';
import logo from '../Design-of-New-Logo-of-IITJ-2.png';

const contributors = [
  { name: 'Shubham Raj', id: 'M24DE3076' },
  { name: 'Suraj Mourya', id: 'M24DE3080' },
  { name: 'Jatin Shrivas', id: 'M24DE3039' },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#f0f0f0',
        width: '95vw',
        py: 1,
        px: 2,
        borderTop: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Logo + Title */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ bgcolor: '#fff', p: 0.5, borderRadius: 1 }}>
          <img src={logo} alt="IITJ Logo" width={40} />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold', ml: 1 }}>
          © 2025 IITJ – Mining Hospital Records for Predicting Heart Patient Drop‑off
        </Typography>
      </Box>

      {/* Contributors */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {contributors.map(({ name, id }) => (
          <Box key={id} sx={{ textAlign: 'center' }}>
            <Typography variant="body2">{name}</Typography>
            <Typography variant="caption">{id}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
