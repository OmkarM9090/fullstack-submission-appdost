import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios.js'; // <-- FIX: Added .js

const useUpdatePost = () => {
  const [loading, setLoading] = useState(false);

  const updatePost = async (postId, text) => {
    if (!text) {
      return toast.error("Text cannot be empty");
    }

    setLoading(true);
    try {
      const res = await axiosInstance.put(`/api/posts/${postId}`, { text });
      if (res.status !== 200) {
        throw new Error(res.data.error || "Failed to update post");
      }
      toast.success("Post updated!");
      return res.data; // Return the updated post

    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, updatePost };
};

export default useUpdatePost;