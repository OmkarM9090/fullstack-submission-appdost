import React from 'react';
import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import { HandThumbUpIcon as HandThumbUpOutline } from '@heroicons/react/24/outline';
import useLikePost from '../../hooks/useLikePost';
import useAuthStore from '../../store/auth.store';

const LikeButton = ({ post, onPostUpdate }) => {
  const { authUser } = useAuthStore();
  const { loading: liking, likePost } = useLikePost();

  const isLiked = post.likes.includes(authUser._id);

  const handleLike = async () => {
    const updatedPost = await likePost(post._id);
    if (updatedPost) {
      onPostUpdate(updatedPost); // Update the post in the parent state
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={liking}
      className={`flex-1 flex justify-center items-center space-x-2 p-2 rounded-bl-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${isLiked ? 'text-linkedin-blue' : ''}`}
    >
      {isLiked ? (
        <HandThumbUpIcon className="w-6 h-6" />
      ) : (
        <HandThumbUpOutline className="w-6 h-6" />
      )}
      <span className="font-medium">Like</span>
    </button>
  );
};

export default LikeButton;