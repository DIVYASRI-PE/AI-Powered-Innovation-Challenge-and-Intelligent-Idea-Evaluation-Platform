const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const evaluationRoutes = require('./routes/evaluationRoutes');
const improvementRoutes = require('./routes/improvementRoutes');
const similarityRoutes = require('./routes/similarityRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/ai/evaluate', evaluationRoutes);
app.use('/api/ai/improve', improvementRoutes);
app.use('/api/ai/similarity', similarityRoutes);
app.use('/api/ai/chatbot', chatbotRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Agent is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`AI Agent server is running on port ${PORT}`);
});
