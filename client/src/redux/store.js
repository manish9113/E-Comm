import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"


const URL = "http://localhost:8000";


export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${URL}/products`);
            console.log(response.data);
            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchProductDetails = createAsyncThunk(
    "products/fetchProductDetails",
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`${URL}/products/${id}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: null,
        productDetails: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
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
                state.error = action.payload;
            })
            .addCase(fetchProductDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.productDetails = action.payload;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const newitem = action.payload;
            const exist = state.cartItems.find((product) => product.data.id === newitem.id);
            if (exist) {
                state.cartItems = state.cartItems.map(({ data, quantity }) =>
                    data.id === newitem.id
                        ? { data: newitem, quantity: quantity + 1 }
                        : { data, quantity }
                );
            } else {
                state.cartItems.push({
                    data: newitem,
                    quantity: 1,
                });
            }

        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                ({ data, quantity }) => data.id !== action.payload
            );
        },
        clearCart:(state)=>{
            state.cartItems=[];
        }

    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;


const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const rootReducer = combineReducers({
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
})


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
});


export const persistor = persistStore(store);


export default store;
