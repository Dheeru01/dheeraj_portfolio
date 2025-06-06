
import { useState, useRef, useEffect } from 'react';
import { Message } from '../types/chat';
import { getLivePortfolioContent } from '../utils/portfolioContent';
import { sendMessageToGemini } from '../services/geminiApi';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi! I'm Dheeraj's AI assistant. I can read the live content from his portfolio and answer any questions about his skills, projects, education, and experience. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const liveContent = getLivePortfolioContent();
      
      const prompt = `You are Dheeraj Kanukuntla's AI assistant. The following is the live text content from his portfolio website. Use it to answer questions factually about his skills, projects, education, and achievements. Avoid hallucinating. Be helpful and sound like Dheeraj's digital assistant.

Website Content:
${liveContent}

User Question: ${currentInput}

Please answer the user's question based on this live content from the portfolio.`;

      const responseText = await sendMessageToGemini(prompt);
      
      const aiResponse: Message = {
        id: Date.now() + 1,
        content: responseText,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        content: "Sorry, I'm having trouble connecting right now. Please try again later!",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    messagesEndRef,
    handleSendMessage
  };
};
