import { Card, Box, Typography, CardMedia } from '@mui/material';
import helpConfigs from './helpConfigs';
import img15 from '../assets/prediction/15.jpg';

export default function HelpSidebar({ hoveredField }) {
    const help = hoveredField && helpConfigs[hoveredField];

    return (
        <Card sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {help ? (
                <>
                    <Box sx={{ width: '100%', maxHeight: 250, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                        <CardMedia component="img" image={help.imgUrl} alt={help.title} sx={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 2 }} />
                    </Box>
                    <Box sx={{ textAlign: 'center', px: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'primary.main', borderBottom: '2px solid #1976d2', display: 'inline-block', mb: 2 }}>
                            {help.title}
                        </Typography>
                        {help.body.split('\n').map((line, idx) => (
                            <Typography key={idx} variant="body2" sx={{ fontSize: '0.95rem', fontWeight: 500, color: '#333', whiteSpace: 'pre-line', mb: 1 }}>
                                {line}
                            </Typography>
                        ))}
                    </Box>
                </>
            ) : (
                <Box sx={{ textAlign: 'center' }}>
                    <img src={img15} alt="Help" style={{ width: '100%', maxHeight: 250, objectFit: 'contain', marginBottom: '16px' }} />
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Hover over a field to see details here.
                    </Typography>
                </Box>
            )}
        </Card>
    );
}
