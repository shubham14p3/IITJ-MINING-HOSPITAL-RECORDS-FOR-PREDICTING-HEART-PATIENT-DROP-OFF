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
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom';

const loadingMessages = [
    "We are thinking...",
    "Crunching numbers...",
    "Comparing models...",
    "Doing smart machine learning stuff...",
    "Optimizing calculations..."
];

export default function CompareModels() {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [messageIndex, setMessageIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        }, 2000);

        const fetchMetrics = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/metrics`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                setMetrics(json);
            } catch (err) {
                console.error("Error fetching metrics:", err);
            } finally {
                clearInterval(interval);
                setLoading(false);
            }
        };
        fetchMetrics();

        return () => clearInterval(interval);
    }, []);

    const headerCellStyle = {
        fontWeight: 'bold',
        background: 'linear-gradient(90deg, #2196f3, #21cbf3)',
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
            background: 'linear-gradient(90deg, #21cbf3, #2196f3)',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }
    };

    return (
        <Layout>
            <Container sx={{ py: 4 }}>
                {loading ? (
                    // Loader inside layout
                    <Box
                        height="70vh"
                        width="100%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            background: 'linear-gradient(270deg, #e3f2fd, #bbdefb, #e3f2fd)',
                            backgroundSize: '600% 600%',
                            animation: 'gradientShift 8s ease infinite',
                            borderRadius: 4
                        }}
                    >
                        <ClipLoader color="#0d47a1" size={70} />
                        <Typography
                            variant="h5"
                            sx={{
                                mt: 4,
                                color: '#0d47a1',
                                fontWeight: 'bold',
                                animation: 'fadeInOut 2s infinite',
                                letterSpacing: '1px',
                            }}
                        >
                            {loadingMessages[messageIndex]}
                        </Typography>

                        <style>{`
                            @keyframes gradientShift {
                                0% { background-position: 0% 50%; }
                                50% { background-position: 100% 50%; }
                                100% { background-position: 0% 50%; }
                            }
                            @keyframes fadeInOut {
                                0% { opacity: 0.4; }
                                50% { opacity: 1; }
                                100% { opacity: 0.4; }
                            }
                        `}</style>
                    </Box>
                ) : (
                    <>
                        {/* Title */}
                        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Model Comparison
                        </Typography>
                        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                            Below is the performance of different machine learning models based on your data.
                        </Typography>

                        {/* Table Card */}
                        <Card sx={{ mb: 4, p: 3, boxShadow: 4, borderRadius: 4 }}>
                            <Box sx={{ overflowX: 'auto' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={headerCellStyle}>Model</TableCell>
                                            <TableCell sx={headerCellStyle}>Metric</TableCell>
                                            <TableCell sx={headerCellStyle}>Score</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.entries(metrics).map(([modelName, { metric, score }]) => (
                                            <TableRow key={modelName}>
                                                <TableCell sx={{ py: 1 }}>{modelName.replaceAll('_', ' ').toUpperCase()}</TableCell>
                                                <TableCell sx={{ py: 1 }}>{metric.toUpperCase()}</TableCell>
                                                <TableCell sx={{ py: 1, textAlign: 'right' }}>{score}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Card>

                        {/* Navigation Buttons */}
                        <Box mt={4} display="flex" justifyContent="center" sx={{ gap: 2 }}>
                            <Button variant="contained" color="primary" onClick={() => navigate('/predict')}>
                                Back
                            </Button>
                            <Button variant="contained" color="success" onClick={() => navigate('/')}>
                                Home
                            </Button>
                        </Box>
                    </>
                )}
            </Container>
            <br />
            <br />
        </Layout>
    );
}
