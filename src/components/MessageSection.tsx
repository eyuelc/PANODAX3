import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import axios from 'axios';
const VITE_MESSAGE_API = import.meta.env.VITE_MESSAGE_API;

interface MessageSectionProps {
  darkMode: boolean;
}

export const MessageSection: React.FC<MessageSectionProps> = ({ darkMode }) => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setIsSubmitted(true);
      try {
        await axios.post(VITE_MESSAGE_API, { message });
      } catch (error) {
        console.error('Failed to send message:', error);
      }
      setTimeout(() => {
        setMessage('');
        setIsSubmitted(false);
      }, 2000);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`py-20 px-4 sm:px-6 lg:px-8 ${
        darkMode 
          ? 'bg-gradient-to-r from-gray-900/50 to-red-900/30'
          : 'bg-gradient-to-r from-white/80 to-red-50/50'
      }`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex justify-center mb-8">
            <div className={`p-4 rounded-full ${
              darkMode 
                ? 'bg-gradient-to-br from-amber-500 to-yellow-600 shadow-lg shadow-amber-900/50'
                : 'bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-500/30'
            }`}>
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Say Hi to my Community on Telegram
          </h2>
          
          <p className={`text-lg sm:text-xl mb-12 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Send a message and be part of the PANODAX community
          </p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Send a message to PANODAX"
                  className={`w-full px-6 py-4 rounded-xl text-lg border-2 transition-all duration-300 focus:outline-none focus:ring-4 ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-amber-500 focus:ring-amber-500/30 focus:shadow-lg focus:shadow-amber-500/20'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-amber-400 focus:ring-amber-400/30 focus:shadow-lg focus:shadow-amber-400/20'
                  }`}
                />
              </div>
              <button
                type="submit"
                disabled={!message.trim() || isSubmitted}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
                  darkMode
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-white shadow-lg shadow-amber-900/50 hover:shadow-amber-500/30'
                    : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-400/40'
                } ${isSubmitted ? 'animate-pulse' : 'hover:glow'}`}
              >
                {isSubmitted ? (
                  <span>Sent! ✨</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};