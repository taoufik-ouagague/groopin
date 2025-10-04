import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What is Groopin?',
    answer: 'Groopin is a social platform that connects people with shared interests across sports, culture, travel, and dining. We make it easy to create or join activities, meet like-minded individuals, and turn your passions into unforgettable experiences.',
  },
  {
    question: 'How much does Groopin cost?',
    answer: 'Groopin will offer both free and premium plans. Free members can join activities and connect with others. Premium members get priority access to exclusive events, advanced matching features, and ad-free experience. Pricing details will be announced at launch.',
  },
  {
    question: 'Is Groopin available in my city?',
    answer: 'We are launching in major cities first and will expand rapidly based on demand. Join our waitlist to be notified when Groopin becomes available in your area. Early adopters in new cities will receive special founding member benefits.',
  },
  {
    question: 'How does Groopin ensure safety?',
    answer: 'Safety is our top priority. All users are verified through email and optional phone verification. We have community guidelines, reporting features, and a moderation team. Users can rate and review their experiences, and we provide safety tips for meeting new people.',
  },
  {
    question: 'Can I create my own activities?',
    answer: 'Absolutely! Creating activities is simple and takes just minutes. Describe your activity, set the date, location, and group size, then publish. You can manage RSVPs, communicate with participants, and even set activity requirements.',
  },
  {
    question: 'What if I want to cancel my participation?',
    answer: 'You can cancel your participation anytime before the activity starts. We encourage giving advance notice to organizers and other participants. Our cancellation policy protects both organizers and participants.',
  },
  {
    question: 'How do I find activities that match my interests?',
    answer: 'Our smart matching algorithm learns your preferences and suggests relevant activities. You can also browse by category, location, date, skill level, and more. Save your favorite activities and get notified about similar events.',
  },
  {
    question: 'When will Groopin launch?',
    answer: 'We are working hard to bring Groopin to you! Join our waitlist to receive exclusive launch updates and early access. Waitlist members will be the first to experience the platform and receive special perks.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[rgb(100,39,129)] via-[rgb(163,41,134)] to-[rgb(156,41,134)] bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to know about Groopin
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <Plus className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 bg-gradient-to-r from-[rgb(100,39,129)] to-[rgb(163,41,134)] rounded-2xl">
          <h3 className="text-2xl font-bold text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-white/90 mb-6">
            We're here to help! Reach out to our team anytime.
          </p>
          <button className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:scale-105 transition-all duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
