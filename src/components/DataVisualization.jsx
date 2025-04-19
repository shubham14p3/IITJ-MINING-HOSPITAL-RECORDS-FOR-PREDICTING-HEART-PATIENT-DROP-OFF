import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Container,
  Card,
  Button,
  Dialog,
  DialogContent
} from '@mui/material';
import Layout from '../layout/Layout';
import { BASE_URL } from './Constant';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

// Map short column keys to meaningful display names
const columnNameMap = {
  age: 'Age',
  sex: 'Sex',
  cp: 'Chest Pain Type',
  trestbps: 'Resting BP',
  chol: 'Cholesterol',
  fbs: 'Fasting Blood Sugar',
  restecg: 'Resting ECG',
  thalach: 'Max Heart Rate',
  exang: 'Exercise Angina',
  oldpeak: 'ST Depression',
  slope: 'ST Slope',
  ca: 'Major Vessels',
  thal: 'Thalassemia',
  target: 'Target'
};

export default function DataVisualization() {
  const [corr, setCorr] = useState({});
  const [loadingCorr, setLoadingCorr] = useState(true);
  const [histLoaded, setHistLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCorr = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/data/corr`);
        const json = await res.json();
        setCorr(json.correlation);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCorr(false);
      }
    };
    fetchCorr();
  }, []);

  const cols = Object.keys(corr);
  const metrics = cols.length ? Object.keys(corr[cols[0]]) : [];

  const headerStyle = {
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #2196f3, #21cbf3)',
    color: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 2,
    padding: '12px 16px',
    textAlign: 'center',
    borderBottom: '2px solid #e0e0e0',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    '&:hover': {
      background: 'linear-gradient(90deg, #21cbf3, #2196f3)',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    }
  };

  return (
    <Layout>
      <Container sx={{ py: 4 }}>
        {/* Correlation Matrix Section */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Correlation Matrix
        </Typography>
        <Card sx={{ mb: 4, p: 3, boxShadow: 6, borderRadius: 4, bgcolor: '#f0f8ff' }}>
          {loadingCorr ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <ClipLoader size={50} />
            </Box>
          ) : (
            <Box sx={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={headerStyle}>Metric</TableCell>
                    {cols.map(col => (
                      <TableCell key={col} sx={headerStyle}>
                        {columnNameMap[col] || col.toUpperCase()}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {metrics.map(metric => (
                    <TableRow key={metric}>
                      <TableCell sx={{ py: 1, fontWeight: 'medium' }}>
                        {columnNameMap[metric] || metric.toUpperCase()}
                      </TableCell>
                      {cols.map(col => (
                        <TableCell key={col} sx={{ py: 1, textAlign: 'right', bgcolor: Math.abs(corr[col][metric]) > 0.5 ? '#e3f2fd' : 'inherit' }}>
                          {corr[col][metric].toFixed(2)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </Card>

        {/* Histograms Section */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Feature Histograms
        </Typography>
        <Card sx={{ p: 3, boxShadow: 6, borderRadius: 4, textAlign: 'center', bgcolor: '#fff3e0' }}>
          {!histLoaded && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <ClipLoader size={50} />
            </Box>
          )}
          <img
            src={`${BASE_URL}/api/data/hist`}
            alt="Feature Histograms"
            onLoad={() => setHistLoaded(true)}
            onClick={() => setOpenModal(true)}
            style={{
              cursor: 'pointer',
              display: histLoaded ? 'block' : 'none',
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px',
              filter: 'hue-rotate(90deg) contrast(1.2)'
            }}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={() => window.open(`${BASE_URL}/api/data/hist`, '_blank')}
            >
              View Full Size
            </Button>
            <a href={`${BASE_URL}/api/data/hist`} download="histograms.png">
              <Button variant="outlined" sx={{ ml: 2 }}>
                Download Histogram
              </Button>
            </a>
          </Box>

          <Dialog
            open={openModal}
            onClose={() => setOpenModal(false)}
            maxWidth="lg"
          >
            <DialogContent>
              <img
                src={`${BASE_URL}/api/data/hist`}
                alt="Feature Histograms"
                style={{ width: '100%', height: 'auto' }}
              />
            </DialogContent>
          </Dialog>
        </Card>


      </Container>
      {/* Navigation Buttons */}
      <Box mt={4}
        display="flex"
        justifyContent="center"
        sx={{ gap: 1 }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/data-clean')}>
          Back
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate('/predict')}>
          Next
        </Button>
      </Box>
      <br />
      <br />
    </Layout>
  );
}
