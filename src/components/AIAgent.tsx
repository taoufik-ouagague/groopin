import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface AIAgentProps {
  isOpen: boolean;
  onClose: () => void;
}

const botResponses: Record<string, string> = {
  default: "Thanks for your message! I'm Groopin's AI assistant. I can help you with questions about our platform, activities, and waitlist. What would you like to know?",
  hello: "Hello! Welcome to Groopin. I'm here to help you discover amazing activities and connect with like-minded people. What can I help you with today?",
  hi: "Hi there! How can I assist you with Groopin today?",
  help: "I can help you with:\n• Information about Groopin\n• How the platform works\n• Activity categories (Sports, Culture, Travel, Dining)\n• Joining the waitlist\n• Safety and security features\n\nWhat would you like to know?",
  what: "Groopin is a social platform that connects people with shared interests. You can join or create activities across sports, culture, travel, and dining. It's all about turning your passions into unforgettable experiences with like-minded people!",
  how: "Getting started is easy:\n1. Join our waitlist\n2. Once we launch, create your profile\n3. Browse or create activities\n4. Connect with people who share your interests\n5. Have amazing experiences together!",
  when: "We're working hard to launch soon! Join our waitlist to be among the first to know when we go live. Early members will get special perks and priority access!",
  price: "We'll offer both free and premium plans. Free members can join activities and connect with others. Premium members get exclusive events, advanced matching, and more. Full pricing details coming at launch!",
  safe: "Safety is our top priority! We have:\n• Verified user profiles\n• 24/7 moderation team\n• Rating and review system\n• Report and block features\n• Community guidelines\n• Secure platform with end-to-end encryption",
  category: "We have four main categories:\n🏃 Sports - Fitness, team games, outdoor activities\n🎨 Culture - Museums, concerts, art events\n✈️ Travel - Trips, hiking, exploration\n🍽️ Dining - Food tours, cooking classes, restaurants",
  waitlist: "Great choice! Scroll down to our waitlist section and enter your email. You'll be among the first to access Groopin when we launch, plus get exclusive early-bird perks!",
  contact: "You can reach us through:\n• Contact form on this page\n• Chat with me here\n• Email updates via the waitlist\n\nI'm here to help right now! What questions do you have?",
};

export default function AIAgent({ isOpen, onClose }: AIAgentProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Groopin's AI assistant. I can help you learn about our platform, activities, and answer any questions you have. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    return botResponses.default;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-40 border-2 border-gray-200 dark:border-gray-700 animate-slide-up">
      <div className="bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-2 bg-white rounded-full">
              <Bot className="w-6 h-6 text-purple-600" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Groopin Assistant</h3>
            <p className="text-white/80 text-sm">Online</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-900">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.sender === 'user'
                ? 'bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)]'
                : 'bg-white dark:bg-gray-800 border-2 border-purple-500'
            }`}>
              {message.sender === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-purple-600" />
              )}
            </div>
            <div className={`flex-1 ${message.sender === 'user' ? 'flex justify-end' : ''}`}>
              <div
                className={`inline-block px-4 py-3 rounded-2xl max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 border-2 border-purple-500">
              <Bot className="w-4 h-4 text-purple-600" />
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 text-gray-900 dark:text-white"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="px-4 py-3 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] text-white rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
          Powered by Groopin AI
        </p>
      </div>
    </div>
  );
}
