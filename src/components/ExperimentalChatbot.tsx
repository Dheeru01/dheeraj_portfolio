
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useChat } from '../hooks/useChat';

export const ExperimentalChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    messagesEndRef,
    handleSendMessage
  } = useChat();

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
