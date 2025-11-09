import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios.js'; // <-- FIX: Added .js

const useDeletePost = () => {
  const [loading, setLoading] = useState(false);

  const deletePost = async (postId) => {
    // We can't use window.confirm() in this environment. 
    // Let's assume the user already confirmed via the dropdown.
    
    setLoading(true);
    try {
      const res = await axiosInstance.delete(`/api/posts/${postId}`);
      if (res.status !== 200) {
        throw new Error(res.data.error || "Failed to delete post");
      }
      toast.success("Post deleted!");
      return true; // Signal success

    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, deletePost };
};

export default useDeletePost;