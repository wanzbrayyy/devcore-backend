const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const runSetup = require('./utils/initialSetup');

const app = express();
app.use(cors());
app.use(express.json());

connectDB().then(() => runSetup());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/system', require('./routes/systemRoutes'));
// Mount External API (mirip OpenAI structure)
app.use('/api/v1', require('./routes/externalRoutes'));

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
