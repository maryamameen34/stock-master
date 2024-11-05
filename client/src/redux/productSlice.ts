import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import server from "../server";
import axios from "axios";
import { Product, ProductState } from "./types/types";

export const uploadProduct = createAsyncThunk(
  "product/uploadProduct",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${server}/upload-product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials : true
      } );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${server}/get-products`, { withCredentials: true });
      return response.data.products;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "An error occurred while fetching products"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchById",
  async (id: string) => {
    const response = await axios.get(`${server}/product-details/${id}`, { withCredentials: true });
    return response.data.product;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (
    { id, product }: { id: string; product: Product },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${server}/update-product/${id}`,
        product
      );
      return response.data.product as Product; // Explicitly specify Product
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "An error occurred while updating the product"
      );
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${server}/delete-product/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "An error occurred while deleting the product"
      );
    }
  }
);

export const filterProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params: { sort?: string; filter?: string } = {}, { rejectWithValue }) => {
    try {
      let url = `${server}/get-products`;

      // Add query parameters based on sorting options
      const queryParams = new URLSearchParams();
      if (params.sort) {
        queryParams.append('sort', params.sort);
      }
      if (params.filter) {
        queryParams.append('filter', params.filter);
      }

      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }

      const response = await axios.get(url, { withCredentials: true });
      return response.data.products;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "An error occurred while fetching products"
      );
    }
  }
);

const initialState: ProductState = {
  product: null,
  products: [],
  loading: false,
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(uploadProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        state.products = state.products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const deletedProductId = action.payload;
        state.products = state.products.filter(
          (product) => product._id !== deletedProductId
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
