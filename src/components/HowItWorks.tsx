import { useEffect, useRef, useState } from 'react';
import { UserPlus, Heart, Rocket } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Sign Up',
    description: 'Create your account in seconds. Tell us about your interests and passions.',
  },
  {
    icon: Heart,
    number: '02',
    title: 'Choose Passions',
    description: 'Select the activities and categories that excite you. Join groups or create your own.',
  },
  {
    icon: Rocket,
    number: '03',
    title: 'Meet & Share',
    description: 'Connect with like-minded people. Share experiences and create lasting memories.',
  },
];

export default function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, index * 300);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[rgb(100,39,129)] via-[rgb(163,41,134)] to-[rgb(156,41,134)] bg-clip-text text-transparent mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[rgb(100,39,129)] via-[rgb(163,41,134)] to-[rgb(156,41,134)] transform -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-700 transform ${
                  visibleSteps[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.number}
                </div>

                <div className="text-center mt-6">
                  <div className="inline-flex p-4 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] rounded-2xl mb-6">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] rounded-2xl opacity-0 hover:opacity-5 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
