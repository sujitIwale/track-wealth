import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitailState {
    addTransactionModal: {
        open:boolean
    },
    importModal: {
        open:boolean
    }
}

const initialState:InitailState = {
  addTransactionModal: {
    open: false,
  },
  importModal: {
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
    setImportModal: (state, action: PayloadAction<{ open: boolean }>) => {
      state.importModal.open = action.payload.open;
    },
  },
});

export const { setTransactionModal, setImportModal } = uiSlice.actions;

export default uiSlice;

