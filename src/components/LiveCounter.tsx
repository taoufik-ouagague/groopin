import { useState, useEffect } from 'react';
import { Users, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function LiveCounter() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [recentGrowth, setRecentGrowth] = useState(0);

  useEffect(() => {
    fetchCount();

    const channel = supabase
      .channel('waitlist-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'waitlist_signups',
        },
        () => {
          fetchCount();
        }
      )
      .subscribe();

    const interval = setInterval(() => {
      fetchCount();
    }, 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  const fetchCount = async () => {
    try {
      const { count: totalCount, error } = await supabase
        .from('waitlist_signups')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;

      if (totalCount !== null) {
        const growth = totalCount - count;
        if (growth > 0 && count > 0) {
          setRecentGrowth(growth);
          setTimeout(() => setRecentGrowth(0), 3000);
        }
        setCount(totalCount);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching waitlist count:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-20 right-6 z-30">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border-2 border-purple-500 dark:border-purple-400 min-w-[200px]">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] rounded-lg">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold">LIVE</span>
          </div>
        </div>

        <div className="text-center">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto" />
            </div>
          ) : (
            <>
              <div className="text-4xl font-bold bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] bg-clip-text text-transparent mb-1 transition-all duration-500">
                {count.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                People Waiting
              </p>
            </>
          )}
        </div>

        {recentGrowth > 0 && (
          <div className="mt-3 flex items-center justify-center gap-1 text-green-600 dark:text-green-400 animate-fade-in-up">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-bold">+{recentGrowth} just now!</span>
          </div>
        )}
      </div>
    </div>
  );
}
