import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import Onboarding from './Onboarding.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<div>...</div>} />
        <Route path="/" element={<div>...</div>} />
      </Routes>
    </Router>
  );
}
export default App;