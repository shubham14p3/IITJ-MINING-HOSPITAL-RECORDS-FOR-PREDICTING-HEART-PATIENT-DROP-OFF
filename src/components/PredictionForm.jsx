import { Box, Grid, Paper, Button, CircularProgress } from '@mui/material';
import FieldInput from './FieldInput';
import ModelSelect from './ModelSelect';
import fieldConfigs from './fieldConfigs';

export default function PredictionForm({ features, errors, model, setModel, handleChange, handleBlur, handleSubmit, loading, setHoveredField, setResult }) {
    return (
        <Paper elevation={6} sx={{ p: 4, backgroundColor: 'white', borderRadius: 4 }}>
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* Model Selector */}
                    <Grid item xs={12}>
                        <ModelSelect model={model} setModel={setModel} setResult={setResult} />
                    </Grid>

                    {/* Feature Fields */}
                    {fieldConfigs.map(cfg => (
                        <Grid item xs={12} sm={6} key={cfg.name}>
                            <FieldInput
                                cfg={cfg}
                                value={features[cfg.name]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors[cfg.name]}
                                setHoveredField={setHoveredField}
                            />
                        </Grid>
                    ))}

                    {/* Submit Button */}
                    <Grid item xs={12} textAlign="center">
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ mt: 2, borderRadius: 3, px: 5 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Predict'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}
