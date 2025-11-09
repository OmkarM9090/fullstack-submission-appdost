import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import useGetPosts from '../hooks/useGetPosts';
import PostCard from '../components/post/PostCard';
import CreatePost from '../components/post/CreatePost';

const PostFeed = () => {
  const { loading, posts, setPosts } = useGetPosts();

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts(posts.map(p => p._id === updatedPost._id ? updatedPost : p));
  };

  const handlePostDelete = (postId) => {
    setPosts(posts.filter(p => p._id !== postId));
  };

  return (
    <div className="md:col-span-2 space-y-6">
      <CreatePost onPostCreated={handlePostCreated} />

      {loading && <p className="text-center text-gray-600 dark:text-gray-300">Loading feed...</p>}
      
      {!loading && posts.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-300">No posts yet. Be the first to post!</p>
      )}

      {!loading && posts.length > 0 && (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard 
              key={post._id} 
              post={post} 
              onPostUpdate={handleUpdatePost} 
              onPostDelete={handlePostDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Sidebar />
        <PostFeed />
        <div className="hidden md:block md:col-span-1">
        </div>
      </div>
    </div>
  );
};

export default HomePage;