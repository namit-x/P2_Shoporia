import { Link } from 'react-router-dom';
export const LoginBranding = () => {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <Link 
        to="/" 
        className="block text-4xl font-light tracking-widest text-black hover:text-gray-800 transition-all duration-300"
      >
        SHOPORIA
      </Link>
      <p className="text-lg text-gray-600 mt-4 hidden lg:block">
        Your one-stop destination for all things fashion and lifestyle. Welcome back to your personalized shopping experience.
      </p>
      <div className="space-y-4">
        <h2 className="text-3xl font-light tracking-wide text-gray-800">
          Welcome back
        </h2>
        <p className="text-gray-600">
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