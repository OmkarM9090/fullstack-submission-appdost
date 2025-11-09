import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios';

const useGetPosts = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/api/posts/all');
      if (res.status !== 200) {
        throw new Error(res.data.error || "Failed to fetch posts");
      }
      setPosts(res.data);
    } catch (error) {
      toast.error(error.message);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return { loading, posts, setPosts, refetch: getPosts };
};

export default useGetPosts;