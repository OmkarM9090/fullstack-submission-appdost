import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios.js';

const useUpdateComment = () => {
  const [loading, setLoading] = useState(false);

  const updateComment = async (postId, commentId, text) => {
    if (!text) {
      return toast.error("Comment cannot be empty");
    }

    setLoading(true);
    try {
      const res = await axiosInstance.put(`/api/posts/comment/${postId}/${commentId}`, { text });
      if (res.status !== 200) {
        throw new Error(res.data.error || "Failed to update comment");
      }
      toast.success("Comment updated!");
      return res.data; // Return updated post

    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateComment };
};

export default useUpdateComment;