import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    listData: [],
    editId: "",
    isOpenModal: false,
    isOpenEditModal: false,
    isFetching: false,
  },
  reducers: {
    setListData: (state, action) => {
      state.listData = action.payload;
    },
    setIsOpen: (state, action) => {
      state.isOpenModal = !state.isOpenModal;
    },
    setIsOpenEdit: (state, action) => {
      state.isOpenEditModal = !state.isOpenEditModal;
    },
    setEditId: (state, action) => {
      state.editId = action.payload;
    },
    setIsFetchingStart: (state, action) => {
      state.isFetching = true;
    },
    setIsFetchingSuccess: (state, action) => {
      state.isFetching = false;
    },
    setIsFetchingFailure: (state, action) => {
      state.isFetching = !false;
    },
  },
});

export const {
  setIsOpen,
  setListData,
  setIsOpenEdit,
  setEditId,
  setIsFetchingStart,
  setIsFetchingSuccess,
  setIsFetchingFailure,
} = dataSlice.actions;

export const selectIsOpenModal = (state) => state.data.isOpenModal;
export const selectIsOpenEdit = (state) => state.data.isOpenEditModal;
export const selectListData = (state) => state.data.listData;
export const selectEditId = (state) => state.data.editId;
export const selectIsFeching = (state) => state.data.isFetching;

export default dataSlice.reducer;
