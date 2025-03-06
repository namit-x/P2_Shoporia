import React, { useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { LoginForm } from './LoginForm';
import { LoginBranding } from './LoginBranding';
import { MobileHeader } from './MobileHeader';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setUser, User } from '../../redux/User/userSlice';

export interface Photo {
  p_name: string;
  data: string; // Base64 or URL
  content_type: string;
}

export interface Customer {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  photo?: Photo;
  total_orders?: number;
  customer_address?: string;
  role: string;
}

export interface Retailer {
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  email: string;
  role: string;
  photo?: Photo; // Optional photo
  total_products?: number;
  warehouse_address?: string;
}

export const LoginPage = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    role: '',
  });
  const dispatch = useDispatch();

  const storeData = async (Data: Customer | Retailer) => {
    dispatch(setUser(Data as User));
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (formData.role === "") {
      formData.role = "customer";
      alert("You are trying to signed in as a customer? if not change your role.");
    }

    let res = await fetch("http://localhost:3000/login", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    })
    let response = await res.json();

    if (response.message === "Verified") {
      storeData(response.userData);
      toast(("Welcome back!"), {
        description: "You have successfully logged in.",
        duration: 4000,
      });
      navigate('/');
    }
    else {
      alert("No account found, Try Again!");
      setFormData({
        phone: '',
        password: '',
        role: '',
      });
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
          <LoginBranding />
        </div>

        {/* Right Column - Login Form */}
        <div className="flex flex-col items-center justify-center p-6 lg:p-12 bg-white">
          <MobileHeader />
          <div className="w-full max-w-md">
            <LoginForm
              formData={formData}
              showPassword={showPassword}
              onShowPasswordToggle={() => setShowPassword(!showPassword)}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;