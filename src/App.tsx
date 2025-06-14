import React, { useState, useEffect } from 'react';
import { Moon, Sun, Send, Play, Calendar, ExternalLink, MessageCircle } from 'lucide-react';
import { SocialLinks } from './components/SocialLinks';
import { Hero } from './components/Hero';
import { MessageSection } from './components/MessageSection';
import { LatestStreams } from './components/LatestStreams';
import { Footer } from './components/Footer';
import logo from './img/logo2.png';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-red-950 to-black text-white' 
        : 'bg-gradient-to-br from-gray-100 via-red-50 to-white text-gray-900'
    }`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b border-opacity-20 transition-all duration-300 ${
        darkMode 
          ? 'bg-black/70 border-red-800' 
          : 'bg-white/70 border-red-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div>
                <img src={logo} alt="Logo" className="logo" style={{ width: '40px', height: '40px' }} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                PANODAX
              </span>
            </div>
            
            {/* Hide SocialLinks on mobile */}
            <div className="hidden sm:flex items-center space-x-6">
              <SocialLinks darkMode={darkMode} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero darkMode={darkMode} />

      {/* Message Section */}
      <MessageSection darkMode={darkMode} />

      {/* Latest Streams */}
      <LatestStreams darkMode={darkMode} />

      {/* Footer */}
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;