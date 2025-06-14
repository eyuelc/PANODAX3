import React from 'react';
import { ExternalLink } from 'lucide-react';

interface SocialLinksProps {
  darkMode: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ 
  darkMode, 
  size = 'md', 
  showLabels = false 
}) => {

  const links = [
    { name: 'TikTok', url: 'https://www.tiktok.com/@_panodax_', icon: <i className="fa-brands fa-tiktok"></i> },
    { name: 'Twitch', url: 'https://www.twitch.tv/panodax_', icon: <i className="fa-brands fa-twitch"></i> },
    { name: 'YouTube', url: 'https://www.youtube.com/@PANODAX', icon: <i className="fa-brands fa-youtube"></i> },
    { name: 'Twitter', url: 'https://x.com/PANODAX?t=ue8n3bOAu0L4_gIRPOKelg&s=35', icon: <i className="fa-brands fa-twitter"></i> },
    { name: 'Telegram', url: 'https://t.me/clubPanodax', icon: <i className="fa-brands fa-telegram"></i> }
  ];


  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  return (
    <div className={`flex items-center ${showLabels ? 'flex-col space-y-3' : 'space-x-4'}`}>
      {links.map((link) => (
        <div key={link.name} className={`${showLabels ? 'flex items-center space-x-2' : ''}`}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${sizeClasses[size]} rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group ${
              darkMode
                ? 'bg-gray-800 hover:bg-red-800 text-amber-400 hover:text-amber-300'
                : 'bg-gray-200 hover:bg-red-100 text-red-600 hover:text-red-700'
            }`}
            title={link.name}
          >
            <span className="group-hover:animate-pulse">{link.icon}</span>
          </a>
          {showLabels && (
            <span className={`text-sm font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {link.name}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};