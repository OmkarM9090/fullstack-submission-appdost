import { create } from 'zustand'; 

const getInitialUser = () => {
    try {
        const user = localStorage.getItem('linkedin-user');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Error parsing user from localStorage", error);
        return null;
    }
};

const useAuthStore = create((set) => ({
    authUser: getInitialUser(),
    setAuthUser: (user) => {
        set({ authUser: user });
        if (user) {
            localStorage.setItem('linkedin-user', JSON.stringify(user));
        } else {
            localStorage.removeItem('linkedin-user');
        }
    },
}));

export default useAuthStore;