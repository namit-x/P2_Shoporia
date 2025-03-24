import React, { useState, useRef } from 'react';
import { Edit, User } from 'lucide-react';
import { CustomerProfile } from './CustomerProfile';
import { RetailerProfile } from './RetailerProfile';

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

interface ProfileContentProps {
  userData: UserData | null;
}

export const ProfileContent: React.FC<ProfileContentProps> = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [photoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!userData) return null;

  const fullName = `${userData.firstName} ${userData.lastName}`;

  const isCustomer: boolean = 'customer' === userData.role;

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 sm:p-8 border-b">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="relative mb-4 sm:mb-0 sm:mr-6">
            <div
              className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-md"
              onClick={handlePhotoClick}
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt={fullName}
                  className="h-full w-full object-cover"
                />
              ) : userData.photo && userData.photo.data ? (
                <img
                  src={userData.photo.data}
                  alt={fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-200">
                  <User size={40} className="text-gray-400" />
                </div>
              )}
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-semibold text-gray-900">{fullName}</h1>
            <p className="text-gray-600">{userData.email}</p>
            <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white">
              {userData.role}
            </div>
          </div>

          <div className="mt-4 sm:mt-0 sm:ml-auto">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Edit size={16} className="mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-6 sm:p-8">
        {isCustomer ? (
          <CustomerProfile userData={userData as CustomerData} isEditing={isEditing} />
        ) : (
          <RetailerProfile userData={userData as RetailerData} isEditing={isEditing} />
        )}
      </div>
    </div>);
};