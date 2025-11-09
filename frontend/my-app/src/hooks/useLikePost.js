import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios';

const useLikePost = () => {
  const [loading, setLoading] = useState(false);

  const likePost = async (postId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/api/posts/like/${postId}`);
      if (res.status !== 200) {
        throw new Error(res.data.error || "Failed to like post");
      }
      return res.data; // Return the updated post
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, likePost };
};

export default useLikePost;