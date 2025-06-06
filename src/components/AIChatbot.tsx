
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface PortfolioData {
  skills: Array<{ name: string; level: number }>;
  projects: Array<{ title: string; description: string; tech: string }>;
  experience: Array<{ title: string; company: string; period: string; description: string }>;
  education: Array<{ degree: string; school: string; period: string; location: string }>;
  about: string;
  contact: { email: string; phone: string };
}

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi! I'm Dheeraj's AI assistant. I can answer questions about his skills, projects, education, and experience. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const API_KEY = "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";

  // Portfolio data that the AI can access
  const portfolioData: PortfolioData = {
    skills: [
      { name: 'React', level: 95 },
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 88 },
      { name: 'TypeScript', level: 85 },
      { name: 'MongoDB', level: 82 },
      { name: 'AWS', level: 80 },
      { name: 'Machine Learning', level: 78 },
      { name: 'Docker', level: 75 }
    ],
    projects: [
      { title: 'AI-Powered Task Manager', description: 'A smart task management app', tech: 'React, Node.js, AI' },
      { title: 'E-commerce Platform', description: 'Full-stack shopping platform', tech: 'Next.js, MongoDB' }
    ],
    experience: [
      { title: 'Software Engineer Intern', company: 'Tech Corp', period: '2024 - Present', description: 'Working on React applications and backend services' }
    ],
    education: [
      { degree: 'Master of Science in Computer Science', school: 'Stanford University', period: '2018 - 2020', location: 'Stanford, CA' },
      { degree: 'Bachelor of Technology in Computer Science', school: 'Indian Institute of Technology', period: '2014 - 2018', location: 'Mumbai, India' }
    ],
    about: 'Passionate Full Stack Developer with expertise in modern web technologies and AI/ML implementations.',
    contact: { email: 'dheeraj@example.com', phone: '+1234567890' }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateContextualPrompt = (userQuestion: string) => {
    return `You are an AI assistant for Kanukuntla Dheeraj's portfolio. Here is the current portfolio data:

SKILLS: ${portfolioData.skills.map(s => `${s.name} (${s.level}% proficiency)`).join(', ')}

PROJECTS: ${portfolioData.projects.map(p => `${p.title}: ${p.description} (Technologies: ${p.tech})`).join(' | ')}

EXPERIENCE: ${portfolioData.experience.map(e => `${e.title} at ${e.company} (${e.period}): ${e.description}`).join(' | ')}

EDUCATION: ${portfolioData.education.map(e => `${e.degree} from ${e.school} (${e.period}), ${e.location}`).join(' | ')}

ABOUT: ${portfolioData.about}

CONTACT: Email: ${portfolioData.contact.email}, Phone: ${portfolioData.contact.phone}

User Question: ${userQuestion}

Please provide a helpful, conversational response about Dheeraj's portfolio. If asked about downloading resume, mention that they can click the download button in the resume section. Keep responses concise but informative. If the question is not related to the portfolio, politely redirect to portfolio-related topics.`;
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
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant for a software developer\'s portfolio. Be conversational, informative, and friendly.'
            },
            {
              role: 'user',
              content: generateContextualPrompt(inputMessage)
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const aiResponse: Message = {
        id: Date.now() + 1,
        content: data.choices[0].message.content,
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
        className="fixed bottom-4 left-4 bg-gradient-to-r from-green-500 to-blue-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50"
      >
        <MessageCircle size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 w-80 h-96 bg-slate-900 rounded-lg shadow-2xl border border-gray-600 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-600">
        <div className="flex items-center gap-2">
          <Bot className="text-green-400" size={20} />
          <span className="text-white font-semibold">AI Assistant</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            {!message.isUser && (
              <Bot className="text-green-400 mt-1 flex-shrink-0" size={16} />
            )}
            <div
              className={`max-w-[70%] p-3 rounded-lg text-sm ${
                message.isUser
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              {message.content}
            </div>
            {message.isUser && (
              <User className="text-blue-400 mt-1 flex-shrink-0" size={16} />
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2 justify-start">
            <Bot className="text-green-400 mt-1" size={16} />
            <div className="bg-gray-700 text-gray-100 p-3 rounded-lg text-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-600">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about Dheeraj's portfolio..."
            className="flex-1 bg-gray-700 text-white border-gray-600 text-sm"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            <Send size={16} />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Ask about skills, projects, education, or experience!
        </p>
      </div>
    </div>
  );
};
