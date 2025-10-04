import { Check, X } from 'lucide-react';

interface ComparisonItem {
  feature: string;
  traditional: boolean;
  groopin: boolean;
}

const comparisons: ComparisonItem[] = [
  { feature: 'Find people with shared interests', traditional: false, groopin: true },
  { feature: 'Verified user profiles', traditional: false, groopin: true },
  { feature: 'Create custom activities', traditional: false, groopin: true },
  { feature: 'Multiple interest categories', traditional: false, groopin: true },
  { feature: 'Real-time chat and coordination', traditional: false, groopin: true },
  { feature: 'Safety features and moderation', traditional: false, groopin: true },
  { feature: 'Activity recommendations', traditional: false, groopin: true },
  { feature: 'Rating and review system', traditional: false, groopin: true },
  { feature: 'Instant connections', traditional: false, groopin: true },
  { feature: 'Organized group management', traditional: false, groopin: true },
];

export default function Comparison() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[rgb(100,39,129)] via-[rgb(163,41,134)] to-[rgb(156,41,134)] bg-clip-text text-transparent mb-4">
            Why Choose Groopin?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See how Groopin transforms the way you connect with others
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-3 bg-gradient-to-r from-[rgb(100,39,129)] via-[rgb(163,41,134)] to-[rgb(156,41,134)] text-white p-6">
            <div className="col-span-1"></div>
            <div className="text-center font-bold text-lg">
              Traditional Methods
            </div>
            <div className="text-center font-bold text-lg">
              Groopin
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {comparisons.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200"
              >
                <div className="col-span-1 flex items-center">
                  <span className="text-gray-900 dark:text-white font-medium">
                    {item.feature}
                  </span>
                </div>

                <div className="flex items-center justify-center">
                  {item.traditional ? (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900">
                      <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900">
                      <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center">
                  {item.groopin ? (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)]">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900">
                      <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] p-8 text-center">
            <p className="text-xl text-white font-semibold mb-4">
              Ready to experience the Groopin difference?
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('waitlist');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              Join the Waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
