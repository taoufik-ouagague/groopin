import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Categories from './components/Categories';
import HowItWorks from './components/HowItWorks';
import Statistics from './components/Statistics';
import Testimonials from './components/Testimonials';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import CountdownTimer from './components/CountdownTimer';
import Quiz from './components/Quiz';
import TrustBadges from './components/TrustBadges';
import Comparison from './components/Comparison';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import FloatingChatButton from './components/FloatingChatButton';
import LiveCounter from './components/LiveCounter';
import RecentSignups from './components/RecentSignups';
import Achievements from './components/Achievements';
import Leaderboard from './components/Leaderboard';
import CityVoting from './components/CityVoting';
import PressMedia from './components/PressMedia';
import ExitIntent from './components/ExitIntent';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showExitIntent, setShowExitIntent] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark' : ''}`}>
      <ScrollProgress />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <LiveCounter />
      <RecentSignups />
      <Hero />
      <Features />
      <Categories />
      <HowItWorks />
      <Statistics />
      <Quiz />
      <Achievements />
      <Testimonials />
      <Leaderboard />
      <Comparison />
      <TrustBadges />
      <CityVoting />
      <PressMedia />
      <CountdownTimer />
      <FAQ />
      <ContactForm />
      <Waitlist />
      <Footer />
      <FloatingChatButton />
      {showExitIntent && <ExitIntent onClose={() => setShowExitIntent(false)} />}
    </div>
  );
}

export default App;
