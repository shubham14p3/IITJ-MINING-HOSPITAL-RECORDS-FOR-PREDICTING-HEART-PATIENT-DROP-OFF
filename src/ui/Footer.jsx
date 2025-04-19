import React from 'react';
import { Box, Typography, Grid, Link, IconButton } from '@mui/material';
import { GitHub, LinkedIn, Facebook, Instagram } from '@mui/icons-material';
import logo from '../Design-of-New-Logo-of-IITJ-2.png';

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#f0f0f0',
        width: '100%',
        padding: '0.5rem 2rem',
        borderTop: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Left Section: Logo and Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '0.2rem',
            borderRadius: '5px',
          }}
        >
          <img
            src={logo}
            alt="IITJ Logo"
            width="40"
          />
        </Box>
        <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'gray' }}>
          © 2025 IITJ - MINING HOSPITAL RECORDS FOR PREDICTING PATIENT DROP-OFF
        </Typography>
      </Box>

      {/* Right Section: Contributors and Social Links */}
      <Box
        sx={{
          marginRight: '10%',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          Contributors:
        </Typography>
        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item>
            <Typography variant="body2">Shubham Raj</Typography>
            <Typography variant="body4">M24DE3076</Typography>
            {/* <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton href="https://github.com/shubham14p3" target="_blank" color="inherit">
                <GitHub />
              </IconButton>
              <IconButton href="https://linkedin.com/in/shubham14p3" target="_blank" color="inherit">
                <LinkedIn />
              </IconButton>
              <IconButton href="https://facebook.com/shubham14p3" target="_blank" color="inherit">
                <Facebook />
              </IconButton>
            </Box> */}
          </Grid>
          <Grid item>
          <Typography variant="body2">SURAJ MOURYA</Typography>
          <Typography variant="body4"></Typography>
          </Grid>
          <Grid item>
          <Typography variant="body2">JATIN SHRIVAS</Typography>
          <Typography variant="body4"></Typography>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
}

export default Footer;
