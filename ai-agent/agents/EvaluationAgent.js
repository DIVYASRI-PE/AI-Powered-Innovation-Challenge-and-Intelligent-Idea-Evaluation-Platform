const llmService = require('../services/llmService');
const { evaluationSystemPrompt, generateEvaluationPrompt } = require('../prompts/evaluationPrompt');

class EvaluationAgent {
  async evaluateIdea(ideaData) {
    try {
      const prompt = generateEvaluationPrompt(ideaData);
      const evaluation = await llmService.generateJSONCompletion(prompt, evaluationSystemPrompt);
      
      return {
        success: true,
        data: evaluation
      };
    } catch (error) {
      console.error('Error in EvaluationAgent:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = new EvaluationAgent();
