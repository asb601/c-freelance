import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  email: "",
  password: "",
  name: "",
  phoneNumber: "",
  address: "",
  isAuthenticated: false,
  error: null,
  profile: null, // Store user profile details
  orders: [], // Store user orders
  profileError: null,
  ordersError: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Required for cookies
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token in cookies
      if (data.token) {
        document.cookie = `authToken=${data.token}; path=/; secure=${process.env.NODE_ENV === "production"}; samesite=strict; max-age=${24 * 60 * 60}`;
      }

      return { email }; // Return necessary data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password, phoneNumber, address }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, phoneNumber, address }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return { email }; // Return necessary data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/profile", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user profile");
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk(
  "user/fetchUserOrders",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/orders", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user orders");
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = "";
      state.password = "";
      state.profile = null;
      state.orders = [];
      document.cookie = "authToken=; path=/; max-age=0"; // Clear cookies
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.error = null; // Registration successful, no error
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload; // Handle registration error
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.profileError = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.profileError = action.payload;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.ordersError = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.ordersError = action.payload;
      });
  },
});

export const { setEmail, setPassword, logout } = userSlice.actions;
export default userSlice.reducer;
