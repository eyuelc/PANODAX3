import React from 'react';
import logo from '../img/logo2.png'
import { SocialLinks } from './SocialLinks';

interface FooterProps {
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`py-12 px-4 sm:px-6 lg:px-8 border-t border-opacity-20 ${
      darkMode 
        ? 'bg-black/80 border-red-800'
        : 'bg-gray-900 border-gray-300'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="" className='h-[50px]'/>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              PANODAX
            </span>
          </div>

          {/* Social Links */}
          <SocialLinks darkMode={true} size="md" />

          {/* Follow Text */}
          <p className="text-amber-400 text-lg font-medium text-center">
            Follow for the latest updates!
          </p>


          <div className="w-full border-t border-gray-700"></div>


          <div className="flex flex-col sm:flex-row items-center justify-between w-full space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 PANODAX. Developed By Eyuel Cherenet
            </p>
            <p className="text-gray-500 text-sm">
              Streaming Games, Stories & More
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};