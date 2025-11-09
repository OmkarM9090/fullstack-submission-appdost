import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios.js';

const useDeleteComment = () => {
  const [loading, setLoading] = useState(false);

  const deleteComment = async (postId, commentId) => {
    if (!confirm("Are you sure you want to delete this comment?")) {
      return null;
    }
    
    setLoading(true);
    try {
      const res = await axiosInstance.delete(`/api/posts/comment/${postId}/${commentId}`);
      if (res.status !== 200) {
        throw new Error(res.data.error || "Failed to delete comment");
      }
      toast.success("Comment deleted!");
      return res.data; // Return updated post

    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteComment };
};

export default useDeleteComment;