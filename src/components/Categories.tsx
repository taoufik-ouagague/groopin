import { useEffect, useRef, useState } from 'react';
import { Dumbbell, Palette, Plane, UtensilsCrossed } from 'lucide-react';

const categories = [
  {
    icon: Dumbbell,
    title: 'Sports',
    description: 'From casual games to competitive leagues, find your perfect workout partner.',
    gradient: 'from-red-500 to-orange-500',
  },
  {
    icon: Palette,
    title: 'Culture',
    description: 'Explore art, music, theater, and cultural events with fellow enthusiasts.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Plane,
    title: 'Travel',
    description: 'Discover new destinations and share adventures with like-minded explorers.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: UtensilsCrossed,
    title: 'Dining',
    description: 'Share culinary experiences, from cozy cafes to fine dining establishments.',
    gradient: 'from-green-500 to-emerald-500',
  },
];

export default function Categories() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            categories.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="categories" ref={sectionRef} className="py-20 bg-white dark:bg-gray-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[rgb(100,39,129)] via-[rgb(163,41,134)] to-[rgb(156,41,134)] bg-clip-text text-transparent mb-4">
            Explore Categories
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Whatever your passion, find your community
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${category.gradient} p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-1 cursor-pointer ${
                visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 text-white">
                <div className="inline-flex p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                  <category.icon className="w-10 h-10" />
                </div>

                <h3 className="text-2xl font-bold mb-3">
                  {category.title}
                </h3>

                <p className="text-white/90 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
