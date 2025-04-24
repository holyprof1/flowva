const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const path = require('path');
const fs = require('fs');

// Log .env file existence
const envPath = path.resolve(__dirname, '.env');
console.log('Attempting to load .env from:', envPath);
if (fs.existsSync(envPath)) {
  console.log('.env file exists');
  console.log('Raw .env contents:', fs.readFileSync(envPath, 'utf8'));
} else {
  console.log('.env file NOT found');
}

// Load .env explicitly
const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error('dotenv parsing error:', result.error);
  process.exit(1);
}

const app = express();

// Log environment variables
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Undefined');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Undefined');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Undefined');

// Validate critical env variables
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined');
  process.exit(1);
}

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'https://merry-cendol-eda9bd.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Log CORS requests
app.use((req, res, next) => {
  console.log(`CORS: ${req.method} ${req.url} from ${req.headers.origin}`);
  next();
});

app.use(express.json());
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Health check endpoint
app.get('/', (req, res) => {
  res.send('FlowvaHub API is running');
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});