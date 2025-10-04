import { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Crown } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LeaderboardEntry {
  id: string;
  name: string;
  email: string;
  referral_count: number;
  city: string;
}

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeaders();

    const channel = supabase
      .channel('leaderboard-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'waitlist_signups',
        },
        () => {
          fetchLeaders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLeaders = async () => {
    try {
      const { data, error } = await supabase
        .from('waitlist_signups')
        .select('id, name, email, referral_count, city')
        .gt('referral_count', 0)
        .order('referral_count', { ascending: false })
        .limit(10);

      if (error) throw error;
      if (data) setLeaders(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setIsLoading(false);
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Trophy className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <Award className="w-5 h-5 text-purple-500" />;
    }
  };

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 1:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 2:
        return 'bg-gradient-to-r from-amber-500 to-amber-700';
      default:
        return 'bg-gradient-to-r from-purple-500 to-purple-700';
    }
  };

  if (leaders.length === 0 && !isLoading) {
    return null;
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
            <Trophy className="w-4 h-4" />
            Referral Champions
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Top Referrers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our community champions who are spreading the word about Groopin
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-6 animate-pulse"
              >
                <div className="h-12 bg-gray-200 dark:bg-gray-600 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {leaders.map((leader, index) => (
              <div
                key={leader.id}
                className={`relative group ${
                  index < 3
                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-500 dark:border-purple-400'
                    : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
                } rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 ${getRankBadge(
                      index
                    )} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-2xl font-bold text-white">#{index + 1}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getRankIcon(index)}
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
                        {leader.name || 'Anonymous'}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {leader.city ? `from ${leader.city}` : 'Groopin Champion'}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] bg-clip-text text-transparent">
                      {leader.referral_count}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                      Referrals
                    </p>
                  </div>
                </div>

                {index < 3 && (
                  <div className="absolute top-4 right-4">
                    <div className="flex gap-1">
                      {Array.from({ length: 3 - index }).map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                          style={{ animationDelay: `${i * 200}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-500 dark:border-purple-400 rounded-2xl p-8">
            <Trophy className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Want to be on the leaderboard?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Join the waitlist and share your unique referral code with friends!
            </p>
            <button
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
