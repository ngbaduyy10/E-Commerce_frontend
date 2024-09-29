import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authChecking, login, logout, register} from '@/services/auth.service.jsx';

export const userRegister = createAsyncThunk(
    "register",
    async (formData) => {
        const response = await register(formData);
        return response.data;
    }
);

export const userLogin = createAsyncThunk(
    "login",
    async (formData) => {
        const response = await login(formData);
        return response.data;
    }
);

export const userLogout = createAsyncThunk(
    "logout",
    async () => {
        const response = await logout();
        return response.data;
    }
);

export const authCheck = createAsyncThunk(
    "authCheck",
    async () => {
        const response = await authChecking();
        return response.data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        user: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userRegister.pending, (state) => {
                state.loading = true;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.isAuth = action.payload.success;
                state.user = action.payload?.user;
                state.loading = false;
                localStorage.setItem("permission", action.payload?.success);
            })
            .addCase(userRegister.rejected, (state) => {
                state.loading = false;
            })
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.isAuth = action.payload.success;
                state.user = action.payload?.user;
                state.loading = false;
                localStorage.setItem("permission", action.payload?.success);
            })
            .addCase(userLogin.rejected, (state) => {
                state.loading = false;
            })
            .addCase(authCheck.pending, (state) => {
                state.loading = true;
            })
            .addCase(authCheck.fulfilled, (state, action) => {
                state.isAuth = action.payload.success;
                state.user = action.payload?.user;
                state.loading = false;
                action.payload.success ? localStorage.setItem("permission", action.payload?.success) : localStorage.removeItem("permission");
            })
            .addCase(authCheck.rejected, (state) => {
                state.loading = false;
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.isAuth = false;
                state.user = null;
                localStorage.removeItem("permission");
            })
    },
});

export default authSlice.reducer;