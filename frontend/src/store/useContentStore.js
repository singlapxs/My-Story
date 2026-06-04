import { create } from 'zustand';

const API_URL = 'http://localhost:5000/api';

const useContentStore = create((set) => ({
  content: null,
  isLoading: false,
  error: null,
  
  fetchContent: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/content`);
      if (!response.ok) throw new Error('Failed to fetch content');
      const data = await response.json();
      set({ content: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateContent: async (updatedData, token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });
      if (!response.ok) throw new Error('Failed to update content');
      const data = await response.json();
      set({ content: data, isLoading: false });
      return true;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return false;
    }
  }
}));

export default useContentStore;
