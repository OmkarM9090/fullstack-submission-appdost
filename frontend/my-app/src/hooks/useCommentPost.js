import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios';

const useCommentPost = () => {
  const [loading, setLoading] = useState(false);

  const commentPost = async (postId, text) => {
    if (!text) return toast.error("Comment cannot be empty");

    setLoading(true);
    try {
      const res = await axiosInstance.post(`/api/posts/comment/${postId}`, { text });
      if (res.status !== 200) {
        throw new Error(res.data.error || "Failed to comment");
      }
      toast.success("Comment added!");
      return res.data; // Return the updated post
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, commentPost };
};

export default useCommentPost;