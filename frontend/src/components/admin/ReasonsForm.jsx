import React, { useState, useEffect } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

const ReasonsForm = ({ content, updateContent, token, isLoading }) => {
  const [reasons, setReasons] = useState([]);

  useEffect(() => {
    if (content?.loveReasons) {
      setReasons(content.loveReasons);
    }
  }, [content]);

  const handleAdd = () => {
    setReasons([...reasons, { title: '', description: '', emoji: '❤️' }]);
  };

  const handleRemove = (index) => {
    const newReasons = reasons.filter((_, i) => i !== index);
    setReasons(newReasons);
  };

  const handleChange = (index, field, value) => {
    const newReasons = [...reasons];
    newReasons[index][field] = value;
    setReasons(newReasons);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedContent = { ...content, loveReasons: reasons };
    const success = await updateContent(updatedContent, token);
    if (success) alert('Reasons updated!');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md font-body">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading">Edit Love Reasons</h2>
        <button type="button" onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white p-2 rounded flex items-center gap-2">
          <FaPlus /> Add Reason
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {reasons.map((reason, index) => (
          <div key={index} className="flex gap-4 items-start border p-4 rounded-lg bg-slate-50">
            <div className="flex-1 space-y-3">
              <input type="text" placeholder="Emoji (e.g. ❤️)" className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={reason.emoji} onChange={(e) => handleChange(index, 'emoji', e.target.value)} />
              <input type="text" placeholder="Title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={reason.title} onChange={(e) => handleChange(index, 'title', e.target.value)} />
              <textarea placeholder="Description" rows="2" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={reason.description} onChange={(e) => handleChange(index, 'description', e.target.value)} />
            </div>
            <button type="button" onClick={() => handleRemove(index)} className="text-red-500 hover:text-red-700 p-2">
              <FaTrash />
            </button>
          </div>
        ))}
        {reasons.length === 0 && <p className="text-gray-500">No reasons added yet.</p>}
      </div>

      <button type="submit" disabled={isLoading} className="bg-lavender hover:bg-dusty-pink text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default ReasonsForm;
