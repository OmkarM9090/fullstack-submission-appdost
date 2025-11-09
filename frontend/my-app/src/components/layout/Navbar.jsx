import { useState, useEffect } from 'react'; // <-- 1. IMPORT
import { Link, useNavigate } from 'react-router-dom';
import { SunIcon, MoonIcon, ArrowLeftOnRectangleIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/solid';

// --- 2. IMPORT ALL HOOKS WITH .js ---
import useTheme from '../../hooks/useTheme.js';
import useLogout from '../../hooks/useLogout.js';
import useAuthStore from '../../store/auth.store.js';
import useGetNotifications from '../../hooks/useGetNotifications.js'; // <-- NEW
import axiosInstance from '../../lib/axios.js'; // <-- NEW
import { formatDate } from '../../lib/formatDate.js'; // <-- NEW
// --------------------------------------

// --- 3. NEW NOTIFICATION DROPDOWN COMPONENT ---
const NotificationDropdown = ({ notifications, onClose }) => {
    
    const getNotificationMessage = (notif) => {
        switch (notif.type) {
            case 'like-post':
                return <><strong>{notif.from.fullName}</strong> liked your post.</>;
            case 'comment-post':
                return <><strong>{notif.from.fullName}</strong> commented on your post.</>;
            case 'like-comment':
                return <><strong>{notif.from.fullName}</strong> liked your comment.</>;
            default:
                return "You have a new notification.";
        }
    };

    return (
        <div 
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-20 border dark:border-gray-700"
            onMouseLeave={onClose} // Close when mouse leaves
        >
            <div className="p-4 font-semibold border-b dark:border-gray-700">Notifications</div>
            <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                    <p className="p-4 text-sm text-gray-500 text-center">No new notifications</p>
                ) : (
                    notifications.map((notif) => (
                        <div key={notif._id} className={`p-4 flex items-start space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${!notif.read ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
                            {notif.from.profilePic ? (
                                <img src={notif.from.profilePic} alt={notif.from.fullName} className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                                <UserCircleIcon className="w-10 h-10 text-gray-400" />
                            )}
                            <div>
                                <p className="text-sm">{getNotificationMessage(notif)}</p>
                                <p className="text-xs text-linkedin-blue">{formatDate(notif.createdAt)}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
// ------------------------------------------


const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { loading, logout } = useLogout();
    const { authUser } = useAuthStore();
    const navigate = useNavigate();

    // --- 4. NEW NOTIFICATION STATE ---
    const { notifications, setNotifications } = useGetNotifications();
    const [showNotifications, setShowNotifications] = useState(false);
    
    // Calculate if there are unread notifications
    const hasUnread = notifications.some(n => !n.read);

    const handleNotificationClick = async () => {
        setShowNotifications(!showNotifications);
        // If opening the dropdown and there are unread notifications
        if (!showNotifications && hasUnread) {
            try {
                // Mark all as read on the backend
                await axiosInstance.post('/api/notifications/read');
                // Mark all as read on the frontend
                const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
                setNotifications(updatedNotifications);
            } catch (error) {
                console.error("Failed to mark notifications as read", error);
            }
        }
    };
    // ---------------------------------

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-linkedin-blue">
                            LinkedIn
                        </Link>
                    </div>

                    {/* Nav Icons & User */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <Link to={`/profile/${authUser._id}`} className="flex items-center space-x-2 text-sm font-medium p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                            {authUser.profilePic ? (
                                <img src={authUser.profilePic} alt="profile" className="w-6 h-6 rounded-full object-cover" />
                            ) : (
                                <UserCircleIcon className="w-6 h-6" />
                            )}
                            <span className="hidden sm:block">Welcome, {authUser.fullName.split(' ')[0]}</span>
                        </Link>
                        
                        {/* --- 5. NEW NOTIFICATION BUTTON --- */}
                        <div className="relative">
                            <button
                                onClick={handleNotificationClick}
                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <BellIcon className="w-6 h-6" />
                                {hasUnread && (
                                    <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                                )}
                            </button>
                            {showNotifications && (
                                <NotificationDropdown 
                                    notifications={notifications} 
                                    onClose={() => setShowNotifications(false)}
                                />
                            )}
                        </div>
                        {/* ---------------------------------- */}

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            {theme === 'light' ? (
                                <MoonIcon className="w-6 h-6" />
                            ) : (
                                <SunIcon className="w-6 h-6" />
                            )}
                        </button>

                        <button
                            onClick={logout}
                            disabled={loading}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
                            ) : (
                                <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;