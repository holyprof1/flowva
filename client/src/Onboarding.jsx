import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'animate.css';

function Onboarding() {
  const [step, setStep] = useState(0);
  const totalSteps = 5;
  const [formData, setFormData] = useState({
    role: '',
    work: [],
    workOther: '',
    country: '',
    tools: [],
    goals: []
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.role) newErrors.role = 'Please select an option';
      if (formData.work.length === 0) newErrors.work = 'Please select at least one option';
    } else if (step === 4) {
      if (formData.goals.length === 0) newErrors.goals = 'Please select at least one option';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value)
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleToolToggle = (tool) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.includes(tool)
        ? prev.tools.filter((t) => t !== tool)
        : [...prev.tools, tool]
    }));
  };

  const handleNext = () => {
    if (step === 1 || step === 4) {
      if (validateStep()) {
        setStep((prev) => prev + 1);
        setErrors({});
      }
    } else {
      setStep((prev) => prev + 1);
      setErrors({});
    }
  };

  const handleSkip = () => {
    setStep((prev) => prev + 1);
    setErrors({});
  };

  const handleSubmit = () => {
    showMessage('Submitting your info...', 'success');
    setTimeout(() => {
      setShowPopup(true);
    }, 1000);
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate('/');
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="onboarding-container">
      <div className="container animate__animated animate__fadeIn">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
        </div>

        {step === 0 && (
          <div className="step active">
            <div className="welcome-content">
              <h1>Welcome to Flowva</h1>
              <p>Your smart library for organizing tools, tracking usage, and turning productivity into rewards. Let's set up your digital library in 2 minutes.</p>
            </div>
            <div className="btn-group">
              <button className="btn" onClick={handleNext}>Let's Go</button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="step active">
            <h2>About You</h2>
            <p>Help us tailor your library by telling us a bit about yourself.</p>
            <div className="form-group">
              <label>
                What best describes you?{' '}
                {errors.role && <span className="warning" style={{ display: 'block' }}>{errors.role}</span>}
              </label>
              <div className="radio-group">
                {['Freelancer', 'Solo entrepreneur', 'Small team', 'Creator'].map((role) => (
                  <label className="radio-item" key={role}>
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={formData.role === role}
                      onChange={handleChange}
                      required
                    />
                    {role}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>
                What kind of work do you do?{' '}
                {errors.work && <span className="warning" style={{ display: 'block' }}>{errors.work}</span>}
              </label>
              <div className="checkbox-group">
                {['Design', 'Development', 'Writing', 'Marketing', 'Other'].map((work) => (
                  <label className="checkbox-item" key={work}>
                    <input
                      type="checkbox"
                      name="work"
                      value={work}
                      checked={formData.work.includes(work)}
                      onChange={handleChange}
                    />
                    {work}
                    {work === 'Other' && formData.work.includes('Other') && (
                      <input
                        type="text"
                        name="workOther"
                        placeholder="Please specify"
                        value={formData.workOther}
                        onChange={handleChange}
                        className={formData.work.includes('Other') ? '' : 'hidden'}
                      />
                    )}
                  </label>
                ))}
              </div>
            </div>
            <div className="btn-group">
              <button className="btn" onClick={handleNext}>Continue</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step active">
            <h2>Where Are You Based?</h2>
            <p>This helps us personalize tool suggestions, currencies, and rewards for you.</p>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select id="country" name="country" value={formData.country} onChange={handleChange}>
                <option value="">Select your country</option>
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="IN">India</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="JP">Japan</option>
                <option value="BR">Brazil</option>
                <option value="NG">Nigeria</option>
              </select>
            </div>
            <div className="btn-group">
              <button className="btn" onClick={handleNext}>Continue</button>
              <button className="btn-skip" onClick={handleSkip}>Skip this step</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step active">
            <h2>Your Tool Stack</h2>
            <p>Which tools are part of your workflow? We'll pre-load and organize them in your library.</p>
            <div className="tool-grid">
              {[
                { name: 'Notion', icon: '📝' },
                { name: 'Trello', icon: '📋' },
                { name: 'Slack', icon: '💬' },
                { name: 'ClickUp', icon: '✅' },
                { name: 'Canva', icon: '🎨' },
                { name: 'Zapier', icon: '⚡' },
                { name: 'Stripe', icon: '💳' },
                { name: 'Figma', icon: '✏️' },
                { name: 'Calendly', icon: '📅' }
              ].map((tool) => (
                <div
                  key={tool.name}
                  className={`tool-item ${formData.tools.includes(tool.name) ? 'selected' : ''}`}
                  onClick={() => handleToolToggle(tool.name)}
                >
                  <span className="icon">{tool.icon}</span>
                  <span>{tool.name}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              You can always add more tools later in your library settings.
            </p>
            <div className="btn-group">
              <button className="btn" onClick={handleNext}>Continue</button>
              <button className="btn-skip" onClick={handleSkip}>Skip – I'll add them later</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step active">
            <h2>What Do You Want to Track or Improve?</h2>
            <p>This helps us personalize your dashboard and features.</p>
            <div className="form-group">
              <label>
                Select your goals{' '}
                {errors.goals && <span className="warning" style={{ display: 'block' }}>{errors.goals}</span>}
              </label>
              <div className="checkbox-group">
                {[
                  'Subscription costs',
                  'Tool usage & engagement',
                  'Unused/duplicate tools',
                  'Personalized tool suggestions'
                ].map((goal) => (
                  <label className="checkbox-item" key={goal}>
                    <input
                      type="checkbox"
                      name="goals"
                      value={goal}
                      checked={formData.goals.includes(goal)}
                      onChange={handleChange}
                    />
                    {goal}
                  </label>
                ))}
              </div>
            </div>
            <div className="btn-group">
              <button className="btn" onClick={handleNext}>Continue</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="step active">
            <h2>Setup Complete!</h2>
            <p>Your Flowva library is ready to use. We'll take you to your dashboard now where you can start organizing your tools and tracking your productivity.</p>
            <div className="btn-group">
              <button className="btn" onClick={handleSubmit}>Go to Dashboard</button>
            </div>
          </div>
        )}

        {showPopup && (
          <>
            <div className="overlay active"></div>
            <div className="completion-popup active">
              <h2>Onboarding Complete!</h2>
              <p>Taking you to your dashboard now.</p>
              <button className="btn" onClick={closePopup}>OK</button>
            </div>
          </>
        )}

        {message && (
          <div className={`form-message ${messageType}-message`} style={{ display: 'block' }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Onboarding;