import React, { useState, useEffect } from 'react';

const StatsForm = ({ content, updateContent, token, isLoading }) => {
  const [startDate, setStartDate] = useState('');
  const [photosShared, setPhotosShared] = useState(0);

  useEffect(() => {
    if (content?.stats) {
      setStartDate(content.stats.startDate ? new Date(content.stats.startDate).toISOString().split('T')[0] : '');
      setPhotosShared(content.stats.photosShared || 0);
    }
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedContent = {
      ...content,
      stats: { startDate, photosShared }
    };
    const success = await updateContent(updatedContent, token);
    if (success) alert('Stats updated!');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl font-body">
      <h2 className="text-2xl font-heading mb-4">Edit Relationship Stats</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Relationship Start Date (for Days Together counter)</label>
        <input type="date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Photos Shared Count</label>
        <input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={photosShared} onChange={(e) => setPhotosShared(parseInt(e.target.value))} />
      </div>
      <button type="submit" disabled={isLoading} className="bg-lavender hover:bg-dusty-pink text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default StatsForm;
