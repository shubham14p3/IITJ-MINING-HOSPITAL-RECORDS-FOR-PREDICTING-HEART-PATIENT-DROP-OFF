import { FormControl, Select, MenuItem, InputLabel, TextField, FormHelperText } from '@mui/material';

export default function FieldInput({ cfg, value, onChange, onBlur, error, setHoveredField }) {
    return (
        <>
            {cfg.inputType === 'select' ? (
                <FormControl
                    fullWidth
                    variant="outlined"
                    error={!!error}
                    sx={{ mb: 2 }}
                    onMouseEnter={() => setHoveredField(cfg.name)}
                    onMouseLeave={() => setHoveredField(null)}
                >
                    <InputLabel id={`${cfg.name}-label`}>{cfg.label}</InputLabel>
                    <Select
                        labelId={`${cfg.name}-label`}
                        label={cfg.label}
                        name={cfg.name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                    >
                        <MenuItem disabled value="">
                            Select {cfg.label}
                        </MenuItem>
                        {cfg.options.map(opt => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{error || cfg.tooltip}</FormHelperText>
                </FormControl>
            ) : (
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    name={cfg.name}
                    type={cfg.inputType === 'number' ? 'number' : 'text'}
                    label={cfg.label}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={!!error}
                    helperText={error || cfg.tooltip}
                    inputProps={{
                        ...(cfg.inputType === 'number' ? { min: cfg.min, max: cfg.max, step: cfg.step || 1 } : {})
                    }}
                    sx={{ mb: 1 }}
                    onMouseEnter={() => setHoveredField(cfg.name)}
                    onMouseLeave={() => setHoveredField(null)}
                />
            )}
        </>
    );
}
