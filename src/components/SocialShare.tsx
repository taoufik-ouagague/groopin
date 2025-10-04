import { Share2, Twitter, Facebook, Linkedin, Link, Check } from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
  referralCode?: string;
}

export default function SocialShare({ referralCode }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = referralCode
    ? `${window.location.origin}?ref=${referralCode}`
    : window.location.origin;

  const shareText = referralCode
    ? `Join me on Groopin - the best way to find activities and meet people who share your interests! Use my code ${referralCode} for exclusive perks`
    : 'Check out Groopin - the best way to find activities and meet people who share your interests!';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    let url = '';
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-500 dark:border-purple-400 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] rounded-lg">
          <Share2 className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Share Groopin
        </h3>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {referralCode
          ? 'Share your unique referral link and earn rewards when friends join!'
          : 'Spread the word about Groopin and help us build an amazing community!'}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <button
          onClick={() => handleShare('twitter')}
          className="flex items-center justify-center gap-2 p-3 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
        >
          <Twitter className="w-5 h-5" />
          <span className="hidden sm:inline">Twitter</span>
        </button>

        <button
          onClick={() => handleShare('facebook')}
          className="flex items-center justify-center gap-2 p-3 bg-[#4267B2] hover:bg-[#365899] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
        >
          <Facebook className="w-5 h-5" />
          <span className="hidden sm:inline">Facebook</span>
        </button>

        <button
          onClick={() => handleShare('linkedin')}
          className="flex items-center justify-center gap-2 p-3 bg-[#0077B5] hover:bg-[#006399] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
        >
          <Linkedin className="w-5 h-5" />
          <span className="hidden sm:inline">LinkedIn</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              <span className="hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <Link className="w-5 h-5" />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>

      {referralCode && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-semibold">
            Your Referral Link:
          </p>
          <code className="text-sm text-purple-600 dark:text-purple-400 break-all font-mono">
            {shareUrl}
          </code>
        </div>
      )}
    </div>
  );
}
