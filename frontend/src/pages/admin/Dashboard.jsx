import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import useContentStore from '../../store/useContentStore';
import HeroForm from '../../components/admin/HeroForm';
import HowWeMetForm from '../../components/admin/HowWeMetForm';
import ReasonsForm from '../../components/admin/ReasonsForm';
import MemoriesForm from '../../components/admin/MemoriesForm';
import GalleryForm from '../../components/admin/GalleryForm';
import DreamsForm from '../../components/admin/DreamsForm';
import LettersForm from '../../components/admin/LettersForm';
import StatsForm from '../../components/admin/StatsForm';
import FinalLetterForm from '../../components/admin/FinalLetterForm';

const Dashboard = () => {
  const { user, token, logout } = useAuthStore();
  const { content, fetchContent, updateContent, isLoading } = useContentStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [activeTab, setActiveTab] = useState('Hero');

  if (isLoading && !content) return <div>Loading...</div>;

  const renderContent = () => {
    const props = { content, updateContent, token, isLoading };
    switch (activeTab) {
      case 'Hero': return <HeroForm {...props} />;
      case 'How We Met': return <HowWeMetForm {...props} />;
      case 'Reasons': return <ReasonsForm {...props} />;
      case 'Memories': return <MemoriesForm {...props} />;
      case 'Gallery': return <GalleryForm {...props} />;
      case 'Dreams': return <DreamsForm {...props} />;
      case 'Letters': return <LettersForm {...props} />;
      case 'Stats': return <StatsForm {...props} />;
      case 'Final Letter': return <FinalLetterForm {...props} />;
      default: return <div>Select a section to edit</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-heading font-bold text-lavender">Admin Dashboard</h2>
          <p className="text-sm font-body text-gray-500">{user?.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 font-body text-sm overflow-y-auto">
          {['Hero', 'How We Met', 'Reasons', 'Memories', 'Gallery', 'Dreams', 'Letters', 'Stats', 'Final Letter'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left p-2 rounded transition-colors ${
                activeTab === tab 
                  ? 'bg-lavender/10 text-lavender font-medium' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
          <button onClick={handleLogout} className="w-full text-left p-2 rounded text-red-500 hover:bg-red-50 mt-8 border-t border-gray-100 pt-4">Logout</button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <h1 className="text-3xl font-heading font-bold mb-6">Manage Website Content</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
