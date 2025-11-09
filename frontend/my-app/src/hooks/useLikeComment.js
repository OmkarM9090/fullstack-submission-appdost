import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios.js';

const useLikeComment = () => {
  const [loading, setLoading] = useState(false);

  const likeComment = async (postId, commentId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/api/posts/comment/like/${postId}/${commentId}`);
      if (res.status !== 200) {
        throw new Error(res.data.error || "Failed to like comment");
      }
      return res.data; // Return updated post
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, likeComment };
};

export default useLikeComment;