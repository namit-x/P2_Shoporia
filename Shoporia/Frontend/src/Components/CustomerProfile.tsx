import React, { useState } from 'react';
import { Phone, Mail, MapPin, ShoppingBag } from 'lucide-react';

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

interface CustomerProfileProps {
  userData: CustomerData;
  isEditing: boolean;
}

export const CustomerProfile: React.FC<CustomerProfileProps> = ({ userData, isEditing }) => {

  const [newData, setNewData] = useState({});

  const handleSave = async () => {
    let reqData = { ...newData, phone: userData.phone, role: userData.role };
    console.log("Sending data: ", reqData);
    try {
      const response = await fetch('http://localhost:3000/update', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      })
      let res = await response.json();
      if (res) {
        alert("Updates are saved successfully.");
      }
      window.location.reload();
    }
    catch(err) {
      console.log("Some error ocurred");
      window.location.reload();
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Details</h3>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    defaultValue={userData.firstName}
                    className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-black focus:ring-black text-sm px-4 py-2.5 bg-gray-50"
                    onChange={(e) => setNewData({ ...newData, firstName: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    defaultValue={userData.lastName}
                    className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-black focus:ring-black text-sm px-4 py-2.5 bg-gray-50"
                    onChange={(e) => setNewData({ ...newData, lastName: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    defaultValue={userData.phone}
                    className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-black focus:ring-black text-sm px-4 py-2.5 bg-gray-50"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    defaultValue={userData.email}
                    className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-black focus:ring-black text-sm px-4 py-2.5 bg-gray-50"
                    onChange={(e) => setNewData({ ...newData, email: e.target.value })}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-500 mr-3" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-500 mr-3" />
                  <span>{userData.email}</span>
                </div>
              </div>
            )}
          </div>

          {/* Security */}
          <div>
            <h3 className="text-lg font-medium mb-4">Security</h3>

            {isEditing ? (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-black focus:ring-black text-sm px-4 py-2.5 bg-gray-50"
                />
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-gray-600">Password:</span>
                <span className="ml-2">••••••••</span>

                <button className="ml-4 text-sm text-black underline hover:text-gray-700">
                  Change Password
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Address */}
          <div>
            <h3 className="text-lg font-medium mb-4">Address</h3>

            {isEditing ? (
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Address
                </label>
                <textarea
                  id="address"
                  rows={3}
                  defaultValue={userData.customer_address}
                  className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-black focus:ring-black text-sm px-4 py-2.5 bg-gray-50"
                  onChange={(e) => setNewData({ ...newData, customer_address: e.target.value })}
                />
              </div>
            ) : (
              <div className="flex">
                <MapPin className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                <span>{userData.customer_address ? userData.customer_address : 'Add address.'}</span>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-medium mb-4">Order Summary</h3>
            <div className="rounded-lg bg-gray-50 p-4 flex items-center">
              <ShoppingBag className="w-10 h-10 text-black mr-4" />
              <div>
                <p className="text-2xl font-bold">{userData.total_orders ? userData.total_orders : '0'}</p>
                <p className="text-gray-600 text-sm">Total Orders</p>
              </div>

              <button className="ml-auto text-sm text-black underline hover:text-gray-700">
                View Order History
              </button>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            className="mr-4 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};