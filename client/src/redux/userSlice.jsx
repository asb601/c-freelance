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
      });
  },
});

export const { setEmail, setPassword, logout } = userSlice.actions;
export default userSlice.reducer;
