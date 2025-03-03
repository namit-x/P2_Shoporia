import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

export const SignupPage = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    formData.role = role;

    const res = await fetch("http://localhost:3000/signup", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    let response = await res.json();

    if (response.message == "Operation Successful") {
      // alert(`Account Created as ${role}`);
      toast("Account created", {
        description: "Thank you for signing up! Welcome aboard.",
        duration: 4000,
      });
      navigate('/login');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Column - Branding and Info */}
        <div className="hidden lg:flex flex-col justify-center px-12 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-md mx-auto space-y-6">
            <Link
              to="/"
              className="block text-4xl font-light tracking-widest text-black hover:text-gray-800 transition-all duration-300"
            >
              SHOPORIA
            </Link>
            <p className="text-lg text-gray-600 mt-4 hidden lg:block">
              Your one-stop destination for all things fashion and lifestyle. Join our community and discover a world of exclusive deals and personalized shopping experiences.
            </p>
            <div className="space-y-4">
              <h2 className="text-3xl font-light tracking-wide text-gray-800">
                Create your account
              </h2>
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-black hover:text-gray-800 transition-all duration-300 border-b border-black hover:border-gray-800"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Sign Up Form */}
        <div className="flex flex-col items-center justify-center p-6 lg:p-12 bg-white">
          <div className="lg:hidden flex flex-col items-center space-y-4 mb-8">
            <Link
              to="/"
              className="text-3xl font-light tracking-widest text-black hover:text-gray-800 transition-all duration-300"
            >
              SHOPORIA
            </Link>
            <div className="text-center">
              <h2 className="text-2xl font-light tracking-wide text-gray-800">
                Create your account
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-black hover:text-gray-800 transition-all duration-300 border-b border-black hover:border-gray-800"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
          <div className="w-full max-w-md">
            <div className="w-full max-w-md">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <span className="text-sm text-gray-600">I am a</span>
                  <select
                    id="userType"
                    name="userType"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="inline-block w-32 rounded-lg border-gray-200 shadow-sm focus:border-black focus:ring-black text-sm px-4 py-2 bg-gray-50 transition-all duration-200 hover:bg-gray-100"
                  >
                    <option value="customer">Customer</option>
                    <option value="retailer">Retailer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-black focus:ring-black text-sm px-4 py-2.5 bg-gray-50 transition-all duration-200 hover:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-black focus:ring-black text-sm px-4 py-2.5 bg-gray-50 transition-all duration-200 hover:bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-black focus:ring-black text-sm px-4 py-2.5 bg-gray-50 transition-all duration-200 hover:bg-gray-100"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX-XXXXX"
                    className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-black focus:ring-black text-sm px-4 py-2.5 bg-gray-50 transition-all duration-200 hover:bg-gray-100"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-black focus:ring-black text-sm px-4 py-2.5 bg-gray-50 transition-all duration-200 hover:bg-gray-100 pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center transition-opacity duration-200 hover:opacity-70"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 hover:scale-[1.02] mt-6"
                >
                  Create account
                </button>

                <div className="relative flex items-center my-8">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink mx-4 text-gray-400 text-sm">Or continue with</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <button
                  type="button"
                  className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 hover:scale-[1.02]"
                >
                  <img
                    className="h-5 w-5 mr-2"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google logo"
                  />
                  Google
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
