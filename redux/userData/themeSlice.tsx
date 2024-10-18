import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkTheme: "light",
  },
  reducers: {
    changeTheme: (state) => {
      state.darkTheme = state.darkTheme === "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      state.darkTheme = action.payload;
    },
    initializeTheme: (state, action) => {
      state.darkTheme = action.payload;
    },
  },
});

export const { changeTheme, setTheme, initializeTheme } = themeSlice.actions;
export default themeSlice.reducer;
