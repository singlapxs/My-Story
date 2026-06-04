import React, { useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaUpload } from 'react-icons/fa';

const MemoriesForm = ({ content, updateContent, token, isLoading }) => {
  const [memories, setMemories] = useState([]);
  const [uploadingIdx, setUploadingIdx] = useState(null);

  useEffect(() => {
    if (content?.memories) {
      setMemories(content.memories);
    }
  }, [content]);

  const handleAdd = () => {
    setMemories([...memories, { title: '', date: '', description: '', image: '' }]);
  };

  const handleRemove = (index) => {
    const newMemories = memories.filter((_, i) => i !== index);
    setMemories(newMemories);
  };

  const handleChange = (index, field, value) => {
    const newMemories = [...memories];
    newMemories[index][field] = value;
    setMemories(newMemories);
  };

  const handleImageUpload = async (index, file) => {
    if (!file) return;
    setUploadingIdx(index);
    const formData = new FormData();
    formData.append('media', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        handleChange(index, 'image', data.url);
      } else {
        alert(data.message || 'Upload failed');
      }
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploadingIdx(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedContent = { ...content, memories };
    const success = await updateContent(updatedContent, token);
    if (success) alert('Memories updated!');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md font-body">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading">Edit Memories</h2>
        <button type="button" onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white p-2 rounded flex items-center gap-2">
          <FaPlus /> Add Memory
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {memories.map((memory, index) => (
          <div key={index} className="flex gap-4 items-start border p-4 rounded-lg bg-slate-50">
            <div className="flex-1 space-y-3">
              <input type="text" placeholder="Title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={memory.title} onChange={(e) => handleChange(index, 'title', e.target.value)} />
              <input type="date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={memory.date ? new Date(memory.date).toISOString().split('T')[0] : ''} onChange={(e) => handleChange(index, 'date', e.target.value)} />
              <textarea placeholder="Description" rows="2" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={memory.description} onChange={(e) => handleChange(index, 'description', e.target.value)} />
              
              <div className="flex items-center gap-4">
                <input type="text" placeholder="Image URL (or upload)" className="shadow appearance-none border rounded flex-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={memory.image} onChange={(e) => handleChange(index, 'image', e.target.value)} />
                <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 p-2 rounded flex items-center gap-2 text-sm">
                  <FaUpload /> {uploadingIdx === index ? 'Uploading...' : 'Upload'}
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(index, e.target.files[0])} />
                </label>
              </div>
              {memory.image && <img src={memory.image} alt="Preview" className="h-20 object-cover rounded" />}
            </div>
            <button type="button" onClick={() => handleRemove(index)} className="text-red-500 hover:text-red-700 p-2">
              <FaTrash />
            </button>
          </div>
        ))}
        {memories.length === 0 && <p className="text-gray-500">No memories added yet.</p>}
      </div>

      <button type="submit" disabled={isLoading} className="bg-lavender hover:bg-dusty-pink text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default MemoriesForm;
