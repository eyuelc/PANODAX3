import React, { useEffect, useState } from 'react';
import { Play, Sparkles } from 'lucide-react';
import logo from '../img/logo2.png';

interface HeroProps {
  darkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ darkMode }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className={`absolute top-20 left-10 w-20 h-20 rounded-full opacity-20 animate-pulse ${
          darkMode ? 'bg-red-600' : 'bg-red-400'
        }`}></div>
        <div className={`absolute top-40 right-20 w-16 h-16 rounded-full opacity-30 animate-bounce ${
          darkMode ? 'bg-amber-500' : 'bg-amber-400'
        }`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute bottom-40 left-20 w-12 h-12 rounded-full opacity-25 animate-ping ${
          darkMode ? 'bg-red-500' : 'bg-red-300'
        }`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute bottom-20 right-10 w-24 h-24 rounded-full opacity-15 animate-pulse ${
          darkMode ? 'bg-amber-600' : 'bg-amber-500'
        }`} style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 ${
        darkMode 
          ? 'bg-gradient-to-br from-red-900/20 via-transparent to-amber-900/10'
          : 'bg-gradient-to-br from-red-100/30 via-transparent to-amber-100/20'
      }`}></div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <img
              src={logo}
              alt="Logo"
              width={200}
              height={200}
              />
          </div>

          {/* Main Headline */}
          <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight ${
            isVisible ? 'animate-fade-in-up' : ''
          }`} style={{ animationDelay: '0.2s' }}>
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Join the Stream –
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Games, Stories & More!
            </span>
          </h1>

          {/* Subheading */}
          <p className={`text-xl sm:text-2xl lg:text-3xl mb-12 font-medium transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          } ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} 
          style={{ animationDelay: '0.4s' }}>
            Catch live gaming, epic stories, and fun streams every week.
          </p>

          {/* Sparkles Animation */}
          <div className="flex justify-center space-x-4 animate-bounce" style={{ animationDelay: '0.6s' }}>
            <img
              src={logo}
              alt="Logo"
              className="w-6 h-6"
              style={{ filter: darkMode ? 'brightness(1.2)' : 'none' }}
            />
            <img
              src={logo}
              alt="Logo"
              className="w-8 h-8"
              style={{ filter: darkMode ? 'brightness(0.8) sepia(1) hue-rotate(-30deg)' : 'sepia(1) hue-rotate(-30deg)' }}
            />
            <img
              src={logo}
              alt="Logo"
              className="w-6 h-6"
              style={{ filter: darkMode ? 'brightness(1.2)' : 'none' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};