const llmService = require('../services/llmService');
const { chatbotSystemPrompt, generateChatbotPrompt } = require('../prompts/chatbotPrompt');

class ChatbotAgent {
  async chat(userMessage, context = {}) {
    try {
      const prompt = generateChatbotPrompt(userMessage, context);
      const response = await llmService.generateCompletion(prompt, chatbotSystemPrompt);
      
      return {
        success: true,
        data: {
          response: response
        }
      };
    } catch (error) {
      console.error('Error in ChatbotAgent:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = new ChatbotAgent();
