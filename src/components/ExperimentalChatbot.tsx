
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const ExperimentalChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const GEMINI_API_KEY = "AIzaSyDTIvkJ_EK_IlqFlkf-JpYe2E4ihydeBuA";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to get live portfolio content from the DOM
  const getLivePortfolioContent = () => {
    const sections = document.querySelectorAll("section, .section, .projects-container, .skills, .resume, .certifications, [id*='hero'], [id*='about'], [id*='skills'], [id*='projects'], [id*='resume'], [id*='contact']");
    let content = "";

    sections.forEach(sec => {
      const element = sec as HTMLElement;
      const text = element.innerText?.trim();
      if (text && text.length > 40) {
        content += "\n\n" + text;
      }
    });

    // Also try to get content from common class names
    const additionalSelectors = ['.hero', '.about', '.skills-section', '.projects-section', '.resume-section', '.contact-section'];
    additionalSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        const htmlElement = element as HTMLElement;
        const text = htmlElement.innerText?.trim();
        if (text && text.length > 40) {
          content += "\n\n" + text;
        }
      });
    });

    return content.slice(0, 8000); // limit to 8k tokens
  };

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
      // Get live content from the portfolio
      const liveContent = getLivePortfolioContent();
      
      const prompt = `You are Dheeraj Kanukuntla's AI assistant. The following is the live text content from his portfolio website. Use it to answer questions factually about his skills, projects, education, and achievements. Avoid hallucinating. Be helpful and sound like Dheeraj's digital assistant.

Website Content:
${liveContent}

User Question: ${currentInput}

Please answer the user's question based on this live content from the portfolio.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.5,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const aiResponse: Message = {
        id: Date.now() + 1,
        content: data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.",
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-black text-white px-5 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300 z-50 shadow-lg"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        💬 Ask Dheeraj
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <MessageCircle className="text-blue-600" size={20} />
          <span className="text-black font-semibold">Dheeraj AI</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ height: '360px' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`text-sm ${message.isUser ? 'text-right' : 'text-left'}`}
          >
            <div className="font-bold text-black mb-1">
              {message.isUser ? 'You:' : 'Dheeraj AI:'}
            </div>
            <div className={`${message.isUser ? 'text-blue-600' : 'text-gray-700'}`}>
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left text-sm">
            <div className="font-bold text-black mb-1">Dheeraj AI:</div>
            <div className="text-gray-700">Thinking...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask something about Dheeraj..."
          className="w-full h-[60px] border rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isLoading}
          className="mt-2 w-full p-2 bg-black text-white rounded-lg font-bold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
};
