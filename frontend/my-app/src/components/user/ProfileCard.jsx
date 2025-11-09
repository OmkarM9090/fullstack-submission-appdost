import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';

// --- FIX: Add .js extension ---
import useAuthStore from '../../store/auth.store.js';
// -----------------------------

const ProfileCard = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(`/profile/${authUser._id}`);
  };

  return (
    // --- WRAPPED IN A CLICKABLE DIV ---
    <div
      onClick={goToProfile}
      className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center sticky top-16 z-50 
                 cursor-pointer transition-shadow duration-300 hover:shadow-2xl dark:hover:bg-gray-700"
      style={{ marginBottom: '1.5rem' }}
    >
      {authUser.profilePic ? (
        <img
          src={authUser.profilePic}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-blue-500 shadow-md hover:shadow-lg transition-all"
        />
      ) : (
        <UserCircleIcon className="w-28 h-28 text-gray-400 mx-auto" />
      )}

      <h2 className="mt-6 text-3xl font-bold text-gray-800 dark:text-gray-200 hover:underline">
        {authUser.fullName}
      </h2>
      <p className="text-md text-gray-500 dark:text-gray-400">
        {authUser.headline || "Web Developer"}
      </p>

      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-md text-gray-600 dark:text-gray-400">Connections</p>
        <p className="font-bold text-xl">150</p>
        <span className="text-md text-linkedin-blue font-medium mt-4 block hover:underline">
          View Profile
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;