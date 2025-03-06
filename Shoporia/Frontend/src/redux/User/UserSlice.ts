import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Photo {
  p_name: string;
  data: string; // Base64 or URL
  content_type: string;
}

export interface User {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
  photo?: Photo;
  total_orders?: number;
  customer_address?: string;
  password?: string;
  total_products?: number;
  warehouse_address?: string;
}

const initialState: User = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  role: "",
  photo: { p_name: "", data: "", content_type: "" },
  total_orders: 0,
  customer_address: "",
  password: "",
  total_products: 0,
  warehouse_address: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      Object.assign(state, action.payload);
      if (state.customer_address) {
        state.warehouse_address = undefined;
      }
      if (state.warehouse_address) {
        state.customer_address = undefined;
      }
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      const updatedState = { ...state, ...action.payload };
      if (updatedState.customer_address) {
        updatedState.warehouse_address = undefined;
      }
      if (updatedState.warehouse_address) {
        updatedState.customer_address = undefined;
      }
      return updatedState;
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
