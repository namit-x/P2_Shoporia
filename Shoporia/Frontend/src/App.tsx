import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SignupPage from './Pages/Signup';
import LoginPage from './Pages/Login/Login';
import ProfilePage from './Pages/Profile/ProfilePage';
import { Toaster } from 'sonner';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      let res = await fetch('http://localhost:3000/details', {
        method: 'GET',
        credentials: 'include',
      })
      if (res.ok) {
        navigate('/profile');
      }
    }
    verify();
  }, []);

  return (
    <>
      <Toaster position='top-right' />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App
