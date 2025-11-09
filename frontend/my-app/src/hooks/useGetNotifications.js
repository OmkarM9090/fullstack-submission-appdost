import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios.js';
import useAuthStore from '../store/auth.store.js';

const useGetNotifications = () => {
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const { authUser } = useAuthStore();

    useEffect(() => {
        const getNotifications = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get('/api/notifications');
                setNotifications(res.data);
            } catch (error) {
                toast.error(error.response?.data?.error || "Failed to get notifications");
            } finally {
                setLoading(false);
            }
        };

        if (authUser) {
            getNotifications();
        }
    }, [authUser]);

    return { loading, notifications, setNotifications };
};

export default useGetNotifications;