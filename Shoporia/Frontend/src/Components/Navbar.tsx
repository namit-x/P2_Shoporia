import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
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
              <button onClick={() => {navigate('/login')}} className="p-2">
                <User className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
