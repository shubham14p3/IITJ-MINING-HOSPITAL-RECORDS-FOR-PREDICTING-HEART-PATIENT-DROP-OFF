import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormHelperText,
    Card,
    CardMedia,
    Button,
    CircularProgress,
    Container,
    Tooltip,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Paper,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { jsPDF } from 'jspdf';
import Layout from '../layout/Layout';
import { BASE_URL } from './Constant';
import img1 from '../assets/prediction/1.jpg';
import img2 from '../assets/prediction/2.jpeg';
import img3 from '../assets/prediction/3.jpg';
import img4 from '../assets/prediction/4.jpg';
import img5 from '../assets/prediction/5.jpeg';
import img6 from '../assets/prediction/6.jpeg';
import img7 from '../assets/prediction/7.jpeg';
import img8 from '../assets/prediction/8.jpeg';
import img9 from '../assets/prediction/9.jpeg';
import img10 from '../assets/prediction/10.jpeg';
import img11 from '../assets/prediction/11.jpeg';
import img12 from '../assets/prediction/12.jpeg';
import img13 from '../assets/prediction/13.jpeg';
import img14 from '../assets/prediction/14.jpeg';
import img15 from '../assets/prediction/15.jpg';
import { useNavigate } from 'react-router-dom';

const fieldConfigs = [
    { name: 'name', label: 'Full Name', inputType: 'text', tooltip: 'Enter your full name' },
    { name: 'age', label: 'Age', inputType: 'number', min: 29, max: 77, tooltip: 'Age in years (29–77)' },
    {
        name: 'sex', label: 'Sex', inputType: 'select', options: [
            { value: 1, label: 'Male' },
            { value: 0, label: 'Female' }
        ], tooltip: 'Sex'
    },
    {
        name: 'cp', label: 'Chest Pain Type', inputType: 'select', options: [
            { value: 0, label: 'Typical Angina' },
            { value: 1, label: 'Atypical Angina' },
            { value: 2, label: 'Non‑Anginal Pain' },
            { value: 3, label: 'Asymptomatic' }
        ], tooltip: 'Chest pain classification'
    },
    { name: 'trestbps', label: 'Resting BP', inputType: 'number', min: 94, max: 200, tooltip: 'Resting blood pressure (94–200 mm Hg)' },
    { name: 'chol', label: 'Cholesterol', inputType: 'number', min: 126, max: 564, tooltip: 'Serum cholesterol (126–564 mg/dl)' },
    {
        name: 'fbs', label: 'Fasting BS >120 mg/dl', inputType: 'select', options: [
            { value: 1, label: 'True' },
            { value: 0, label: 'False' }
        ], tooltip: 'Fasting blood sugar > 120 mg/dl'
    },
    {
        name: 'restecg', label: 'Resting ECG', inputType: 'select', options: [
            { value: 0, label: 'Normal' },
            { value: 1, label: 'ST‑T Abnormality' },
            { value: 2, label: 'Left Ventricular Hypertrophy' }
        ], tooltip: 'Resting electrocardiographic result'
    },
    { name: 'thalach', label: 'Max Heart Rate', inputType: 'number', min: 71, max: 202, tooltip: 'Maximum heart rate achieved' },
    {
        name: 'exang', label: 'Exercise‑Induced Angina', inputType: 'select', options: [
            { value: 1, label: 'Yes' },
            { value: 0, label: 'No' }
        ], tooltip: 'Exercise‑induced angina'
    },
    { name: 'oldpeak', label: 'ST Depression', inputType: 'number', min: 0, max: 6.2, step: 0.1, tooltip: 'ST depression induced by exercise' },
    {
        name: 'slope', label: 'ST Slope', inputType: 'select', options: [
            { value: 0, label: 'Upsloping' },
            { value: 1, label: 'Flat' },
            { value: 2, label: 'Downsloping' }
        ], tooltip: 'Slope of the peak exercise ST segment'
    },
    { name: 'ca', label: 'Major Vessels (0–4)', inputType: 'select', options: [0, 1, 2, 3, 4].map(v => ({ value: v, label: `${v}` })), tooltip: 'Number of major vessels colored by fluoroscopy' },
    {
        name: 'thal', label: 'Thalassemia', inputType: 'select', options: [
            { value: 0, label: 'Unknown' },
            { value: 1, label: 'Normal' },
            { value: 2, label: 'Fixed Defect' },
            { value: 3, label: 'Reversible Defect' }
        ], tooltip: 'Thalassemia status'
    }
];

const helpConfigs = {
    name: {
        title: 'Full Name',
        body: 'Enter your first and last name exactly as on your ID documents.',
        imgUrl: img14
    },
    age: {
        title: 'Age',
        body: `Your current age in years. Valid range: 29 to 77.  
Advanced age is one of the strongest non‑modifiable risk factors for coronary artery disease, as arterial walls stiffen and plaque accumulates over time.  
With increasing age, the myocardium becomes less compliant, diastolic dysfunction risk rises, and recovery after ischemic injury slows. Regular screening and aggressive management of other risk factors are critical in older patients.`,
        imgUrl: img1
    },
    sex: {
        title: 'Sex',
        body: `Select your biological sex: Male or Female.  
Men tend to develop heart disease about 10 years earlier than women. After menopause, women’s cardiovascular risk accelerates—loss of estrogen’s protective effects leads to endothelial dysfunction and higher plaque burden.  
Sex-specific differences also affect presentation (women more often have atypical symptoms) and response to therapies, so treatment strategies should be tailored accordingly.`,
        imgUrl: img2
    },
    cp: {
        title: 'Chest Pain Type',
        body: `• Typical Angina: chest discomfort triggered by exertion  
• Atypical Angina: non‑classic symptoms like indigestion or fatigue  
• Non‑Anginal Pain: chest pain not related to cardiac origin  
• Asymptomatic: no perceivable chest pain but possible silent ischemia  

Classifying chest pain helps distinguish ischemic heart disease from other causes. Timely recognition and risk stratification guide stress testing, imaging, or urgent angiography to prevent myocardial infarction and improve outcomes.`,
        imgUrl: img3
    },
    trestbps: {
        title: 'Resting Blood Pressure',
        body: `Resting BP in mm Hg measured after sitting quietly. Range: 94–200.  
Chronic hypertension injures arterial endothelium, promotes smooth muscle proliferation, and leads to left ventricular hypertrophy.  
Aggressive blood pressure control (target <130/80 mm Hg in high‑risk patients) reduces incidence of heart failure, stroke, and coronary events.`,
        imgUrl: img4
    },
    chol: {
        title: 'Serum Cholesterol',
        body: `Total cholesterol in mg/dl from blood test. Range: 126–564.  
Elevated LDL cholesterol infiltrates arterial intima, triggering inflammation and plaque formation. Low HDL impairs reverse‑cholesterol transport.  
Statin therapy and lifestyle modification (diet, exercise) have been proven to stabilize plaques and reduce cardiovascular mortality.`,
        imgUrl: img5
    },
    fbs: {
        title: 'Fasting Blood Sugar',
        body: `Glucose >120 mg/dl after fasting. True indicates high blood sugar.  
Diabetes mellitus accelerates atherosclerosis via glycation end‑products and microvascular damage, increasing risk of silent ischemia and heart failure.  
Tight glycemic control (HbA1c <7%) combined with GLP‑1 agonists or SGLT2 inhibitors can significantly lower cardiovascular events in diabetic patients.`,
        imgUrl: img6
    },
    restecg: {
        title: 'Resting ECG Results',
        body: `ECG categories: Normal, ST‑T wave abnormality, or LV hypertrophy.  
ST‑T changes can indicate evolving ischemia or prior infarction. Left ventricular hypertrophy suggests chronic pressure overload.  
Resting ECG abnormalities warrant further evaluation (echo, stress test) to quantify functional impact and guide therapy.`,
        imgUrl: img7
    },
    thalach: {
        title: 'Max Heart Rate',
        body: `Maximum heart rate achieved during exercise. Range: 71–202.  
A blunted heart rate response under stress (chronotropic incompetence) may reflect autonomic dysfunction or coronary artery disease limiting perfusion.  
Assessment during stress testing helps stratify risk and tailor exercise prescriptions for cardiac rehab.`,
        imgUrl: img8
    },
    exang: {
        title: 'Exercise‑Induced Angina',
        body: `Yes = chest pain induced by exercise; No = none.  
Exercise‑induced angina signals demand‑supply mismatch in myocardial oxygenation, often due to significant coronary stenosis.  
Management may include antianginal medications (beta‑blockers, nitrates), lifestyle changes, and revascularization when indicated.`,
        imgUrl: img9
    },
    oldpeak: {
        title: 'ST Depression',
        body: `Magnitude of ST depression induced by exercise vs rest.  
ST depression correlates with subendocardial ischemia; deeper depressions predict more severe disease.  
Quantifying old‑peak helps in risk scoring (e.g., Duke Treadmill Score) and decision‑making for invasive vs medical management.`,
        imgUrl: img10
    },
    slope: {
        title: 'ST Slope',
        body: `Slope of ST segment during peak exercise: upsloping, flat, or downsloping.  
Flat or downsloping ST segments carry higher positive predictive value for obstructive coronary disease.  
Slope analysis enhances prognostic accuracy when combined with exercise duration and BP response.`,
        imgUrl: img11
    },
    ca: {
        title: 'Major Vessels Colored',
        body: `Number of major coronary vessels (0–4) seen in fluoroscopy.  
Multi‑vessel disease indicates diffuse atherosclerosis and is associated with worse prognosis, often requiring CABG over PCI.  
The SYNTAX score incorporates vessel count and lesion complexity to guide optimal revascularization strategy.`,
        imgUrl: img12
    },
    thal: {
        title: 'Thalassemia Status',
        body: `Thalassemia: Unknown, Normal, Fixed Defect, or Reversible Defect.  
Fixed perfusion defects suggest scar from past infarction; reversible defects indicate viable but ischemic myocardium.  
Thallium or sestamibi imaging helps determine whether revascularization will recover function vs medical therapy suffices.`,
        imgUrl: img13
    }
};

function HelpSidebar({ hoveredField }) {
    const help = hoveredField && helpConfigs[hoveredField];
    return (
        <Card sx={{ p: 2 }}>
            {help ? (
                <>
                    <CardMedia
                        component="img"
                        height="140"
                        image={help.imgUrl}
                        alt={help.title}
                    />
                    <Box sx={{ pt: 1 }}>
                        <Typography variant="h6" gutterBottom>
                            {help.title}
                        </Typography>
                        {help.body.split('\n').map((line, idx) => (
                            <Typography key={idx} variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                                {line}
                            </Typography>
                        ))}
                    </Box>
                </>
            ) : (
                <Typography variant="body2" sx={{ textAlign: 'center', mt: 4 }}>

                    <img src={img15} alt="Help" style={{ width: '100%', height: 'auto' }} />
                    Hover over a field to see details here.
                </Typography>
            )}
        </Card>
    );
}

export default function DataPrediction() {
    const initial = fieldConfigs.reduce((o, f) => ({ ...o, [f.name]: '' }), {});
    const [features, setFeatures] = useState(initial);
    const [model, setModel] = useState('logistic_regression');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [open, setOpen] = useState(false);
    const [hoveredField, setHoveredField] = useState(null);
    const navigate = useNavigate();
    const validateField = (name, value) => {
        const cfg = fieldConfigs.find(f => f.name === name);
        if (value === '') return 'Required';
        if (cfg.inputType === 'number') {
            const num = Number(value);
            if (isNaN(num)) return 'Must be a number';
            if (num < cfg.min || num > cfg.max) return `${cfg.label} must be between ${cfg.min} and ${cfg.max}`;
        }
        return '';
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFeatures(f => ({ ...f, [name]: value }));
        setErrors(errs => ({ ...errs, [name]: '' }));
        setResult(null);
    };

    const handleBlur = e => {
        const { name, value } = e.target;
        setErrors(errs => ({ ...errs, [name]: validateField(name, value) }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const newErrs = {};
        fieldConfigs.forEach(({ name }) => {
            const err = validateField(name, features[name]);
            if (err) newErrs[name] = err;
        });
        if (Object.keys(newErrs).length) {
            setErrors(newErrs);
            return;
        }

        setLoading(true);
        try {
            const payload = {};
            Object.entries(features).forEach(([k, v]) => {
                const cfg = fieldConfigs.find(f => f.name === k);
                payload[k] = cfg.inputType === 'number' ? Number(v) : v;
            });

            const res = await fetch(`${BASE_URL}/api/${model}/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            setResult({ ...json, inputs: payload });
            setOpen(true);
        } catch (err) {
            setResult({ error: err.message, inputs: features });
            setOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setFeatures(initial);
        setErrors({});
        setResult(null);
        setHoveredField(null);
    };

    const handleDownloadPdf = () => {
        if (!result || result.error) return;
        const doc = new jsPDF();
        doc.setFillColor(33, 150, 243);
        doc.rect(0, 0, 210, 20, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.text('Heart Disease Prediction Report', 105, 14, { align: 'center' });
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Name: ${result.inputs.name}`, 10, 30);
        doc.text(
            `Model: ${model.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
            10,
            38
        );
        doc.text(
            `Prediction: ${result.prediction === 1 ? 'High likelihood of disease' : 'Low likelihood of disease'
            }`,
            10,
            46
        );
        doc.text(
            `Risk score: ${(result.probability?.[1] ?? 0 * 100).toFixed(1)}% positive`,
            10,
            54
        );
        let y = 70;
        doc.setFontSize(11);
        doc.text('Inputs:', 10, y);
        y += 8;
        Object.entries(result.inputs).forEach(([k, v]) => {
            const cfg = fieldConfigs.find(f => f.name === k);
            let display = v;
            if (cfg.inputType === 'select') {
                display = cfg.options.find(o => o.value === Number(v))?.label;
            }
            doc.text(`${cfg.label}: ${display}`, 10, y);
            y += 6;
            if (y > 280) {
                doc.addPage();
                y = 20;
            }
        });
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFillColor(33, 150, 243);
            doc.rect(0, 287, 210, 10, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.text(
                `Generated by © 2025 IITJ - MINING HOSPITAL RECORDS FOR PREDICTING PATIENT DROP-OFF – Page ${i}/${pageCount}`,
                105,
                293,
                { align: 'center' }
            );
        }
        doc.save(`${result.inputs.name || 'report'}.pdf`);
    };

    return (
        <Layout>
            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    py: 4,
                    px: { xs: 2, md: 4 },
                    background: 'linear-gradient(135deg, #e3f2fd 30%, #ffffff 100%)',
                    minHeight: '100vh'
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        mb: 4,
                        color: 'primary.main'
                    }}
                >
                    Heart Disease Predictor
                </Typography>

                <Grid container spacing={4}>
                    {/* Main Form */}
                    <Grid item xs={12} md={8}>
                        <Paper
                            elevation={6}
                            sx={{
                                p: 4,
                                backgroundColor: 'white',
                                borderRadius: 4
                            }}
                        >
                            <Box component="form" onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    {/* Model Selector */}
                                    <Grid item xs={12}  >
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel id="model-label">Model
                                            </InputLabel>
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
                                    </Grid>

                                    {/* Feature Fields */}
                                    {fieldConfigs.map(cfg => (
                                        <Grid item xs={12} sm={6} key={cfg.name}>
                                            {cfg.inputType === 'select' ? (
                                                <FormControl
                                                    fullWidth
                                                    variant="outlined"
                                                    error={!!errors[cfg.name]}
                                                    sx={{ mb: 2 }}
                                                >
                                                    <InputLabel id={`${cfg.name}-label`}>{cfg.label}</InputLabel>
                                                    <Select
                                                        labelId={`${cfg.name}-label`}
                                                        label={cfg.label}
                                                        name={cfg.name}
                                                        value={features[cfg.name]}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
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
                                                    <FormHelperText>
                                                        {errors[cfg.name] || cfg.tooltip}
                                                    </FormHelperText>
                                                </FormControl>
                                            ) : (
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    margin="normal"
                                                    name={cfg.name}
                                                    type={cfg.inputType === 'number' ? 'number' : 'text'}
                                                    label={cfg.label}
                                                    value={features[cfg.name]}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={!!errors[cfg.name]}
                                                    helperText={errors[cfg.name] || cfg.tooltip}
                                                    inputProps={{
                                                        ...(cfg.inputType === 'number'
                                                            ? { min: cfg.min, max: cfg.max, step: cfg.step || 1 }
                                                            : {})
                                                    }}
                                                    sx={{ mb: 1 }}
                                                />
                                            )}
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
                    </Grid>

                    {/* Help Sidebar */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 2, borderRadius: 3, backgroundColor: '#fafafa' }}>
                            <HelpSidebar hoveredField={hoveredField} />
                        </Paper>
                    </Grid>
                </Grid>


                {/* Result Modal */}
                {result && (
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        fullWidth
                        maxWidth="sm"
                        PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
                    >
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
                                        {result.prediction === 1
                                            ? 'High likelihood of heart disease'
                                            : 'Low likelihood of heart disease'}
                                    </Typography>
                                    <Typography sx={{ mt: 1 }}>
                                        Risk score: {(result.probability?.[1] ?? 0 * 100).toFixed(1)}% positive,{' '}
                                        {(result.probability?.[0] ?? 0 * 100).toFixed(1)}% negative
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
                )}
                {/* Navigation Buttons */}
                <Box mt={4}
                    display="flex"
                    justifyContent="center"
                    sx={{ gap: 1 }}>
                    <Button variant="contained" color="primary" onClick={() => navigate('/data-clean')}>
                        Back
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => navigate('/')}>
                        Home
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => navigate('/predict')}>
                        Next
                    </Button>
                </Box>
                <br />
                <br />
            </Container>

        </Layout>
    );
}
