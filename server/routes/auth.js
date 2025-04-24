const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/signup', async (req, res) => {
  console.log('✅ Received signup request');
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (password.length < 8) {
      console.log('❌ Password too short');
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`❌ Email already exists: ${email}`);
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('🔒 Password hashed');

    const user = await User.create({ email, password: hashedPassword });
    console.log(`✅ User created: ${user._id}`);

    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET is not defined');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('🔑 JWT token generated');

    res.status(201).json({ token, userId: user._id });
  } catch (err) {
    console.error('❌ Signup error:', err.message, err.stack);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

router.post('/signin', async (req, res) => {
  console.log('✅ Received signin request');
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`❌ User not found: ${email}`);
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    console.log(`✅ User found: ${user._id}`);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Password does not match');
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    console.log('🔒 Password verified');

    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET is not defined');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('🔑 JWT token generated');

    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    console.error('❌ Signin error:', err.message, err.stack);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

router.post('/forgot-password', async (req, res) => {
  console.log('✅ Received forgot-password request');
  const { email } = req.body;

  try {
    if (!email) {
      console.log('❌ Missing email');
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`❌ User not found: ${email}`);
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(`✅ User found: ${user._id}`);

    console.log('🔗 Password reset link would be sent');
    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (err) {
    console.error('❌ Forgot-password error:', err.message, err.stack);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

router.post('/google', async (req, res) => {
  console.log('✅ Received Google auth request');
  const { token } = req.body;

  try {
    if (!token) {
      console.log('❌ Missing Google token');
      return res.status(400).json({ error: 'Google token is required' });
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      console.error('❌ GOOGLE_CLIENT_ID is not defined');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, sub: googleId } = ticket.getPayload();
    console.log(`✅ Google user verified: ${email}`);

    let user = await User.findOne({ email });
    if (!user) {
      console.log('✅ Creating new user from Google auth');
      user = await User.create({
        email,
        googleId,
        password: 'google-auth',
      });
    } else {
      console.log('✅ Existing user found:', user._id);
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    }

    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET is not defined');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('🔑 JWT token generated for Google user');

    res.status(200).json({ token: jwtToken, userId: user._id });
  } catch (err) {
    console.error('❌ Google auth error:', err.message, err.stack);
    res.status(500).json({ error: 'Google authentication failed', details: err.message });
  }
});

module.exports = router;