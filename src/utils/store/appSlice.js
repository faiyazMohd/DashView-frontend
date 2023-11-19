import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    showAlert: null,
  },
  reducers: {
    setShowAlert: (state, action) => {
      if (action.payload) {
        if (action.payload.type) {
          state.showAlert = {
            type: "success",
            message: action.payload.message,
          };
        } else {
          state.showAlert = {
            type: "error",
            message: action.payload.message,
          };
        }
      } else {
        state.showAlert = null;
      }
    },
  },
});

export const { setShowAlert } = appSlice.actions;
export default appSlice.reducer;
