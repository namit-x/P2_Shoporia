import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormData {
  phone: string;
  password: string;
  role: string;
}

interface LoginFormProps {
  formData: FormData;
  showPassword: boolean;
  onShowPasswordToggle: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginForm = ({
  formData,
  showPassword,
  onShowPasswordToggle,
  onChange,
  onSubmit,
}: LoginFormProps) => {
  const [role, setRole] = useState('customer');

  useEffect(() => {
    formData.role = role;
  }, [role])


  return (
    <form className="space-y-6" onSubmit={onSubmit}>

      {/* Role Selection Dropdown */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
          Select Role
        </label>
        <select
          id="role"
          name="role"
          required
          value={role}
          onChange={(e) => { setRole(e.target.value) }}
          className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-black focus:ring-black text-sm px-4 py-2.5 bg-gray-50 transition-all duration-200 hover:bg-gray-100"
        >
          <option value="customer">Customer</option>
          <option value="retailer">Retailer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      {/* Phone Number Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          value={formData.phone}
          onChange={onChange}
          className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-black focus:ring-black text-sm px-4 py-2.5 bg-gray-50 transition-all duration-200 hover:bg-gray-100"
        />
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={onChange}
            className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-black focus:ring-black text-sm px-4 py-2.5 bg-gray-50 transition-all duration-200 hover:bg-gray-100 pr-10"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center transition-opacity duration-200 hover:opacity-70"
            onClick={onShowPasswordToggle}
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 hover:scale-[1.02] mt-6"
      >
        Sign in
      </button>

      {/* Divider */}
      <div className="relative flex items-center my-8">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-sm">Or continue with</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {/* Google Sign-in Button */}
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
  );
};
