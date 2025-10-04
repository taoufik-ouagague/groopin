import { Award, Trophy, Star, Zap, Crown, Target, Flame, Heart } from 'lucide-react';

const achievements = [
  {
    id: 1,
    name: 'Early Adopter',
    description: 'Join the waitlist before launch',
    icon: Star,
    color: 'from-yellow-400 to-orange-500',
    unlocked: true,
  },
  {
    id: 2,
    name: 'Social Butterfly',
    description: 'Join 10 different activities',
    icon: Heart,
    color: 'from-pink-400 to-rose-500',
    unlocked: false,
  },
  {
    id: 3,
    name: 'Influencer',
    description: 'Refer 5 friends successfully',
    icon: Zap,
    color: 'from-purple-400 to-indigo-500',
    unlocked: false,
  },
  {
    id: 4,
    name: 'Activity Creator',
    description: 'Create your first activity',
    icon: Target,
    color: 'from-green-400 to-emerald-500',
    unlocked: false,
  },
  {
    id: 5,
    name: 'Super Host',
    description: 'Host 20 successful activities',
    icon: Crown,
    color: 'from-yellow-500 to-amber-600',
    unlocked: false,
  },
  {
    id: 6,
    name: 'On Fire',
    description: 'Join activities 7 days in a row',
    icon: Flame,
    color: 'from-orange-500 to-red-600',
    unlocked: false,
  },
  {
    id: 7,
    name: 'Champion',
    description: 'Reach top 10 on leaderboard',
    icon: Trophy,
    color: 'from-blue-400 to-cyan-500',
    unlocked: false,
  },
  {
    id: 8,
    name: 'Legend',
    description: 'Complete all achievements',
    icon: Award,
    color: 'from-purple-600 to-pink-600',
    unlocked: false,
  },
];

export default function Achievements() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
            <Award className="w-4 h-4" />
            Unlock Rewards
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Achievements to Earn
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Level up your Groopin experience and unlock exclusive badges, perks, and bragging rights
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.id}
                className={`relative group ${
                  achievement.unlocked
                    ? 'bg-white dark:bg-gray-800'
                    : 'bg-gray-100 dark:bg-gray-800/50'
                } rounded-2xl p-6 border-2 ${
                  achievement.unlocked
                    ? 'border-purple-500 dark:border-purple-400'
                    : 'border-gray-300 dark:border-gray-700'
                } hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {!achievement.unlocked && (
                  <div className="absolute inset-0 bg-gray-200/50 dark:bg-gray-900/50 rounded-2xl backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-gray-400 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl">��</span>
                      </div>
                      <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                        Locked
                      </p>
                    </div>
                  </div>
                )}

                <div
                  className={`w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <div className="text-center">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </div>

                {achievement.unlocked && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="text-left">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Your Progress</p>
                <div className="flex items-center gap-2">
                  <div className="w-48 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] transition-all duration-1000"
                      style={{ width: '12.5%' }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">1/8</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12.5%</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Complete</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
