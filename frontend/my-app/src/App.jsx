import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

// --- Add .js/.jsx extensions to all imports ---
import useAuthStore from './store/auth.store.js';
import useTheme from './hooks/useTheme.js';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx'; 
import Navbar from './components/layout/Navbar.jsx';

function App() {
  const { authUser } = useAuthStore();
  const { applyTheme } = useTheme();

  useEffect(() => {
    applyTheme();
  }, [applyTheme]);

  return (
    <div className='min-h-screen'>
      {authUser && <Navbar />}
      <Toaster position="top-center" />
      <Routes>
        <Route 
          path='/' 
          element={authUser ? <HomePage /> : <Navigate to="/login" />} 
        />
        <Route 
          path='/login' 
          element={!authUser ? <LoginPage /> : <Navigate to="/" />} 
        />
        <Route 
          path='/signup' 
          element={!authUser ? <SignupPage /> : <Navigate to="/" />} 
        />
        {/* --- THIS IS THE CORRECTED DYNAMIC ROUTE --- */}
        <Route 
          path='/profile/:id' 
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />} 
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;