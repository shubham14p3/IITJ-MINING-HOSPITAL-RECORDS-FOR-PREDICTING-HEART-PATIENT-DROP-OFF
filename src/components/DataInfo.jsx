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

export default function DataInfo() {
    const [info, setInfo] = useState([]);
    const [stats, setStats] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/data/info`);
                const json = await res.json();
                setInfo(json.info);
                setStats(json.describe);
            } catch (err) {
                console.error(err);
            }
        };
        fetchInfo();
    }, []);

    const statKeys = Object.keys(stats);
    const metricNames = statKeys.length ? Object.keys(stats[statKeys[0]]) : [];

    const headerCellStyle = {
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

                {/* Column Info Section */}
                <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Column Info
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                    Lists each column with how many entries are filled and the data type.
                </Typography>
                <Card sx={{ mb: 4, p: 3, boxShadow: 4, borderRadius: 4 }}>
                    <Box sx={{ maxHeight: '300px', overflowY: 'auto', overflowX: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={headerCellStyle}>Column</TableCell>
                                    <TableCell sx={headerCellStyle}>Non‑Null</TableCell>
                                    <TableCell sx={headerCellStyle}>Type</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {info.map(col => (
                                    <TableRow key={col.column}>
                                        <TableCell sx={{ py: 1 }}>{col.column}</TableCell>
                                        <TableCell sx={{ py: 1 }}>{col.non_null}</TableCell>
                                        <TableCell sx={{ py: 1 }}>{col.dtype}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Card>

                {/* Summary Stats Section */}
                <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Summary Stats
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
                    Shows key statistics (like mean, min, max) for each numeric column.
                </Typography>
                {statKeys.length > 0 && (
                    <Card sx={{ p: 3, boxShadow: 4, borderRadius: 4 }}>
                        <Box sx={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'auto' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={headerCellStyle}>Metric</TableCell>
                                        {statKeys.map(col => (
                                            <TableCell key={col} sx={headerCellStyle}>{col}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {metricNames.map(metric => (
                                        <TableRow key={metric}>
                                            <TableCell sx={{ py: 1 }}>{metric}</TableCell>
                                            {statKeys.map(col => (
                                                <TableCell key={col} sx={{ py: 1, textAlign: 'right' }}>
                                                    {stats[col][metric].toFixed(2)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Card>
                )}
            </Container>
            <Box mt={4}
                display="flex"
                justifyContent="center"
                sx={{ gap: 1 }}>
                <Button variant="contained" color="primary" onClick={() => navigate("/data-analysis")}>
                    Back
                </Button>
                <Button variant="contained" color="secondary" onClick={() => navigate("/data-clean")}>
                    Next
                </Button>
            </Box>
            <br />
            <br />
        </Layout>
    );
}
