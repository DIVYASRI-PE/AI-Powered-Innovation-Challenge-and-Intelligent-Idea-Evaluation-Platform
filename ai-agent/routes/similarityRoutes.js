const express = require('express');
const router = express.Router();
const SimilarityAgent = require('../agents/SimilarityAgent');

router.post('/', async (req, res) => {
  try {
    const { idea1, idea2 } = req.body;
    
    if (!idea1 || !idea2 || !idea1.title || !idea2.title) {
      return res.status(400).json({ error: 'Both ideas are required' });
    }

    const result = await SimilarityAgent.checkSimilarity(idea1, idea2);
    
    if (result.success) {
      res.json(result.data);
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Error in similarity route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
