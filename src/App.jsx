import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './ui/Home';
import Page404 from './components/Page404';
import DataAnalysis from './components/DataAnalysis';
import DataInfo from './components/DataInfo';
import DataCleaning from './components/DataCleaning';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data-analysis" element={<DataAnalysis />} />
        <Route path="/data-info" element={<DataInfo />} />
        <Route path="/data-clean" element={<DataCleaning />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
