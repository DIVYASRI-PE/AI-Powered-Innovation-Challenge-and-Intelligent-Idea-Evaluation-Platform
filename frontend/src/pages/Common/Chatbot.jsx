import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import aiService from '../../services/aiService';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your AI Innovation Assistant. How can I help you with your project today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => Date.now().toString());
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage };
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await aiService.chat(inputMessage, sessionId);
      const assistantMessage = { role: 'assistant', content: response.response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-blue-600 hover:text-blue-800 mb-2"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-800">AI Innovation Assistant</h1>
            <p className="text-gray-600 mt-2">Get help with your innovation projects</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-lg p-3">
                  <p>Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-4">
            <div className="flex space-x-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                rows="2"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                disabled={loading}
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !inputMessage.trim()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 self-end"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Suggested Questions:</h3>
          <div className="space-y-2">
            <button
              onClick={() => setInputMessage('What technologies should I use for my project?')}
              className="block w-full text-left text-blue-800 hover:text-blue-900"
            >
              What technologies should I use for my project?
            </button>
            <button
              onClick={() => setInputMessage('How can I improve my project idea?')}
              className="block w-full text-left text-blue-800 hover:text-blue-900"
            >
              How can I improve my project idea?
            </button>
            <button
              onClick={() => setInputMessage('What makes a good innovation project?')}
              className="block w-full text-left text-blue-800 hover:text-blue-900"
            >
              What makes a good innovation project?
            </button>
            <button
              onClick={() => setInputMessage('How do I structure my project documentation?')}
              className="block w-full text-left text-blue-800 hover:text-blue-900"
            >
              How do I structure my project documentation?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
