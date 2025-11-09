import { useState } from 'react';
import { UserCircleIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import useAuthStore from '../../store/auth.store.js';
import useDeleteComment from '../../hooks/useDeleteComment.js';
import useUpdateComment from '../../hooks/useUpdateComment.js';

const Comment = ({ comment, postId, onCommentUpdate }) => {
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
      onCommentUpdate(updatedPost);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    const updatedPost = await deleteComment(postId, comment._id);
    if (updatedPost) {
      onCommentUpdate(updatedPost);
    }
  };

  return (
    <div className="flex space-x-2">
      {user.profilePic ? (
        <img src={user.profilePic} alt={user.fullName} className="w-8 h-8 rounded-full object-cover border-2 border-gradient-to-r from-blue-500 to-blue-600" />
      ) : (
        <UserCircleIcon className="w-8 h-8 text-gray-400" />
      )}
      <div className="flex-1 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md p-3 rounded-2xl shadow-md shadow-gray-300/50 dark:shadow-blue-900/30">
        <div className="flex justify-between items-center">
          <div>
            <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">{user.fullName}</span>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.headline || "User"}</p>
          </div>
          {isAuthor && !isEditing && (
            <div className="flex space-x-2">
              <button onClick={() => setIsEditing(true)} disabled={updating} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <PencilIcon className="w-4 h-4 text-gray-500 hover:text-black dark:hover:text-white" />
              </button>
              <button onClick={handleDelete} disabled={deleting} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
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
              className="w-full text-sm p-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-2 mt-2">
              <button onClick={handleUpdate} disabled={updating} className="text-xs text-blue-600 font-semibold">
                {updating ? 'Saving...' : 'Save'}
              </button>
              <button onClick={() => setIsEditing(false)} className="text-xs text-gray-500">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap mt-1 text-gray-800 dark:text-gray-300">{comment.text}</p>
        )}
      </div>
    </div>
  );
};

export default Comment;