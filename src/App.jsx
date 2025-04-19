import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './ui/Home';
import Page404 from './components/Page404';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
