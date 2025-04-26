import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import fieldConfigs from './fieldConfigs';

export default function ResultDialog({ open, result, handleClose, handleDownloadPdf }) {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3, p: 2 } }}>
            <DialogTitle sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
                Prediction Result
            </DialogTitle>
            <DialogContent dividers>
                {result.error ? (
                    <Typography color="error">Error: {result.error}</Typography>
                ) : (
                    <Box sx={{ textAlign: 'center', py: 2 }}>
                        {result.prediction === 1 ? (
                            <ErrorOutlineIcon sx={{ fontSize: 60, color: 'error.main' }} />
                        ) : (
                            <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main' }} />
                        )}
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            {result.prediction === 1 ? 'High likelihood of heart disease' : 'Low likelihood of heart disease'}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            Risk score: {(result.probability?.[1] ?? 0 * 100).toFixed(1)}% positive, {(result.probability?.[0] ?? 0 * 100).toFixed(1)}% negative
                        </Typography>
                        <Box sx={{ mt: 3, textAlign: 'left' }}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Your inputs:</strong>
                            </Typography>
                            {Object.entries(result.inputs).map(([k, v]) => {
                                const cfg = fieldConfigs.find(f => f.name === k);
                                let display = v;
                                if (cfg.inputType === 'select') {
                                    display = cfg.options.find(o => o.value === Number(v))?.label;
                                }
                                return (
                                    <Typography key={k} variant="body2">
                                        {cfg.label}: {display}
                                    </Typography>
                                );
                            })}
                        </Box>
                    </Box>
                )}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between' }}>
                {!result.error && (
                    <Button onClick={handleDownloadPdf} variant="outlined">
                        Download PDF
                    </Button>
                )}
                <Button onClick={handleClose} variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
