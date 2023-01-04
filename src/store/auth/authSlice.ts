import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces/interfaces';

export interface AuthState {
    status: 'checking' | 'not-authenticated' | 'authenticated';
    user: User | null;
    errorMessage: string | null;
}

const initialState: AuthState = {
    status: 'checking',
    user: null,
    errorMessage: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = null;
            state.errorMessage = null;
        },
        onLogin: (state, action: PayloadAction<User> ) => {
            state.status = 'authenticated';
            state.user = action.payload;
            state.errorMessage = null;
        },
        onLogout: (state, action: PayloadAction<string | null> ) => {
            state.status = 'not-authenticated';
            state.user = null;
            state.errorMessage = action.payload;
        },
        clearErrorMessage: (state ) => {
            state.errorMessage = null;
        },
    }
});


export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;