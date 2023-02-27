import { createSlice } from "@reduxjs/toolkit";

type BoxModalType = "send" | "rename";

export interface ModalState {
  modalState: { isOpen: boolean; name: BoxModalType };
}

const initialState: ModalState = {
  modalState: { isOpen: false, name: "rename" },
};

export const boxModalSlice = createSlice({
  name: "mainModal",
  initialState,
  reducers: {
    renameModalOpen: (state) => {
      state.modalState = { isOpen: true, name: "rename" };
    },
    sendModalOpen: (state) => {
      state.modalState = { isOpen: true, name: "send" };
    },
    modalClose: (state) => {
      state.modalState = { ...state.modalState, isOpen: false };
    },
  },
});

export const { renameModalOpen, sendModalOpen, modalClose } =
  boxModalSlice.actions;

export default boxModalSlice.reducer;
