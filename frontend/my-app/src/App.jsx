import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

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

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    applyTheme();
  }, [applyTheme]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
      <div
        style={{
          position: 'fixed',
          top: cursorPosition.y,
          left: cursorPosition.x,
          width: '10px',
          height: '10px',
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '50%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          transition: 'transform 0.1s ease',
        }}
      />
    </div>
  );
}

export default App;