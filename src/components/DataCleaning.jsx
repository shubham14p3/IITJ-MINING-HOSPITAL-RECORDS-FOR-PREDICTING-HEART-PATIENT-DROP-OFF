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
    Button
} from '@mui/material';
import Layout from '../layout/Layout';
import { BASE_URL } from './Constant';
import { useNavigate } from 'react-router-dom';

export default function DataCleaning() {
    const [missing, setMissing] = useState({});
    const [corr, setCorr] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const fetchClean = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/data/clean`);
                const json = await res.json();
                setMissing(json.missing);
                setCorr(json.correlation);
            } catch (err) {
                console.error(err);
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

    return (
        <Layout>
            <Container sx={{ py: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Missing Values
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
                                {Object.entries(missing).map(([col, cnt]) => (
                                    <TableRow key={col}>
                                        <TableCell>{col}</TableCell>
                                        <TableCell>{cnt}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Card>

                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Correlation Matrix (without fbs)
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
                                {metrics.map(metric => (
                                    <TableRow key={metric}>
                                        <TableCell>{metric}</TableCell>
                                        {cols.map(col => (
                                            <TableCell key={col} sx={{ textAlign: 'right' }}>
                                                {corr[col][metric].toFixed(2)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Card>
            </Container>
            <Box marginTop={4} display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" onClick={() => navigate("/data-info")}>
                    Back
                </Button>
                <Button variant="contained" color="secondary" onClick={() => navigate("/data-info")}>
                    Next
                </Button>
            </Box>
        </Layout>
    );
}
