import React, { useState, useEffect } from 'react';

const HowWeMetForm = ({ content, updateContent, token, isLoading }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [storyContent, setStoryContent] = useState('');

  useEffect(() => {
    if (content?.howWeMet) {
      setTitle(content.howWeMet.title || '');
      setSubtitle(content.howWeMet.subtitle || '');
      setStoryContent(content.howWeMet.content || '');
    }
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedContent = {
      ...content,
      howWeMet: { title, subtitle, content: storyContent }
    };
    const success = await updateContent(updatedContent, token);
    if (success) alert('How We Met section updated!');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl font-body">
      <h2 className="text-2xl font-heading mb-4">Edit How We Met</h2>
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
        <label className="block text-gray-700 text-sm font-bold mb-2">Story Content</label>
        <textarea rows="6" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={storyContent} onChange={(e) => setStoryContent(e.target.value)} />
      </div>
      <button type="submit" disabled={isLoading} className="bg-lavender hover:bg-dusty-pink text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default HowWeMetForm;
