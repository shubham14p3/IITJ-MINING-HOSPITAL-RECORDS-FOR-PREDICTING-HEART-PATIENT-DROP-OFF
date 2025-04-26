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
import { useNavigate } from 'react-router-dom';

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

export default helpConfigs;
