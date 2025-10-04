import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[rgb(100,39,129)] via-[rgb(163,41,134)] to-[rgb(156,41,134)]">
      <div className="text-center">
        <div className="mb-8 animate-pulse">
          <h1 className="text-6xl sm:text-7xl font-bold text-white mb-4">
            Groopin
          </h1>
          <p className="text-xl text-white/90">
            Connecting passions, creating memories
          </p>
        </div>

        <div className="w-64 mx-auto">
          <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-2 mb-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/80 text-sm">{progress}%</p>
        </div>

        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}
