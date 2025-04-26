import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NavigationButtons() {
    const navigate = useNavigate();
    return (
        <Box mt={4} display="flex" justifyContent="center" sx={{ gap: 1 }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/data-clean')}>
                Back
            </Button>
            <Button variant="contained" color="secondary" onClick={() => navigate('/')}>
                Home
            </Button>
            <Button variant="contained" color="success" onClick={() => navigate('/compare-models')}>
                Compare Models
            </Button>
            <Button variant="contained" color="secondary" onClick={() => navigate('/predict')}>
                Next
            </Button>
        </Box>
    );
}
