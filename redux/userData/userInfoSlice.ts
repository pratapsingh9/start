import { createSlice } from "@reduxjs/toolkit";

const userSlicec = createSlice({
  name: "user",
  initialState: {
    value: null,
    userName:""
  },
  reducers: {
    getUser: (state) => {
      state.value = true;
    },
    setUsername:(state,action) => {
        state.userName = action.payload;
    },
    getValue:(state,action) => {
        state.value = action.payload;
    }
  },
});

export const { getUser } = userSlicec.actions;

export default userSlicec.reducer;
