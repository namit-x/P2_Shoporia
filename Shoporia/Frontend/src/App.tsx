import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import SignupPage from './Pages/Signup';
import LoginPage from './Pages/Login';
import ProfilePage from './Pages/ProfilePage';
import { Toaster } from 'sonner';
import RetailerDashboard from './Pages/RetailerDashboard';

function App() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const verify = async () => {
  //     let res = await fetch('http://localhost:3000/details', {
  //       method: 'GET',
  //       credentials: 'include',
  //     })
  //     if (res.ok) {
  //       navigate('/retailerDashboard');
  //     }
  //   }
  //   verify();
  // }, []);

  return (
    <>
      <Toaster position='top-right' />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/retailerDashboard" element={<RetailerDashboard />} />
      </Routes>
    </>
  );
}

export default App
