import { useState } from 'react';
import toast from 'react-hot-toast';
import useAuthStore from '../store/auth.store';
import axiosInstance from '../lib/axios';

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthStore();

    const logout = async () => {
        setLoading(true);
        try {
            await axiosInstance.post('/api/auth/logout');
            
            setAuthUser(null); 
            toast.success('Logged out successfully');

        } catch (error) {
            toast.error(error.response?.data?.error || "Logout failed");
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};

export default useLogout;