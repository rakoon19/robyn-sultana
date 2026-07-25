import React from 'react';
import Hero from '../components/Hero';
import FeaturedWork from '../components/FeaturedWork';
import CardsGathered from '../components/CardsGathered';
import About from '../components/About';
import WhyCommission from '../components/WhyCommission';
import HireMe from '../components/HireMe';
import PromoBanner from '../components/PromoBanner';

const Home = () => {
  return (
    <main className="bg-bg-primary">
      {/* Hero Section */}
      <Hero />

      {/* Sections with padding between them */}
      <div className="px-8 py-12 max-w-7xl mx-auto space-y-12">
        {/* Featured Work */}
        <FeaturedWork />

        {/* Cards Gathered */}
        <CardsGathered />

        {/* About */}
        <About />

        {/* Why Commission */}
        <WhyCommission />
      </div>

      {/* Hire Me / Commission Info */}
      <div className="px-8 py-12 max-w-7xl mx-auto">
        <HireMe />
      </div>

      {/* Promo Banner */}
      <PromoBanner />
    </main>
  );
};

export default Home;
