const express = require('express');
const router = express.Router();
const ChatbotAgent = require('../agents/ChatbotAgent');

router.post('/', async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const result = await ChatbotAgent.chat(message, context || {});
    
    if (result.success) {
      res.json(result.data);
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error in chatbot route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
