const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  console.log('✅ Received onboarding request');
  const { role, work, workOther, country, tools, goals } = req.body;

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      console.log('❌ No token provided');
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.jwt_secret);
    const userId = decoded.id;
    console.log(`✅ Token verified for user: ${userId}`);

    const user = await User.findById(userId);
    if (!user) {
      console.log(`❌ User not found: ${userId}`);
      return res.status(404).json({ error: 'User not found' });
    }

    user.onboarding = { role, work, workOther, country, tools, goals };
    await user.save();
    console.log(`✅ Onboarding data saved for user: ${userId}`);

    res.status(200).json({ message: 'Onboarding completed successfully' });
  } catch (err) {
    console.error('❌ Onboarding error:', err.message);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;