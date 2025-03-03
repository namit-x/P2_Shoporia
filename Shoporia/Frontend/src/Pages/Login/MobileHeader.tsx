import { Link } from 'react-router-dom';
export const MobileHeader = () => {
  return (
    <div className="lg:hidden flex flex-col items-center space-y-4 mb-8">
      <Link 
        to="/" 
        className="text-3xl font-light tracking-widest text-black hover:text-gray-800 transition-all duration-300"
      >
        SHOPORIA
      </Link>
      <div className="text-center">
        <h2 className="text-2xl font-light tracking-wide text-gray-800">
          Welcome back
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            className="font-medium text-black hover:text-gray-800 transition-all duration-300 border-b border-black hover:border-gray-800"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};