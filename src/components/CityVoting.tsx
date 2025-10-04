import { useState, useEffect } from 'react';
import { MapPin, TrendingUp, Globe } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface City {
  id: string;
  city_name: string;
  country: string;
  vote_count: number;
}

const initialCities = [
  { name: 'New York', country: 'USA', flag: '🇺🇸' },
  { name: 'Los Angeles', country: 'USA', flag: '🇺🇸' },
  { name: 'London', country: 'UK', flag: '🇬🇧' },
  { name: 'Paris', country: 'France', flag: '🇫🇷' },
  { name: 'Tokyo', country: 'Japan', flag: '🇯🇵' },
  { name: 'Toronto', country: 'Canada', flag: '🇨🇦' },
  { name: 'Sydney', country: 'Australia', flag: '🇦🇺' },
  { name: 'Berlin', country: 'Germany', flag: '🇩🇪' },
  { name: 'Barcelona', country: 'Spain', flag: '🇪🇸' },
  { name: 'Dubai', country: 'UAE', flag: '🇦🇪' },
];

export default function CityVoting() {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [votedCities, setVotedCities] = useState<Set<string>>(new Set());

  useEffect(() => {
    initializeCities();
    loadVotedCities();
  }, []);

  const loadVotedCities = () => {
    const voted = localStorage.getItem('votedCities');
    if (voted) {
      setVotedCities(new Set(JSON.parse(voted)));
    }
  };

  const saveVotedCity = (cityName: string) => {
    const newVoted = new Set(votedCities);
    newVoted.add(cityName);
    setVotedCities(newVoted);
    localStorage.setItem('votedCities', JSON.stringify(Array.from(newVoted)));
  };

  const initializeCities = async () => {
    try {
      for (const city of initialCities) {
        await supabase
          .from('city_votes')
          .upsert(
            {
              city_name: city.name,
              country: city.country,
              vote_count: 0,
            },
            {
              onConflict: 'city_name',
              ignoreDuplicates: true,
            }
          );
      }

      await fetchCities();
    } catch (error) {
      console.error('Error initializing cities:', error);
      setIsLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const { data, error } = await supabase
        .from('city_votes')
        .select('*')
        .order('vote_count', { ascending: false });

      if (error) throw error;
      if (data) setCities(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setIsLoading(false);
    }
  };

  const handleVote = async (cityId: string, cityName: string) => {
    if (votedCities.has(cityName)) return;

    try {
      const city = cities.find((c) => c.id === cityId);
      if (!city) return;

      const { error } = await supabase
        .from('city_votes')
        .update({ vote_count: city.vote_count + 1 })
        .eq('id', cityId);

      if (error) throw error;

      setCities((prev) =>
        prev
          .map((c) => (c.id === cityId ? { ...c, vote_count: c.vote_count + 1 } : c))
          .sort((a, b) => b.vote_count - a.vote_count)
      );

      saveVotedCity(cityName);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const getCityFlag = (cityName: string) => {
    const city = initialCities.find((c) => c.name === cityName);
    return city?.flag || '🌍';
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
            <Globe className="w-4 h-4" />
            Help Us Expand
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Vote for Your City
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tell us where you want Groopin to launch next. The top cities will be prioritized!
          </p>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-6 animate-pulse h-32"
              />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {cities.map((city, index) => {
              const hasVoted = votedCities.has(city.city_name);
              return (
                <button
                  key={city.id}
                  onClick={() => handleVote(city.id, city.city_name)}
                  disabled={hasVoted}
                  className={`relative group ${
                    hasVoted
                      ? 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-2 border-purple-500 dark:border-purple-400'
                      : 'bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400'
                  } rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up ${
                    hasVoted ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {index < 3 && (
                    <div className="absolute top-2 right-2">
                      <div className="flex items-center gap-1 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        TOP {index + 1}
                      </div>
                    </div>
                  )}

                  <div className="text-4xl mb-3">{getCityFlag(city.city_name)}</div>

                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                    {city.city_name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {city.country}
                  </p>

                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] bg-clip-text text-transparent">
                      {city.vote_count}
                    </span>
                  </div>

                  {hasVoted && (
                    <div className="absolute inset-0 flex items-center justify-center bg-purple-500/10 backdrop-blur-[1px] rounded-2xl">
                      <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg">
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                          ✓ Voted
                        </span>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Don't see your city?{' '}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
            >
              Suggest it to us
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
