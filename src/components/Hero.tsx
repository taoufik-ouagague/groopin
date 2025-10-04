import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Groopin makes it easy.';

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[rgb(100,39,129)] via-[rgb(163,41,134)] to-[rgb(156,41,134)] dark:from-[rgb(80,29,109)] dark:via-[rgb(143,31,114)] dark:to-[rgb(136,31,114)]">
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white/20 animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
          Looking to share the things you love with others?{' '}
          <span className="text-yellow-300">
            {displayedText}
            <span className="animate-pulse">|</span>
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
          With Groopin, connect with like-minded people and share your passions across sports, culture, travel, and dining.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
          <button
            onClick={() => scrollToSection('waitlist')}
            className="group relative px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl"
          >
            <span className="relative z-10">Join the Waiting List</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>

          <button
            onClick={() => scrollToSection('categories')}
            className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
          >
            Discover Categories
          </button>
        </div>
      </div>

      <button
        onClick={() => scrollToSection('features')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white transition-colors animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
