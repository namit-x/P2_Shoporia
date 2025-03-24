import { useState, useEffect } from 'react';
import { useToast } from '../hooks/use-toast';
import { ProfileContent } from '../Components/ProfileContent';
import { Loader, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserPhoto {
  p_name: string;
  data: string;
  content_type: string;
}

interface CustomerData {
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  email: string;
  photo: UserPhoto;
  total_orders: number;
  customer_address: string;
  role: string;
}

interface RetailerData {
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  email: string;
  role: string;
  photo: UserPhoto;
  total_products: number;
  warehouse_address: string;
}

type UserData = CustomerData | RetailerData;

export const ProfilePage = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // In a real app, this would be your API endpoint
        const res = await fetch('http://localhost:3000/details', {
          method: 'GET',
          credentials: 'include',
        });
        let response = await res.json();

        setUserData(response.user);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load profile data. Please try again later.');
        setLoading(false);
        toast("Error", {
          description: "Failed to load profile data.",
          className: "destructive",
        });
      }
    };

    fetchUserData();
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors border-2 border-black"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Homepage
          </Link>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <Loader className="h-8 w-8 animate-spin text-black mb-4" />
            <p className="text-gray-600">Loading your profile...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-8 bg-white rounded-lg shadow">
            <p>{error}</p>
            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : (
          <ProfileContent userData={userData} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
