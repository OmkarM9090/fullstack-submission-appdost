import { useState } from 'react';
import { UserCircleIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

// --- FIX: Add .js extensions ---
import useAuthStore from '../../store/auth.store.js';
import useDeleteComment from '../../hooks/useDeleteComment.js';
import useUpdateComment from '../../hooks/useUpdateComment.js';

const Comment = ({ comment, postId, onCommentUpdate }) => {
  // --- FIX: Add default empty object for comment.user ---
  // This prevents crashes if a comment's user is deleted or bugged
  const { user = { profilePic: null, fullName: "User", headline: "..." } } = comment;

  const { authUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const { loading: deleting, deleteComment } = useDeleteComment();
  const { loading: updating, updateComment } = useUpdateComment();
  
  const isAuthor = authUser._id === user._id;

  const handleUpdate = async () => {
    const updatedPost = await updateComment(postId, comment._id, editText);
    if (updatedPost) {
      onCommentUpdate(updatedPost); // Update the whole post in the feed
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    const updatedPost = await deleteComment(postId, comment._id);
    if (updatedPost) {
      onCommentUpdate(updatedPost); // Update the whole post
    }
  };

  return (
    <div className="flex space-x-2">
      {user.profilePic ? (
        <img src={user.profilePic} alt={user.fullName} className="w-8 h-8 rounded-full object-cover" />
      ) : (
        <UserCircleIcon className="w-8 h-8 text-gray-400" />
      )}
      <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <span className="font-semibold text-sm">{user.fullName}</span>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.headline || "User"}</p>
          </div>
          {/* Show edit/delete buttons only to the author */}
          {isAuthor && !isEditing && (
            <div className="flex space-x-2">
              <button onClick={() => setIsEditing(true)} disabled={updating}>
                <PencilIcon className="w-4 h-4 text-gray-500 hover:text-black dark:hover:text-white" />
              </button>
              <button onClick={handleDelete} disabled={deleting}>
                <TrashIcon className="w-4 h-4 text-gray-500 hover:text-red-500" />
              </button>
            </div>
          )}
        </div>
        
        {isEditing ? (
          <div className="mt-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full text-sm p-1 border rounded dark:bg-gray-600 dark:border-gray-500"
            />
            <div className="flex space-x-2 mt-1">
              <button onClick={handleUpdate} disabled={updating} className="text-xs text-green-600 font-semibold">
                {updating ? 'Saving...' : 'Save'}
              </button>
              <button onClick={() => setIsEditing(false)} className="text-xs text-gray-500">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap mt-1">{comment.text}</p>
        )}
      </div>
    </div>
  );
};

export default Comment;