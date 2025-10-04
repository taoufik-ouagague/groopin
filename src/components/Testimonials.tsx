import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Travel Enthusiast',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'Groopin helped me find amazing travel companions for my trip to Japan. The connections I made are genuine and lasting.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Sports Lover',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'I was new to the city and struggling to find a basketball group. Within a week of joining Groopin, I had my regular team!',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Foodie',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'The dining experiences I have shared through Groopin are unforgettable. Meeting fellow food lovers has been incredible.',
    rating: 5,
  },
  {
    name: 'David Thompson',
    role: 'Culture Explorer',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'From art galleries to theater shows, Groopin connects me with people who share my passion for culture and the arts.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[rgb(100,39,129)] via-[rgb(163,41,134)] to-[rgb(156,41,134)] bg-clip-text text-transparent mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real stories from real people
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl shadow-2xl p-8 sm:p-12 transition-all duration-500">
            <div className="flex flex-col items-center text-center">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-purple-500 shadow-lg"
              />

              <div className="flex mb-4">
                {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                "{testimonials[currentIndex].text}"
              </p>

              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {testimonials[currentIndex].name}
              </h4>

              <p className="text-lg text-purple-600 dark:text-purple-400">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </div>

          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] w-8'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
