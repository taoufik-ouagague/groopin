import { Shield, Lock, Users, CheckCircle2, Award, Heart } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: 'Verified Users',
    description: 'All members are verified through email and optional phone verification',
  },
  {
    icon: Lock,
    title: 'Secure Platform',
    description: 'End-to-end encryption and industry-standard security protocols',
  },
  {
    icon: Users,
    title: 'Active Moderation',
    description: '24/7 community monitoring and support team',
  },
  {
    icon: CheckCircle2,
    title: 'Quality Control',
    description: 'Rating system and user reviews for accountability',
  },
  {
    icon: Award,
    title: 'Trusted Community',
    description: 'Built on trust, respect, and shared experiences',
  },
  {
    icon: Heart,
    title: 'Privacy First',
    description: 'Your data is protected and never sold to third parties',
  },
];

export default function TrustBadges() {
  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[rgb(100,39,129)] via-[rgb(163,41,134)] to-[rgb(156,41,134)] bg-clip-text text-transparent mb-4">
            Your Safety is Our Priority
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We've built Groopin with security, privacy, and trust at its core
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="group relative bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

              <div className="relative">
                <div className="inline-flex p-4 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] rounded-xl mb-6">
                  <badge.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {badge.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[rgb(100,39,129)] via-[rgb(163,41,134)] to-[rgb(156,41,134)] rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Community Guidelines
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Our community thrives on mutual respect, inclusivity, and positive interactions. We have zero tolerance for harassment, discrimination, or inappropriate behavior.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-semibold">
              Be Respectful
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-semibold">
              Stay Safe
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-semibold">
              Have Fun
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-semibold">
              Build Connections
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
