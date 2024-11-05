import {
  createAction,
  createAsyncThunk,
  createReducer,
  PayloadAction,
} from "@reduxjs/toolkit";
import server from "../server";
import axios from "axios";
import { User, UserState } from "./types/types";

const loadUserRequest = createAction("LoadUserRequest");
const loadUserSuccess = createAction<User>("LoadUserSuccess");
const loadUserFail = createAction<string>("LoadUserFail");
const clearErrors = createAction("clearErrors");
const logoutUser = createAction("logoutUser");

export const loadLoggedinUser = createAsyncThunk(
  "user/loadLoggedinUser",
  async (_, { dispatch }) => {
    try {
      dispatch(loadUserRequest());
      const { data } = await axios.get(`${server}/get-auth-user`, {
        withCredentials: true,
      });
      dispatch(loadUserSuccess(data.user));
    } catch (error: any) {
      dispatch(loadUserFail(error.response.data.message));
    }
  }
);

export const updateUserProfile = createAsyncThunk(
    "user/updateProfile",
    async (userData: { first_name: string; last_name: string }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`${server}/update-profile`, userData,  {
            withCredentials: true,
          });

        return response.data.user; // assuming the API returns the updated user
      } catch (error: any) {
        return rejectWithValue(error.response.data.msg); // Adjusted to match your server's response structure
      }
    }
  );
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { dispatch }) => {
    const response = await axios.post(
      `${server}/logout`,
      {},
      { withCredentials: true }
    );
    dispatch(logoutUser());
    return response.data;
  }
);

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (
    {
      field,
      order,
    }: {
      field: "name" | "role" | "status" | "createdAt";
      order: "asc" | "desc";
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(`${server}/get-users-record`, {
        withCredentials: true,
      });
      const users = response.data.users;

      const sortedUsers = users.sort((a: User, b: User) => {
        let comparison = 0;
        if (field === "name") {
          comparison = a.first_name.localeCompare(b.first_name);
        } else if (field === "role") {
          comparison = a.role.localeCompare(b.role);
        } else if (field === "status") {
          comparison = a.status.localeCompare(b.status);
        } else if (field === "createdAt") {
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }

        return order === "asc" ? comparison : -comparison;
      });

      return sortedUsers;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchSuppliers = createAsyncThunk<User[], void>(
  "supplier/fetchSuppliers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${server}/get-suppliers-record`, {
        withCredentials: true,
      });
      return response.data.users;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchCustomers = createAsyncThunk<User[], void>(
  "supplier/fetchCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${server}/get-customers-record`, {
        withCredentials: true,
      });
      return response.data.users;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchUserById = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("user/fetchUserById", async (userId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${server}/user-details/${userId}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch user"
    );
  }
});

export const updateUser = createAsyncThunk(
  "user/updateSupplier",
  async ({ id, updatedData }: { id: string; updatedData: any }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${server}/update-user/${id}`,
        updatedData
      );
      return response.data; // Assuming this returns the updated user data
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Error updating supplier";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId: string, thunkAPI) => {
    try {
      const response = await axios.delete(`${server}/delete-user/${userId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Error deleting user";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uploadProfilePicture = createAsyncThunk(
  'user/uploadProfilePicture',
  async (formData: FormData) => {
      const response = await axios.post(`${server}/upload-profile-pic`, formData , {withCredentials : true});
      return response.data;
  }
);
const initialState: UserState = {
  loading: false,
  isAuthenticated: false,
  error: null,
  user: null,
  profile_pic: null,
  users: [],
  suppliers: [],
  customers: [],
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadUserRequest, (state) => {
      state.loading = true;
    })
    .addCase(loadUserSuccess, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase(loadUserFail, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    })
    .addCase(clearErrors, (state) => {
      state.error = null;
    })
    .addCase(logoutUser, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    })
    .addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(fetchSuppliers.pending, (state) => {
      state.loading = true;
    })
    .addCase(
      fetchSuppliers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.suppliers = action.payload;
      }
    )
    .addCase(fetchSuppliers.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(fetchCustomers.pending, (state) => {
      state.loading = true;
    })
    .addCase(
      fetchCustomers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.customers = action.payload;
      }
    )
    .addCase(fetchCustomers.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(fetchUserById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(fetchUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to load user";
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.suppliers = state.users.map((user) =>
        user._id === action.payload.id ? action.payload : user
      );
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter(
        (user) => user._id !== action.payload.user._id
      );
    })
    .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload }; // Update the user data
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; 
      })
      .addCase(uploadProfilePicture.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        state.profile_pic = action.payload.profile_pic; // Update profile pic in state
    })
    .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to upload';
    });
});
