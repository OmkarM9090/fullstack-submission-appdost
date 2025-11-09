import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import Button from '../components/common/Button';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { loading, login } = useLogin();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-lg shadow-gray-300/50 dark:shadow-blue-900/30">
                <h1 className="text-3xl font-bold text-center text-linkedin-blue">Login to your account</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
                            required
                        />
                    </div>
                    <Button type="submit" isLoading={loading}>
                        Login
                    </Button>
                </form>
                <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-linkedin-blue hover:underline font-medium">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};
export default LoginPage;