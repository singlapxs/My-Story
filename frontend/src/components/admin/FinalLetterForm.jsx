import React, { useState, useEffect } from 'react';

const FinalLetterForm = ({ content, updateContent, token, isLoading }) => {
  const [title, setTitle] = useState('');
  const [letterContent, setLetterContent] = useState('');
  const [signature, setSignature] = useState('');

  useEffect(() => {
    if (content?.finalLetter) {
      setTitle(content.finalLetter.title || '');
      setLetterContent(content.finalLetter.content || '');
      setSignature(content.finalLetter.signature || '');
    }
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedContent = {
      ...content,
      finalLetter: { title, content: letterContent, signature }
    };
    const success = await updateContent(updatedContent, token);
    if (success) alert('Final Letter updated!');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl font-body">
      <h2 className="text-2xl font-heading mb-4">Edit Final Love Letter</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Letter Content</label>
        <textarea rows="10" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={letterContent} onChange={(e) => setLetterContent(e.target.value)} />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Signature</label>
        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={signature} onChange={(e) => setSignature(e.target.value)} />
      </div>
      <button type="submit" disabled={isLoading} className="bg-lavender hover:bg-dusty-pink text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default FinalLetterForm;
