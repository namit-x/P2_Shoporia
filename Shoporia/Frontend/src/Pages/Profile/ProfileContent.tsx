import React, { useState, useRef } from 'react';
import { Camera, Edit, User } from 'lucide-react';
import { CustomerProfile } from './CustomerProfile';
import { RetailerProfile } from './RetailerProfile';
import { useToast } from '../../hooks/use-toast';

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
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  if (!userData) return null;

  const fullName = `${userData.firstName} ${userData.lastName}`;

  const isCustomer: boolean = 'customer' === userData.role;

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast(('Error'),{
        description: "Image size should be less than 5MB",
        className: "destructive",
      });
      return;
    }

    // Check file type
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      toast(('Error'),{
        description: "Only JPG, PNG, and GIF images are allowed",
        className: "destructive",
      });
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // In a real app, you would upload the file to your server here
    toast(('Sucess'),{
      description: "Profile photo updated successfully",
    });
  };

  return (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 sm:p-8 border-b">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="relative mb-4 sm:mb-0 sm:mr-6">
            <div 
              className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-md cursor-pointer"
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
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/png, image/jpeg, image/gif"
                onChange={handlePhotoChange}
              />
            </div>
            <button 
              className="absolute bottom-0 right-0 bg-black text-white p-1 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
              aria-label="Change profile picture"
              onClick={handlePhotoClick}
            >
              <Camera size={16} />
            </button>
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