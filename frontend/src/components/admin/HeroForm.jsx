import React, { useState, useEffect } from 'react';

const HeroForm = ({ content, updateContent, token, isLoading }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [scrollText, setScrollText] = useState('');

  useEffect(() => {
    if (content?.hero) {
      setTitle(content.hero.title || '');
      setSubtitle(content.hero.subtitle || '');
      setScrollText(content.hero.scrollText || '');
    }
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedContent = {
      ...content,
      hero: { title, subtitle, scrollText }
    };
    const success = await updateContent(updatedContent, token);
    if (success) alert('Hero section updated!');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl font-body">
      <h2 className="text-2xl font-heading mb-4">Edit Hero Section</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Subtitle</label>
        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Scroll Text</label>
        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={scrollText} onChange={(e) => setScrollText(e.target.value)} />
      </div>
      <button type="submit" disabled={isLoading} className="bg-lavender hover:bg-dusty-pink text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default HeroForm;
