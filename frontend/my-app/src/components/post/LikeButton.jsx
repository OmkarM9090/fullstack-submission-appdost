import React from 'react';
import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import { HandThumbUpIcon as HandThumbUpOutline } from '@heroicons/react/24/outline';
import useLikePost from '../../hooks/useLikePost';
import useAuthStore from '../../store/auth.store';
import { motion } from 'framer-motion';

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

  const floatingVariants = {
    initial: { y: 0, opacity: 0 },
    animate: {
      y: -50,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
    exit: { y: -100, opacity: 0 },
  };

  return (
    <div className="relative">
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
      <motion.div
        className="absolute text-red-500"
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        ❤️
      </motion.div>
    </div>
  );
};

export default LikeButton;