import React, { useEffect } from 'react';
import useContentStore from '../store/useContentStore';
import Hero from '../components/Hero';
import HowWeMet from '../components/HowWeMet';
import LoveReasons from '../components/LoveReasons';
import MemoriesTimeline from '../components/MemoriesTimeline';
import PhotoGallery from '../components/PhotoGallery';
import Dreams from '../components/Dreams';
import OpenWhenLetters from '../components/OpenWhenLetters';
import RelationshipStats from '../components/RelationshipStats';
import FinalLetter from '../components/FinalLetter';

const Home = () => {
  const { content, fetchContent, isLoading } = useContentStore();

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  if (isLoading || !content) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-lavender font-heading text-2xl animate-pulse">Loading our story...</div>;
  }

  return (
    <main className="overflow-x-hidden bg-slate-50">
      <Hero hero={content.hero} />
      <HowWeMet data={content.howWeMet} />
      <LoveReasons data={content.loveReasons} />
      <MemoriesTimeline data={content.memories} />
      <PhotoGallery data={content.gallery} />
      <Dreams data={content.dreams} />
      <OpenWhenLetters data={content.letters} />
      <RelationshipStats data={content.stats} />
      <FinalLetter data={content.finalLetter} />
    </main>
  );
};

export default Home;
