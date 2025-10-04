import { useEffect, useRef, useState } from 'react';

const stats = [
  { label: 'Users Signed Up', target: 10000, suffix: '+' },
  { label: 'Activities Created', target: 5000, suffix: '+' },
  { label: 'Categories Shared', target: 150, suffix: '+' },
  { label: 'Happy Connections', target: 25000, suffix: '+' },
];

export default function Statistics() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            stats.forEach((stat, index) => {
              const duration = 2000;
              const steps = 60;
              const increment = stat.target / steps;
              let current = 0;

              const timer = setInterval(() => {
                current += increment;
                if (current >= stat.target) {
                  setCounts((prev) => {
                    const newCounts = [...prev];
                    newCounts[index] = stat.target;
                    return newCounts;
                  });
                  clearInterval(timer);
                } else {
                  setCounts((prev) => {
                    const newCounts = [...prev];
                    newCounts[index] = Math.floor(current);
                    return newCounts;
                  });
                }
              }, duration / steps);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-[rgb(100,39,129)] via-[rgb(163,41,134)] to-[rgb(156,41,134)] dark:from-[rgb(80,29,109)] dark:via-[rgb(143,31,114)] dark:to-[rgb(136,31,114)] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Thousands of people are already sharing their passions
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-5xl sm:text-6xl font-bold text-white mb-2">
                {counts[index].toLocaleString()}
                {stat.suffix}
              </div>
              <div className="text-lg text-white/90 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
