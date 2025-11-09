import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup';
import Button from '../components/common/Button';

const SignupPage = () => {
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
    const { loading, signup } = useSignup();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(formData);
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <h1 className="text-3xl font-bold text-center text-linkedin-blue">Create an account</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
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
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
                            required
                            placeholder='Must be at least 6 characters'
                        />
                    </div>
                    <Button type="submit" isLoading={loading}>
                        Sign Up
                    </Button>
                </form>
                <p className="text-sm text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-linkedin-blue hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};
export default SignupPage;