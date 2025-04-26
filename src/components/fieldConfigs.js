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

export default fieldConfigs;
