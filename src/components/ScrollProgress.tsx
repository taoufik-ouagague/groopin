import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-200 dark:bg-gray-800">
      <div
        className="h-full bg-gradient-to-r from-[rgb(100,39,129)] via-[rgb(163,41,134)] to-[rgb(156,41,134)] transition-all duration-150 ease-out shadow-lg shadow-purple-500/50"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
