import { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Signup {
  id: string;
  name: string;
  city: string;
  created_at: string;
}

export default function RecentSignups() {
  const [signups, setSignups] = useState<Signup[]>([]);

  useEffect(() => {
    fetchRecentSignups();

    const channel = supabase
      .channel('recent-signups')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'waitlist_signups',
        },
        (payload) => {
          const newSignup = payload.new as Signup;
          setSignups((prev) => [newSignup, ...prev.slice(0, 4)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchRecentSignups = async () => {
    try {
      const { data, error } = await supabase
        .from('waitlist_signups')
        .select('id, name, city, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      if (data) setSignups(data);
    } catch (error) {
      console.error('Error fetching recent signups:', error);
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(timestamp).getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  if (signups.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-30 max-w-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-purple-500 dark:border-purple-400 overflow-hidden">
        <div className="bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] px-4 py-3">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-white" />
            <h3 className="text-white font-bold text-sm">Recent Signups</h3>
          </div>
        </div>

        <div className="p-2 space-y-1 max-h-[300px] overflow-y-auto">
          {signups.map((signup, index) => (
            <div
              key={signup.id}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">
                  {signup.name ? signup.name.charAt(0).toUpperCase() : '?'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {signup.name || 'Anonymous'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {signup.city ? `from ${signup.city}` : 'joined'} • {getTimeAgo(signup.created_at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
