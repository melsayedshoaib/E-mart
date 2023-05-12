import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { toast } from "react-hot-toast";

let userToken = localStorage.getItem("user-token");

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId, { rejectWithValue }) => {
    try {
      let { data } = await axios.post(
        `https://route-ecommerce-app.vercel.app/api/v1/cart`,
        { productId: productId },
        { headers: { Token: userToken } }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getLoggedCart = createAsyncThunk(
  "cart/getLoggedCart",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axios.get(
        `https://route-ecommerce-app.vercel.app/api/v1/cart`,
        { headers: { Token: userToken } }
      );
      sessionStorage.setItem("cart-id", data.data._id);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeSpecificProduct = createAsyncThunk(
  "cart/removeSpecificProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `https://route-ecommerce-app.vercel.app/api/v1/cart/${id}`,
        { headers: { Token: userToken } }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (values, { rejectWithValue }) => {
    let { id, count } = values;
    try {
      let { data } = await axios.put(
        `https://route-ecommerce-app.vercel.app/api/v1/cart/${id}`,
        { count: count },
        { headers: { Token: userToken } }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axios.delete(
        `https://route-ecommerce-app.vercel.app/api/v1/cart`,
        { headers: { Token: userToken } }
      );
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    quantity: 0,
    total: 0,
  },
  extraReducers(builder) {
    builder.addCase(addToCart.fulfilled, (state, { payload }) => {
      if (payload.status === "success") {
        toast.success("Product added successfully to cart");
      } else {
        toast.error("Something went wrong");
      }
      state.quantity = payload.numOfCartItems;
    });
    builder.addCase(getLoggedCart.fulfilled, (state, { payload }) => {
      state.total = payload.data.totalCartPrice;
      state.cart = payload.data.products;
      state.quantity = payload.numOfCartItems;
    });
    builder.addCase(removeSpecificProduct.fulfilled, (state, { payload }) => {
      state.cart = payload.data.products;
      state.total = payload.data.totalCartPrice;
      state.quantity = payload.numOfCartItems;
      toast.success("Product deleted successfully");
    });
    builder.addCase(updateCart.fulfilled, (state, { payload }) => {
      state.cart = payload.data.products;
      state.total = payload.data.totalCartPrice;
    });
    builder.addCase(clearCart.fulfilled, (state, { payload }) => {
      state.quantity = 0;
      state.total = 0;
      state.cart = payload.data;
    });
  },
});

export default cartSlice.reducer;
