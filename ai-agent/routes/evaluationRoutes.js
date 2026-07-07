const express = require('express');
const router = express.Router();
const EvaluationAgent = require('../agents/EvaluationAgent');

router.post('/', async (req, res) => {
  try {
    const ideaData = req.body;
    
    if (!ideaData || !ideaData.title) {
      return res.status(400).json({ error: 'Idea data is required' });
    }

    const result = await EvaluationAgent.evaluateIdea(ideaData);
    
    if (result.success) {
      res.json(result.data);
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error in evaluation route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
