import { createSlice } from "@reduxjs/toolkit";

type LoginModalType = "login" | "regist";
type BoxModalType = "send" | "rename";
type ModalType = LoginModalType | BoxModalType;

export interface ModalState {
  modalState: { isOpen: boolean; name: LoginModalType };
}

const initialState: ModalState = {
  modalState: { isOpen: false, name: "login" },
};

export const mainModalSlice = createSlice({
  name: "mainModal",
  initialState,
  reducers: {
    loginModalOpen: (state) => {
      state.modalState = { isOpen: true, name: "login" };
    },
    registModalOpen: (state) => {
      state.modalState = { isOpen: true, name: "regist" };
    },
    modalClose: (state) => {
      state.modalState = { ...state.modalState, isOpen: false };
    },
  },
});

// export const fileManageModalSlice = createSlice({
//   name: "boxModal",
//   initialState,
// });

export const { loginModalOpen, registModalOpen, modalClose } =
  mainModalSlice.actions;

export default mainModalSlice.reducer;
