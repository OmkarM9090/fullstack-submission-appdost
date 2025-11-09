import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios';

const useCreatePost = () => {
  const [loading, setLoading] = useState(false);

  const createPost = async ({ text, image }) => {
    if (!text) {
      return toast.error("Post cannot be empty");
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post('/api/posts/create', { text, image });
      
      if (res.status !== 201) {
        throw new Error(res.data.error || "Failed to create post");
      }
      
      toast.success("Post created!");
      return res.data; // Return the new post

    } catch (error) {
      toast.error(error.response?.data?.error || error.message || "Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return { loading, createPost };
};

export default useCreatePost;