import React from 'react';
import { Box } from '@mui/material';
import Footer from '../ui/Footer';
import Header from '../ui/Header';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        // width: '100vw',
        backgroundColor: '#d5f5f5',
      }}
    >
      {/* Header */}
      <Box sx={{ flexShrink: 0, width: '100%' }}>
        <Header />
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          width: '100%',
          overflowY: 'auto',
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      <Box sx={{ flexShrink: 0, width: '100%' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
