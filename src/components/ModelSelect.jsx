import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

export default function ModelSelect({ model, setModel, setResult }) {
    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel id="model-label">Model</InputLabel>
            <Select
                labelId="model-label"
                label="Model"
                value={model}
                onChange={e => {
                    setModel(e.target.value);
                    setResult(null);
                }}
            >
                {[
                    'linear_regression',
                    'logistic_regression',
                    'svm',
                    'naive_bayes',
                    'decision_tree',
                    'random_forest',
                    'gradient_boosting',
                    'xgboost'
                ].map(m => (
                    <MenuItem key={m} value={m}>
                        {m.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
