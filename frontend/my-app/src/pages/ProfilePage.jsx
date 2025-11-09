import { useState, useRef, useEffect } from 'react';
import { UserCircleIcon, PencilIcon, ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../lib/axios';

import useAuthStore from '../store/auth.store.js';
import useUpdateProfile from '../hooks/useUpdateProfile.js';
import Button from '../components/common/Button.jsx';

const ProfilePage = () => {
  const { authUser, setAuthUser } = useAuthStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: authUser.fullName,
    headline: authUser.headline || "Web Developer",
    description: authUser.description || "",
    profilePic: null,
  });
  const [imagePreview, setImagePreview] = useState(authUser.profilePic);
  const fileInputRef = useRef(null);
  const { loading, updateProfile } = useUpdateProfile();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`);
        setUserProfile(response.data);
        setImagePreview(response.data.profilePic || UserCircleIcon); // Ensure profilePic is set or fallback to default icon
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setImagePreview(null);
    setFormData({ ...formData, profilePic: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const changedData = {
      fullName: formData.fullName,
      headline: formData.headline,
      description: formData.description,
    };

    if (formData.profilePic !== null) {
      changedData.profilePic = formData.profilePic;
    }

    const success = await updateProfile(changedData);
    if (success) {
      setIsEditing(false);
      setAuthUser({ ...authUser, ...changedData, profilePic: imagePreview });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      fullName: authUser.fullName,
      headline: authUser.headline || "Web Developer",
      description: authUser.description || "",
      profilePic: null,
    });
    setImagePreview(authUser.profilePic);
  };

  if (!userProfile) {
    return <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>;
  }

  return (
    <div className="container mx-auto mt-8 p-4 max-w-4xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg shadow-gray-300/50 dark:shadow-blue-900/30">
      <form 
        onSubmit={handleSubmit}
        className="bg-white/30 dark:bg-gray-800/30 p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
      >
        <div className="flex justify-between items-center mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 font-semibold hover:underline"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">{userProfile.fullName}</h1>
          {authUser._id === id && (
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 rounded-full font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          )}
        </div>

        <div className="flex flex-col items-center space-y-6 mb-8">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile"
              className="w-48 h-48 rounded-full object-cover border-4 border-blue-500 shadow-md hover:shadow-lg transition-all"
            />
          ) : (
            <UserCircleIcon className="w-48 h-48 text-gray-400" />
          )}
          {isEditing && (
            <div className="flex space-x-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="px-6 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all"
              >
                Change Photo
              </Button>
              <Button
                type="button"
                onClick={handleRemoveImage}
                className="px-6 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transition-all"
              >
                Remove Photo
              </Button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Headline</label>
              <input
                type="text"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                placeholder="Headline"
                className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-3 border rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-700 w-full py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Save Changes
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Headline</h2>
              <p className="text-md text-gray-600 dark:text-gray-400">
                {userProfile.headline || "No headline available."}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Description</h2>
              <p className="text-md text-gray-600 dark:text-gray-400">
                {userProfile.description || "No description available."}
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;