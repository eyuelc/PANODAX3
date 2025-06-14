import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Play, ExternalLink } from 'lucide-react';

interface LatestStreamsProps {
  darkMode: boolean;
}

interface Video {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
  url: string;
}

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID; 

export const LatestStreams: React.FC<LatestStreamsProps> = ({ darkMode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=4`
    )
      .then(res => res.json())
      .then(data => {
        setVideos(
          data.items
            .filter((item: any) => item.id.kind === 'youtube#video')
            .map((item: any) => ({
              id: item.id.videoId,
              title: item.snippet.title,
              date: item.snippet.publishedAt,
              thumbnail: item.snippet.thumbnails.medium.url,
              url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            }))
        );
      });
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-20 px-4 sm:px-6 lg:px-8 ${
        darkMode
          ? 'bg-gradient-to-r from-gray-900/50 to-red-900/30'
          : 'bg-gradient-to-r from-white/80 to-red-50/50'
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 text-center ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Latest Streams
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {videos.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-110 hover:z-10 ${
                  darkMode
                    ? 'bg-gray-800 border border-gray-700 hover:bg-red-800 hover:border-red-700 text-amber-400 hover:text-amber-300'
                    : 'bg-gray-200 border border-gray-200 hover:bg-red-100 hover:border-red-300 text-red-600 hover:text-red-700'
                }`}
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:opacity-90 transition-all duration-300"
                />
                <div className="p-4 flex flex-col flex-1">
                  <h3 className={`font-semibold text-lg mb-2 group-hover:underline ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {video.title}
                  </h3>
                  <div className="flex items-center text-sm mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {new Date(video.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium transition-all duration-300 ${
                      darkMode
                        ? 'bg-red-900 text-amber-400 group-hover:bg-amber-400 group-hover:text-red-900'
                        : 'bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white'
                    }`}>
                      <Play className="w-3 h-3 mr-1" />
                      Watch
                    </span>
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:scale-125 transition-transform duration-300" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};