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
        <Route path="/dashboard" element={<div>Dashboard (Placeholder)</div>} />
        <Route path="/" element={<div>
          <h1>Welcome to Flowva</h1>
          <a href="/signin">Sign In</a> | <a href="/signup">Sign Up</a>
        </div>} />
      </Routes>
    </Router>
  );
}

export default App;