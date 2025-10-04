import { Newspaper, Quote } from 'lucide-react';

const pressFeatures = [
  {
    id: 1,
    outlet: 'TechCrunch',
    quote: 'Groopin is revolutionizing how people connect through shared interests',
    logo: '📰',
  },
  {
    id: 2,
    outlet: 'Forbes',
    quote: 'The future of social networking is here',
    logo: '💼',
  },
  {
    id: 3,
    outlet: 'Wired',
    quote: 'A game-changer for community building',
    logo: '⚡',
  },
  {
    id: 4,
    outlet: 'The Verge',
    quote: 'Making real connections in the digital age',
    logo: '🔷',
  },
  {
    id: 5,
    outlet: 'Fast Company',
    quote: 'Innovation meets social impact',
    logo: '🚀',
  },
  {
    id: 6,
    outlet: 'Business Insider',
    quote: 'The platform everyone is talking about',
    logo: '📊',
  },
];

export default function PressMedia() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
            <Newspaper className="w-4 h-4" />
            As Seen In
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Press & Media
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Leading publications are talking about the Groopin revolution
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {pressFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <Quote className="w-8 h-8 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-gray-700 dark:text-gray-300 italic mb-4 text-lg">
                    "{feature.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{feature.logo}</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {feature.outlet}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-500 dark:border-purple-400 rounded-3xl p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-6">🎯</div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Join the Movement
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Don't miss out on being part of the next big thing in social networking.
              Join thousands already on the waitlist!
            </p>
            <button
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] text-white rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              Get Early Access
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 items-center opacity-60">
          {['🏆', '⭐', '💎', '🔥', '✨', '🎨', '🌟', '💫'].map((emoji, index) => (
            <div
              key={index}
              className="text-4xl hover:scale-125 transition-transform duration-300 animate-float"
              style={{ animationDelay: `${index * 0.5}s`, animationDuration: `${3 + index * 0.5}s` }}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
