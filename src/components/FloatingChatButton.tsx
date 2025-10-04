import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import AIAgent from './AIAgent';

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Open chat"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />

          <div className="relative w-16 h-16 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300">
            {isOpen ? (
              <X className="w-7 h-7 text-white" />
            ) : (
              <MessageCircle className="w-7 h-7 text-white" />
            )}
          </div>

          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
            <span className="text-white text-xs font-bold">1</span>
          </div>
        </div>

        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Need help? Chat with us!
            </p>
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-gray-800" />
          </div>
        )}
      </button>

      <AIAgent isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
