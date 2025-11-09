import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios.js';
import useAuthStore from '../store/auth.store.js'; // <-- FIX: Added .js

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthStore();

  const updateProfile = async (formData) => {
    // This console.log is the "error" you saw in image_80257f.png
    // You can delete it if you want.
    console.log("Updating profile with data:", formData);

    setLoading(true);
    try {
      const res = await axiosInstance.put("/api/users/update", formData);
      
      if (res.status !== 200) {
        throw new Error(res.data.error || "Failed to update profile");
      }
      
      // Update the user in local storage/state
      setAuthUser({ ...authUser, ...res.data });
      toast.success("Profile updated successfully!");
      return true;

    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateProfile };
};

export default useUpdateProfile;