import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SignupPage from './Pages/Signup';
// import { useSelector, useDispatch } from 'react-redux'
// import { RootState } from './redux/store';
import LoginPage from './Pages/Login/Login';
import { Toaster } from 'sonner';

function App() {
  // const count = useSelector((state:RootState) => state.counter.value)
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      let res = await fetch('http://localhost:3000/homepage', {
        method: 'GET',
        credentials: 'include',
      })
      let response = await res.json();
      console.log("Cookies sent, response: ", response);
      
      if (res.ok) {
        navigate('/');
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
      </Routes>
    </>
  );
}

export default App
