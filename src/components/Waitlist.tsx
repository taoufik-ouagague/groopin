import { useState, useEffect } from 'react';
import { Mail, CheckCircle2, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { createConfetti } from '../utils/confetti';
import SocialShare from './SocialShare';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [position, setPosition] = useState<number | null>(null);
  const [referredBy, setReferredBy] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
      setReferredBy(refCode);
    }
  }, []);

  const generateReferralCode = async (): Promise<string> => {
    const { data, error } = await supabase.rpc('generate_referral_code');
    if (error || !data) {
      const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      return randomCode;
    }
    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email) {
      setError('Please enter your email address');
      setIsLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const newReferralCode = await generateReferralCode();

      let referrerId = null;
      if (referredBy) {
        const { data: referrerData } = await supabase
          .from('waitlist_signups')
          .select('id')
          .eq('referral_code', referredBy)
          .maybeSingle();

        if (referrerData) {
          referrerId = referrerData.id;
        }
      }

      const { data, error: insertError } = await supabase
        .from('waitlist_signups')
        .insert([
          {
            email,
            name: name || null,
            city: city || null,
            referral_code: newReferralCode,
            referred_by: referrerId,
          },
        ])
        .select()
        .single();

      if (insertError) {
        if (insertError.code === '23505') {
          setError('This email is already on the waitlist!');
        } else {
          throw insertError;
        }
        setIsLoading(false);
        return;
      }

      if (referrerId) {
        const { data: referrerData } = await supabase
          .from('waitlist_signups')
          .select('referral_count')
          .eq('id', referrerId)
          .single();

        if (referrerData) {
          await supabase
            .from('waitlist_signups')
            .update({ referral_count: referrerData.referral_count + 1 })
            .eq('id', referrerId);
        }
      }

      const { count } = await supabase
        .from('waitlist_signups')
        .select('*', { count: 'exact', head: true })
        .lte('created_at', data.created_at);

      setReferralCode(newReferralCode);
      setPosition(count || 1);
      setSubmitted(true);
      createConfetti();

      setTimeout(() => {
        setEmail('');
        setName('');
        setCity('');
      }, 100);
    } catch (err) {
      console.error('Error submitting to waitlist:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="waitlist" className="py-20 bg-gradient-to-br from-[rgb(100,39,129)] via-[rgb(163,41,134)] to-[rgb(156,41,134)] dark:from-[rgb(80,29,109)] dark:via-[rgb(143,31,114)] dark:to-[rgb(136,31,114)] transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Be the First to Experience Groopin
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join our waiting list and get early access when we launch. Plus, receive exclusive updates and special perks!
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            {referredBy && (
              <div className="mb-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border-2 border-white/20">
                <p className="text-white font-semibold">
                  🎉 You were referred! You'll both get special rewards when you join!
                </p>
              </div>
            )}

            <div className="space-y-4 mb-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address (required)"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-all duration-300"
                />
              </div>

              <div className="relative">
                <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-all duration-300"
                />
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                  📍
                </span>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Your city (optional)"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-all duration-300"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-8 py-4 bg-white text-purple-600 rounded-2xl font-semibold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                  Joining...
                </span>
              ) : (
                'Join Waitlist'
              )}
            </button>

            {error && (
              <p className="text-red-300 text-center mt-4 animate-fade-in-up bg-red-900/30 backdrop-blur-sm rounded-xl p-3">
                {error}
              </p>
            )}
          </form>
        ) : (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center animate-fade-in-up border-2 border-white/20">
              <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">
                Welcome to Groopin!
              </h3>
              <p className="text-white/90 mb-6">
                You're #{position} on the waitlist! We'll be in touch soon with exciting updates.
              </p>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                <p className="text-sm text-white/80 mb-3 font-semibold">
                  Your Unique Referral Code:
                </p>
                <div className="bg-white rounded-xl p-4 mb-3">
                  <code className="text-3xl font-bold text-purple-600 tracking-wider">
                    {referralCode}
                  </code>
                </div>
                <p className="text-xs text-white/80">
                  Share this code with friends and move up the waitlist when they join!
                </p>
              </div>
            </div>

            <SocialShare referralCode={referralCode} />
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-white/80 text-sm">
            By joining, you agree to receive updates from Groopin. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
