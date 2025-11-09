import { useState } from 'react';
import toast from 'react-hot-toast';
import useAuthStore from '../store/auth.store';
import axiosInstance from '../lib/axios'; // Use our pre-configured instance

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthStore();

    const login = async ({ email, password }) => {
        if (!email || !password) {
            return toast.error("Please fill in all fields");
        }

        setLoading(true);
        try {
            const res = await axiosInstance.post(`/api/auth/login`, { email, password });
            const data = res.data;

            if (res.status !== 200) {
                throw new Error(data.error || 'Login failed');
            }

            setAuthUser(data); 
            toast.success('Logged in successfully!');

        } catch (error) {
            toast.error(error.response?.data?.error || error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;