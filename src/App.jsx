import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './ui/Home';
import Page404 from './components/Page404';
import DataAnalysis from './components/DataAnalysis';
import DataInfo from './components/DataInfo';
import DataCleaning from './components/DataCleaning';
import DataVisualization from './components/DataVisualization';
import DataPrediction from './components/DataPrediction';
import CompareModels from './components/CompareModels';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data-analysis" element={<DataAnalysis />} />
        <Route path="/data-info" element={<DataInfo />} />
        <Route path="/data-clean" element={<DataCleaning />} />
        <Route path="/data-visualization" element={<DataVisualization />} />
        <Route path="/predict" element={<DataPrediction />} />
        <Route path="/compare-models" element={<CompareModels />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
