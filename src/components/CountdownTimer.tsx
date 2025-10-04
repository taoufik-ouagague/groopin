import { useEffect, useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const launchDate = new Date('2024-12-31T23:59:59').getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 dark:from-black dark:via-purple-950 dark:to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <Calendar className="w-5 h-5 text-purple-400" />
            <span className="text-white font-semibold">Official Launch Coming Soon</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Countdown to Launch
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Be ready when we go live! Join the waitlist for exclusive early access.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
          {timeUnits.map((unit, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />

              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-center">
                <div className="text-5xl sm:text-6xl font-bold text-white mb-2 tabular-nums">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-lg text-purple-300 font-semibold uppercase tracking-wider">
                  {unit.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-white/60">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Time until official launch</span>
          </div>
        </div>
      </div>
    </section>
  );
}
