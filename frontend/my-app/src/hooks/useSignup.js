import { useState } from 'react';
import toast from 'react-hot-toast';
import useAuthStore from '../store/auth.store';
import axiosInstance from '../lib/axios';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthStore();

    const signup = async ({ fullName, email, password }) => {
        if (!fullName || !email || !password) {
            return toast.error("Please fill in all fields");
        }
        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }

        setLoading(true);
        try {
            const res = await axiosInstance.post(`/api/auth/signup`, { fullName, email, password });
            const data = res.data;

            if (res.status !== 201) {
                throw new Error(data.error || 'Signup failed');
            }

            setAuthUser(data); 
            toast.success('Account created successfully!');

        } catch (error) {
            toast.error(error.response?.data?.error || error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;