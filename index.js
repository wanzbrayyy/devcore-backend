const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const runSetup = require('./utils/initialSetup');

const app = express();
app.use(cors());
app.use(express.json());

// Connect Database
connectDB().then(() => runSetup());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/system', require('./routes/systemRoutes')); // Ini yang bikin error kalau filenya gak ada
app.use('/api/v1', require('./routes/externalRoutes'));

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
