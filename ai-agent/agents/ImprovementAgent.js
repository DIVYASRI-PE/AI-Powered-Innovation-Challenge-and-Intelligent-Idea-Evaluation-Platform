const llmService = require('../services/llmService');
const { improvementSystemPrompt, generateImprovementPrompt } = require('../prompts/improvementPrompt');

class ImprovementAgent {
  async improveIdea(ideaData) {
    try {
      const prompt = generateImprovementPrompt(ideaData);
      const improvements = await llmService.generateJSONCompletion(prompt, improvementSystemPrompt);
      
      return {
        success: true,
        data: improvements
      };
    } catch (error) {
      console.error('Error in ImprovementAgent:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = new ImprovementAgent();
