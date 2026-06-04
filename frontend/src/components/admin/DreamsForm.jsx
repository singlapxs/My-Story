import React, { useState, useEffect } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

const DreamsForm = ({ content, updateContent, token, isLoading }) => {
  const [dreams, setDreams] = useState([]);

  useEffect(() => {
    if (content?.dreams) {
      setDreams(content.dreams);
    }
  }, [content]);

  const handleAdd = () => {
    setDreams([...dreams, { title: '', description: '', icon: '✨' }]);
  };

  const handleRemove = (index) => {
    const newDreams = dreams.filter((_, i) => i !== index);
    setDreams(newDreams);
  };

  const handleChange = (index, field, value) => {
    const newDreams = [...dreams];
    newDreams[index][field] = value;
    setDreams(newDreams);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedContent = { ...content, dreams };
    const success = await updateContent(updatedContent, token);
    if (success) alert('Dreams updated!');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md font-body">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading">Edit Future Dreams</h2>
        <button type="button" onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white p-2 rounded flex items-center gap-2">
          <FaPlus /> Add Dream
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {dreams.map((dream, index) => (
          <div key={index} className="flex gap-4 items-start border p-4 rounded-lg bg-slate-50">
            <div className="flex-1 space-y-3">
              <input type="text" placeholder="Icon (e.g. 🏠)" className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={dream.icon} onChange={(e) => handleChange(index, 'icon', e.target.value)} />
              <input type="text" placeholder="Title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={dream.title} onChange={(e) => handleChange(index, 'title', e.target.value)} />
              <textarea placeholder="Description" rows="2" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={dream.description} onChange={(e) => handleChange(index, 'description', e.target.value)} />
            </div>
            <button type="button" onClick={() => handleRemove(index)} className="text-red-500 hover:text-red-700 p-2">
              <FaTrash />
            </button>
          </div>
        ))}
        {dreams.length === 0 && <p className="text-gray-500">No dreams added yet.</p>}
      </div>

      <button type="submit" disabled={isLoading} className="bg-lavender hover:bg-dusty-pink text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default DreamsForm;
