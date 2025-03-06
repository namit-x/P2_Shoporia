import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, LogOut, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { User as UserInterface } from '../redux/User/userSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const user: UserInterface = useSelector((state: RootState) => state.user as UserInterface);

  return (
    <div>
      <header className="fixed w-full bg-white z-50 border-b">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Left Section */}
            <div className="flex items-center gap-8">
              <button className="lg:hidden">
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-3xl font-light tracking-wider hover:cursor-pointer" onClick={() => navigate('/')}>SHOPORIA</h1>
            </div>

            {/* Center Section - Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              <a href="#" className="text-black text-[18px] transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full">New</a>
              <a href="#" className="text-black text-[18px] transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full">Women</a>
              <a href="#" className="text-black text-[18px] transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full">Men</a>
              <a href="#" className="text-black text-[18px] transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full">Beauty</a>
              <a href="#" className="text-black text-[18px] transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full">Home</a>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-40 py-2 outline-none text-sm"
                />
              </div>
              <button className="p-2">
                <ShoppingCart className="w-6 h-6" />
              </button>
              <div className="relative">
                <button
                  onMouseEnter={() => setShowDropdown(true)}
                  className="p-2 flex items-center gap-2 hover:text-gray-600 transition-colors"
                >
                  <User className="w-6 h-6" />
                  <div className="text-[18px]">{user ? user.firstName : 'User'}</div>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100"
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setShowDropdown(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-[16px] text-black hover:bg-gray-50 w-full text-left"
                    >
                      <UserCircle className="w-5 h-5" />
                      Profile
                    </button>
                    {!user ? (
                      <button
                        onClick={() => {
                          navigate('/login');
                          setShowDropdown(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-[16px] text-black hover:bg-gray-50 w-full text-left"
                      >
                        <User className="w-5 h-5" />
                        Sign In
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          // Handle sign out logic here
                          setShowDropdown(false);
                          navigate('/login');
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-[16px] text-black hover:bg-gray-50 w-full text-left"
                      >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;

export { Navbar }