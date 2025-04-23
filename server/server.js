const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const onboardingRoutes = require('./routes/onboarding');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Flowva Backend is Running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/onboarding', onboardingRoutes);

mongoose.connect(process.env.mongo_uri)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(process.env.port || 5000, () => console.log(`🚀 Server running on port ${process.env.port || 5000}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));