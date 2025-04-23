import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [formData, setFormData] = useState({
    role: '',
    work: [],
    workOther: '',
    country: '',
    tools: [],
    goals: []
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/onboarding', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Onboarding failed');
    }
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

  return (
    <div>
      <h2>Onboarding</h2>
      <form onSubmit={handleSubmit}>
        <select name='role' onChange={handleChange}>
          <option value=''>Select Role</option>
          <option value='developer'>Developer</option>
          <option value='designer'>Designer</option>
        </select>
        <input
          type='text'
          name='country'
          onChange={handleChange}
          placeholder='Country'
        />
        <button type='submit'>Submit</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Onboarding;