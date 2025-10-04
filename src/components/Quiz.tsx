import { useState } from 'react';
import { Dumbbell, Palette, Plane, UtensilsCrossed, ChevronRight, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    category: string;
    icon: typeof Dumbbell;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'How do you prefer to spend your weekends?',
    options: [
      { text: 'Playing sports or working out', category: 'sports', icon: Dumbbell },
      { text: 'Visiting museums or galleries', category: 'culture', icon: Palette },
      { text: 'Exploring new places', category: 'travel', icon: Plane },
      { text: 'Trying new restaurants', category: 'dining', icon: UtensilsCrossed },
    ],
  },
  {
    id: 2,
    question: 'What motivates you the most?',
    options: [
      { text: 'Staying active and healthy', category: 'sports', icon: Dumbbell },
      { text: 'Learning and experiencing art', category: 'culture', icon: Palette },
      { text: 'Discovering new adventures', category: 'travel', icon: Plane },
      { text: 'Enjoying great food', category: 'dining', icon: UtensilsCrossed },
    ],
  },
  {
    id: 3,
    question: 'What kind of social gathering appeals to you?',
    options: [
      { text: 'Group fitness classes or team games', category: 'sports', icon: Dumbbell },
      { text: 'Theater shows or art exhibitions', category: 'culture', icon: Palette },
      { text: 'Road trips or hiking adventures', category: 'travel', icon: Plane },
      { text: 'Food festivals or cooking classes', category: 'dining', icon: UtensilsCrossed },
    ],
  },
];

const categoryResults = {
  sports: {
    title: 'Sports Enthusiast',
    description: 'You thrive on physical activity and teamwork. Join sports groups, fitness classes, and outdoor adventures.',
    gradient: 'from-red-500 to-orange-500',
  },
  culture: {
    title: 'Culture Explorer',
    description: 'You appreciate art, music, and creativity. Discover galleries, concerts, and cultural events with fellow enthusiasts.',
    gradient: 'from-purple-500 to-pink-500',
  },
  travel: {
    title: 'Adventure Seeker',
    description: 'You love exploring new places and experiences. Connect with travelers for trips, hikes, and expeditions.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  dining: {
    title: 'Culinary Connoisseur',
    description: 'You enjoy discovering flavors and dining experiences. Join food tours, cooking classes, and restaurant meetups.',
    gradient: 'from-green-500 to-emerald-500',
  },
};

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (category: string) => {
    const newAnswers = [...answers, category];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const getResult = () => {
    const counts = answers.reduce((acc, answer) => {
      acc[answer] = (acc[answer] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCategory = Object.entries(counts).sort(([, a], [, b]) => b - a)[0][0];
    return categoryResults[topCategory as keyof typeof categoryResults];
  };

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[rgb(100,39,129)] via-[rgb(163,41,134)] to-[rgb(156,41,134)] bg-clip-text text-transparent mb-4">
            Find Your Perfect Activity
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Take our quick quiz to discover what activities suit you best
          </p>
        </div>

        {!showResult ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              {questions[currentQuestion].question}
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.category)}
                  className="group relative p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 text-left hover:scale-105 hover:shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <option.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
                      {option.text}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
            <div className="inline-flex p-6 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] rounded-full mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-4xl">🎉</span>
              </div>
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              You're a {getResult().title}!
            </h3>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {getResult().description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToWaitlist}
                className="px-8 py-4 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] text-white rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                Join Waitlist Now
              </button>
              <button
                onClick={resetQuiz}
                className="px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
