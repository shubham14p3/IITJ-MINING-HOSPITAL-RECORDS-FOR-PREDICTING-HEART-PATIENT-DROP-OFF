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
    CircularProgress
} from '@mui/material';
import Layout from '../layout/Layout';
import { BASE_URL } from './Constant';
import { useNavigate } from 'react-router-dom';

export default function DataCleaning() {
    const [missing, setMissing] = useState({});
    const [corr, setCorr] = useState({});
    const [loading, setLoading] = useState(true);
    const [cleaningSteps, setCleaningSteps] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClean = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/data/clean`);
                const json = await res.json();
                setMissing(json.missing_before || {});
                setCorr(json.correlation || {});
                setCleaningSteps(json.cleaning_steps || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchClean();
    }, []);

    const cols = Object.keys(corr);
    const metrics = cols.length ? Object.keys(corr[cols[0]]) : [];

    const headerStyle = {
        fontWeight: 'bold',
        background: 'linear-gradient(90deg, #ff5722, #ff9800)',
        color: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 2,
        padding: '12px 16px',
        textAlign: 'center',
        borderBottom: '2px solid #f0f0f0',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        '&:hover': {
            background: 'linear-gradient(90deg, #ff9800, #ff5722)',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }
    };

    if (loading) {
        return (
            <Layout>
                <Box sx={{ minHeight: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Container sx={{ py: 4 }}>
                {/* Missing Values Section */}
                <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Missing Values (Before Cleaning)
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                    This table shows how many values were missing (empty) in each column before cleaning.
                </Typography>
                <Card sx={{ mb: 4, p: 3, boxShadow: 4, borderRadius: 4 }}>
                    <Box sx={{ maxHeight: '300px', overflowY: 'auto', overflowX: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={headerStyle}>Column</TableCell>
                                    <TableCell sx={headerStyle}>Missing Count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(missing).length > 0 ? (
                                    Object.entries(missing).map(([col, cnt]) => (
                                        <TableRow
                                            key={col}
                                            sx={{
                                                backgroundColor: cnt > 10 ? '#ffe0e0' : 'inherit'
                                            }}
                                        >
                                            <TableCell>{col}</TableCell>
                                            <TableCell>{cnt}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={2} align="center">No missing values detected.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Box>
                </Card>

                {/* Cleaning Steps */}
                {cleaningSteps.length > 0 && (
                    <>
                        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Cleaning Steps Applied
                        </Typography>
                        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                            Actions performed on data to clean and prepare it.
                        </Typography>
                        <Card sx={{ mb: 4, p: 3, boxShadow: 4, borderRadius: 4 }}>
                            <ul>
                                {cleaningSteps.map((step, idx) => (
                                    <li key={idx}>
                                        <Typography variant="body2">{step}</Typography>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </>
                )}

                {/* Correlation Matrix Section */}
                <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Correlation Matrix (After Cleaning)
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                    This matrix shows how strongly each feature is related to others (value from -1 to 1).
                </Typography>
                <Card sx={{ p: 3, boxShadow: 4, borderRadius: 4 }}>
                    <Box sx={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={headerStyle}>Metric</TableCell>
                                    {cols.map(col => (
                                        <TableCell key={col} sx={headerStyle}>{col}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {metrics.length > 0 ? (
                                    metrics.map(metric => (
                                        <TableRow key={metric}>
                                            <TableCell>{metric}</TableCell>
                                            {cols.map(col => (
                                                <TableCell
                                                    key={col}
                                                    sx={{
                                                        textAlign: 'right',
                                                        color:
                                                            corr[col][metric] >= 0.7 ? 'green' :
                                                                corr[col][metric] <= -0.7 ? 'red' :
                                                                    'text.secondary'
                                                    }}
                                                >
                                                    {corr[col][metric]?.toFixed(2)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={cols.length + 1} align="center">No correlation data available.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Box>
                </Card>
            </Container>

            {/* Navigation Buttons */}
            <Box mt={4} display="flex" justifyContent="center" sx={{ gap: 1 }}>
                <Button variant="contained" color="primary" onClick={() => navigate('/data-info')}>
                    Back
                </Button>
                <Button variant="contained" color="secondary" onClick={() => navigate('/data-visualization')}>
                    Next
                </Button>
            </Box>
            <br />
            <br />
        </Layout>
    );
}
