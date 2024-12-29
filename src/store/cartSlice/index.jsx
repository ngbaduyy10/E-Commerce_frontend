import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getCart, addToCart, updateCart, deleteCart, clearCart} from '@/services/cart.service.jsx';

export const getCartSlice = createAsyncThunk(
    "cart/getCart",
    async (id) => {
        return await getCart(id);
    }
);

export const addToCartSlice = createAsyncThunk(
    "cart/addToCart",
    async (data) => {
        return await addToCart(data);
    }
);

export const updateCartSlice = createAsyncThunk(
    "cart/updateCart",
    async (data) => {
        return await updateCart(data);
    }
);

export const deleteCartSlice = createAsyncThunk(
    "cart/deleteCart",
    async (data) => {
        return await deleteCart(data);
    }
);

export const clearCartSlice = createAsyncThunk(
    "cart/clearCart",
    async (id) => {
        return await clearCart(id);
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartId: '',
        cartItems: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCartSlice.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCartSlice.fulfilled, (state, action) => {
                state.cartId = action.payload.data._id;
                state.cartItems = action.payload.data.items;
                state.loading = false;
            })
            .addCase(getCartSlice.rejected, (state) => {
                state.loading = false;
            })
            .addCase(addToCartSlice.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCartSlice.fulfilled, (state, action) => {
                state.cartItems = action.payload.data.items;
                state.loading = false;
            })
            .addCase(addToCartSlice.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateCartSlice.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCartSlice.fulfilled, (state, action) => {
                state.cartItems = action.payload.data.items;
                state.loading = false;
            })
            .addCase(updateCartSlice.rejected, (state) => {
                state.loading = false;
            })
            .addCase(deleteCartSlice.fulfilled, (state, action) => {
                state.cartItems = action.payload.data.items;
            })
            .addCase(clearCartSlice.fulfilled, (state) => {
                state.cartItems = [];
            });
    }
});

export default cartSlice.reducer;