import React, { useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaUpload } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const GalleryForm = ({ content, updateContent, token, isLoading }) => {
  const [gallery, setGallery] = useState([]);
  const [uploadingIdx, setUploadingIdx] = useState(null);

  useEffect(() => {
    if (content?.gallery) {
      setGallery(content.gallery);
    }
  }, [content]);

  const handleAdd = () => {
    setGallery([...gallery, { url: '', caption: '' }]);
  };

  const handleRemove = (index) => {
    const newGallery = gallery.filter((_, i) => i !== index);
    setGallery(newGallery);
  };

  const handleChange = (index, field, value) => {
    const newGallery = [...gallery];
    newGallery[index][field] = value;
    setGallery(newGallery);
  };

  const handleImageUpload = async (index, file) => {
    if (!file) return;
    setUploadingIdx(index);
    const formData = new FormData();
    formData.append('media', file);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        handleChange(index, 'url', data.url);
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
    const updatedContent = { ...content, gallery };
    const success = await updateContent(updatedContent, token);
    if (success) alert('Gallery updated!');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md font-body">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading">Edit Photo Gallery</h2>
        <button type="button" onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white p-2 rounded flex items-center gap-2">
          <FaPlus /> Add Photo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {gallery.map((photo, index) => (
          <div key={index} className="flex flex-col gap-2 border p-4 rounded-lg bg-slate-50 relative">
            <button type="button" onClick={() => handleRemove(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 bg-white rounded-full shadow">
              <FaTrash />
            </button>
            {photo.url ? (
              <img src={photo.url} alt="Gallery item" className="w-full h-32 object-cover rounded mb-2" />
            ) : (
              <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center text-gray-500 mb-2">No Image</div>
            )}
            
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Image URL" className="shadow appearance-none border rounded flex-1 py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none"
                value={photo.url} onChange={(e) => handleChange(index, 'url', e.target.value)} />
              <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 p-1 px-2 rounded text-xs flex items-center gap-1">
                <FaUpload /> {uploadingIdx === index ? '...' : 'Upload'}
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(index, e.target.files[0])} />
              </label>
            </div>
            <input type="text" placeholder="Caption (optional)" className="shadow appearance-none border rounded w-full py-1 px-2 text-sm text-gray-700 leading-tight focus:outline-none"
              value={photo.caption} onChange={(e) => handleChange(index, 'caption', e.target.value)} />
          </div>
        ))}
        {gallery.length === 0 && <p className="text-gray-500 col-span-full">No photos added yet.</p>}
      </div>

      <button type="submit" disabled={isLoading} className="bg-lavender hover:bg-dusty-pink text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default GalleryForm;
