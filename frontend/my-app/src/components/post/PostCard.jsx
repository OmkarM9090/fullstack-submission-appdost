import { useState } from 'react';
import { UserCircleIcon, HandThumbUpIcon, ChatBubbleOvalLeftIcon, EllipsisHorizontalIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { HandThumbUpIcon as HandThumbUpOutline } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

// --- FIX: Added .js and .jsx extensions to all imports ---
import { formatDate } from '../../lib/formatDate.js';
import useAuthStore from '../../store/auth.store.js';
import useLikePost from '../../hooks/useLikePost.js';
import useCommentPost from '../../hooks/useCommentPost.js';
import useDeletePost from '../../hooks/useDeletePost.js';
import useUpdatePost from '../../hooks/useUpdatePost.js';
import Spinner from '../common/Spinner.jsx';
import Button from '../common/Button.jsx';
import LikeButton from './LikeButton.jsx';
import Comment from './Comment.jsx';
// --- NEW: Import Comment Suggestions ---
import CommentSuggestion from './CommentSuggestion.jsx';
// ---------------------------------------------------------

// PostOptions Dropdown (same as before)
const PostOptions = ({ post, onPostDelete, onEditClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, deletePost } = useDeletePost();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      const success = await deletePost(post._id);
      if (success) {
        onPostDelete(post._id);
      }
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
        <EllipsisHorizontalIcon className="w-6 h-6" />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 border dark:border-gray-700"
          onMouseLeave={() => setIsOpen(false)}
        >
          <button
            onClick={() => { onEditClick(); setIsOpen(false); }}
            className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <PencilIcon className="w-4 h-4" />
            <span>Edit Post</span>
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <TrashIcon className="w-4 h-4" />
            <span>Delete Post</span>
          </button>
        </div>
      )}
    </div>
  );
};


const PostCard = ({ post, onPostUpdate, onPostDelete }) => {
  const { authUser } = useAuthStore();
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.text);
  
  const { loading: commenting, commentPost } = useCommentPost();
  const { loading: updating, updatePost } = useUpdatePost();

  const isAuthor = authUser._id === post.author._id;

  const handleCommentSubmit = async (e_or_text) => {
    let textToSubmit = '';
    // This allows it to handle both form submits and suggestion clicks
    if (typeof e_or_text === 'string') {
      textToSubmit = e_or_text;
    } else {
      e_or_text.preventDefault();
      textToSubmit = commentText;
    }

    if (!textToSubmit) return;

    const updatedPost = await commentPost(post._id, textToSubmit);
    if (updatedPost) {
      onPostUpdate(updatedPost);
      setCommentText('');
      setShowComments(true);
    }
  };

  const handleUpdateSubmit = async () => {
    const updatedPost = await updatePost(post._id, editText);
    if (updatedPost) {
      onPostUpdate(updatedPost);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        {/* Post Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            {post.author.profilePic ? (
              <img src={post.author.profilePic} alt={post.author.fullName} className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <UserCircleIcon className="w-12 h-12 text-gray-400" />
            )}
            <div>
              <Link to={`/profile/${post.author._id}`} className="font-semibold hover:underline">
                {post.author.fullName}
              </Link>
              <p className="text-xs text-gray-500 dark:text-gray-400">{post.author.headline || "Web Developer"}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(post.createdAt)}</p>
            </div>
          </div>
          {isAuthor && <PostOptions post={post} onPostDelete={onPostDelete} onEditClick={() => setIsEditing(true)} />}
        </div>

        {/* Post Body */}
        {isEditing ? (
          <div className="mt-4 space-y-2">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600"
              rows="4"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button 
                type="button" 
                onClick={() => setIsEditing(false)} 
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300"
              >
                Cancel
              </button>
              <Button onClick={handleUpdateSubmit} isLoading={updating}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <p className="mt-4 whitespace-pre-wrap">{post.text}</p>
        )}
      </div>

      {/* Post Image */}
      {!isEditing && post.image && (
        <img src={post.image} alt="Post content" className="w-full" />
      )}

      {/* Post Stats (Likes & Comments) */}
      <div className="p-4">
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{post.likes.length} {post.likes.length === 1 ? "like" : "likes"}</span>
          <span>{post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex border-t border-gray-200 dark:border-gray-700 mx-2">
        <LikeButton post={post} onPostUpdate={onPostUpdate} />
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex justify-center items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChatBubbleOvalLeftIcon className="w-6 h-6" />
          <span className="font-medium">Comment</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          
          {/* --- NEW: Comment Suggestions --- */}
          <CommentSuggestion onSuggestionClick={handleCommentSubmit} />

          {/* New Comment Form */}
          <form onSubmit={handleCommentSubmit} className="flex space-x-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-linkedin-blue text-white px-4 py-1.5 rounded-full font-semibold disabled:opacity-50"
              disabled={commenting || !commentText}
            >
              {commenting ? <Spinner /> : 'Post'}
            </button>
          </form>

          {/* Existing Comments List */}
          <div className="mt-4 space-y-3">
            {post.comments.map((comment) => (
              <Comment 
                key={comment._id} 
                comment={comment}
                postId={post._id}
                onCommentUpdate={onPostUpdate} // Pass the main update function down
              />
            ))}
            {post.comments.length === 0 && (
                <p className="text-sm text-gray-500 text-center pt-2">No comments yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;