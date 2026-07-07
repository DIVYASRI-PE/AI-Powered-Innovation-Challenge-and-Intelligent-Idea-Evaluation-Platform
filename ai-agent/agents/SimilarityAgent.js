const llmService = require('../services/llmService');
const { similaritySystemPrompt, generateSimilarityPrompt } = require('../prompts/similarityPrompt');

class SimilarityAgent {
  async checkSimilarity(idea1, idea2) {
    try {
      const prompt = generateSimilarityPrompt(idea1, idea2);
      const similarity = await llmService.generateJSONCompletion(prompt, similaritySystemPrompt);
      
      return {
        success: true,
        data: similarity
      };
    } catch (error) {
      console.error('Error in SimilarityAgent:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = new SimilarityAgent();
