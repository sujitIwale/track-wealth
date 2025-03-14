import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitailState {
    addTransactionModal: {
        open:boolean
    }
}

const initialState:InitailState = {
  addTransactionModal: {
    open: false,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTransactionModal: (state, action: PayloadAction<{ open: boolean }>) => {
      state.addTransactionModal.open = action.payload.open;
    },
  },
});

export const { setTransactionModal } = uiSlice.actions;

export default uiSlice;

