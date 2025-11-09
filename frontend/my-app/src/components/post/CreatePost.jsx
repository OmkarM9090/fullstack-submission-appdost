import { useState, useRef } from 'react';
import { PhotoIcon, XCircleIcon } from '@heroicons/react/24/solid';
import useAuthStore from '../../store/auth.store';
import useCreatePost from '../../hooks/useCreatePost';
import Button from '../common/Button';

const CreatePost = ({ onPostCreated }) => {
  const { authUser } = useAuthStore();
  const [text, setText] = useState('');
  const [image, setImage] = useState(null); // Will store base64 string
  const [imagePreview, setImagePreview] = useState(null); // For showing the user
  const { loading, createPost } = useCreatePost();
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Create a local URL for preview
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // This is the base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Reset file input
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = await createPost({ text, image });
    if (newPost) {
      setText('');
      removeImage();
      onPostCreated(newPost); // Pass the new post up to the feed
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex space-x-3">
        {authUser.profilePic ? (
          <img src={authUser.profilePic} alt="Profile" className="w-12 h-12 rounded-full" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>
        )}
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
          rows="3"
          placeholder={`What's on your mind, ${authUser.fullName.split(' ')[0]}?`}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      
      {imagePreview && (
        <div className="mt-4 relative">
          <img src={imagePreview} alt="Preview" className="w-full rounded-lg" />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-50 rounded-full"
          >
            <XCircleIcon className="w-6 h-6 text-white" />
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <label className="cursor-pointer flex items-center space-x-1 text-gray-500 hover:text-linkedin-blue">
          <PhotoIcon className="w-6 h-6" />
          <span className="text-sm font-medium">Photo</span>
          <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
        </label>

        <div className="w-24">
            <Button
              onClick={handleSubmit}
              isLoading={loading}
              disabled={loading || !text}
            >
              Post
            </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;