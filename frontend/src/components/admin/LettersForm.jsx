import React, { useState, useEffect } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';

const LettersForm = ({ content, updateContent, token, isLoading }) => {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    if (content?.letters) {
      setLetters(content.letters);
    }
  }, [content]);

  const handleAdd = () => {
    setLetters([...letters, { title: 'Open when...', content: '' }]);
  };

  const handleRemove = (index) => {
    const newLetters = letters.filter((_, i) => i !== index);
    setLetters(newLetters);
  };

  const handleChange = (index, field, value) => {
    const newLetters = [...letters];
    newLetters[index][field] = value;
    setLetters(newLetters);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedContent = { ...content, letters };
    const success = await updateContent(updatedContent, token);
    if (success) alert('Letters updated!');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md font-body">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading">Edit Open When Letters</h2>
        <button type="button" onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white p-2 rounded flex items-center gap-2">
          <FaPlus /> Add Letter
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {letters.map((letter, index) => (
          <div key={index} className="flex gap-4 items-start border p-4 rounded-lg bg-slate-50">
            <div className="flex-1 space-y-3">
              <input type="text" placeholder="Title (e.g. Open when you miss me)" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={letter.title} onChange={(e) => handleChange(index, 'title', e.target.value)} />
              <textarea placeholder="Letter Content" rows="5" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={letter.content} onChange={(e) => handleChange(index, 'content', e.target.value)} />
            </div>
            <button type="button" onClick={() => handleRemove(index)} className="text-red-500 hover:text-red-700 p-2">
              <FaTrash />
            </button>
          </div>
        ))}
        {letters.length === 0 && <p className="text-gray-500">No letters added yet.</p>}
      </div>

      <button type="submit" disabled={isLoading} className="bg-lavender hover:bg-dusty-pink text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default LettersForm;
