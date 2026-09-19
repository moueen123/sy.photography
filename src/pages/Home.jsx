import HeroSequence from '../components/HeroSequence/HeroSequence';
import AboutFooterSection from '../components/AboutFooterSection/AboutFooterSection';
import Navbar from '../components/nav/NavbarBar';

const Home = () => {
  return (
    <main className="bg-near-black overflow-hidden">
      <Navbar />
      <HeroSequence />
      <AboutFooterSection />
    </main>
  );
};

export default Home;
