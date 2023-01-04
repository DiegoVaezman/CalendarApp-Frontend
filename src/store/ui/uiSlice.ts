
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface uiState {
    isDateModalOpen: boolean;
}

const initialState: uiState = {
    isDateModalOpen: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        onOpenDateModal: (state ) => {
            state.isDateModalOpen = true;
        },
        onCloseDateModal: (state) => {
            state.isDateModalOpen = false;
        },
    }
});


export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;