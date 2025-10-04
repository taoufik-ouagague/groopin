import { useState, useEffect } from 'react';
import { X, Gift, Sparkles } from 'lucide-react';

interface ExitIntentProps {
  onClose: () => void;
}

export default function ExitIntent({ onClose }: ExitIntentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('exitIntentSeen');
    if (hasSeenPopup) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsVisible(true);
        localStorage.setItem('exitIntentSeen', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  const handleJoinWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-up">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full p-8 relative border-4 border-purple-500 dark:border-purple-400 animate-slide-up">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative w-20 h-20 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] rounded-full flex items-center justify-center mx-auto">
              <Gift className="w-10 h-10 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Wait! Don't Miss Out
          </h2>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-500 dark:border-yellow-400 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                Exclusive Early Bird Offer
              </span>
              <Sparkles className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-semibold">
              Join now and get:
            </p>
            <ul className="text-left mt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Priority access when we launch</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>3 months free premium membership</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Exclusive founder badge</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Special referral rewards</span>
              </li>
            </ul>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Join <span className="font-bold text-purple-600 dark:text-purple-400">5,000+</span> people already on the waitlist
          </p>

          <div className="space-y-3">
            <button
              onClick={handleJoinWaitlist}
              className="w-full py-4 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] text-white rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              Yes! Save My Spot
            </button>
            <button
              onClick={handleClose}
              className="w-full py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
            >
              No thanks, I'll pass on this offer
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span>Limited time offer - Join before it's too late!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
