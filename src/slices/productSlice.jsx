import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const get1 = "https://fakestoreapi.com/products";
const get2 = "https://api.escuelajs.co/api/v1/products";

//ACTION
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const resp = await axios.get(get1);
      return resp.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);
export const getProductsCategories = createAsyncThunk(
  "products/getProductsCategories",
  async (category) => {
    try {
      const resp = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      return resp.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);

export const getCategories = createAsyncThunk(
  "products/getCategories",
  async () => {
    try {
      const resp = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      return resp.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);

//REDUCER
const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    dataFromCategory: [],
    toggleCate: false,
    productsComponent: false,
    troliSlide: false,
    productsInTroli: JSON.parse(localStorage.getItem("productsInTroli")) || [],
    likeState: JSON.parse(localStorage.getItem("likeState")) || {},
  },
  reducers: {
    toggle: (state) => {
      state.toggleCate = !state.toggleCate;
    },
    toFalse: (state) => {
      state.toggleCate = false;
    },
    switchProductComponent: (state) => {
      state.productsComponent = true;
    },
    switchProduct: (state) => {
      state.productsComponent = false;
    },
    toggleTroli: (state) => {
      state.troliSlide = true;
    },
    toggleTroliOff: (state) => {
      state.troliSlide = false;
    },
    likeProduct: (state, action) => {
      const likedProduct = state.data.find(
        (product) => product.id === action.payload
      );
      if (
        !state.productsInTroli.some((product) => product.id === likedProduct.id)
      ) {
        state.productsInTroli.push(likedProduct);
        localStorage.setItem(
          "productsInTroli",
          JSON.stringify(state.productsInTroli)
        );
      }
    },
    deleteProductInTroli: (state, action) => {
      const productIdToDelete = action.payload;
      state.productsInTroli = state.productsInTroli.filter(
        (product) => product.id !== productIdToDelete
      );
      localStorage.setItem(
        "productsInTroli",
        JSON.stringify(state.productsInTroli)
      );
    },
    handleLikeState: (state, action) => {
      const productId = action.payload;
      state.likeState[productId] = !state.likeState[productId];
      localStorage.setItem("likeState", JSON.stringify(state.likeState));
    },
    updateLikeStateOnProductDelete: (state, action) => {
      const productId = action.payload;
      state.likeState[productId] = false;
      localStorage.setItem("likeState", JSON.stringify(state.likeState));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getProductsCategories.fulfilled, (state, action) => {
        state.dataFromCategory = action.payload;
      });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const {
  toggle,
  toFalse,
  switchProductComponent,
  switchProduct,
  toggleTroli,
  toggleTroliOff,
  likeProduct,
  deleteProductInTroli,
  handleLikeState,
  updateLikeStateOnProductDelete,
} = productsSlice.actions;

export default productsSlice.reducer;
