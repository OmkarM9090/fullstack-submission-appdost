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
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center sticky top-24 
                 cursor-pointer transition-shadow duration-200 hover:shadow-xl dark:hover:bg-gray-700"
    >
      {authUser.profilePic ? (
        <img
          src={authUser.profilePic}
          alt="Profile"
          className="w-20 h-20 rounded-full mx-auto object-cover"
        />
      ) : (
        <UserCircleIcon className="w-20 h-20 text-gray-400 mx-auto" />
      )}
      
      {/* --- ADDED A "VIEW PROFILE" HINT --- */}
      <h2 className="mt-4 text-xl font-semibold hover:underline">{authUser.fullName}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">{authUser.headline || "Web Developer"}</p>
      
      {/* Optional: Add connection/view counts */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">Connections</p>
        <p className="font-semibold">150</p>
        <span className="text-xs text-linkedin-blue font-medium mt-2">
          View Profile
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;