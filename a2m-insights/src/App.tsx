import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import { Home } from './pages/Home';
import { PolicyPage, TermsContent, RefundContent, PrivacyContent } from './pages/PolicyPage';
import { OrderTracking } from './pages/OrderTracking';

function App() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<PolicyPage title="Terms of Service" lastUpdated={currentDate} content={<TermsContent />} />} />
          <Route path="/refund" element={<PolicyPage title="Refund Policy" lastUpdated={currentDate} content={<RefundContent />} />} />
          <Route path="/privacy" element={<PolicyPage title="Privacy Policy" lastUpdated={currentDate} content={<PrivacyContent />} />} />
          <Route path="/tracking" element={<OrderTracking />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
