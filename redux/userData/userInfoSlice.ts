import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userThunk = createAsyncThunk("user/getUser", async (userId, thunkAPI) => {
  const response = await fetch(
    `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX${userId}`
  );
  const data = await response.json();
  return data;
});


const userDetailsThukn = createAsyncThunk(
  "user/getUserDetails",
  async (userId, thunkAPI) => {
    const response = await fetch(
      `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX${userId}`
    );
    const data = await response.json();
    return data;
  })

const userSlicec = createSlice({
  name: "user",
  initialState: {
    value: null,
    userName: "",
  },
  reducers: {
    getUser: (state) => {
      state.value = true;
    },
    setUsername: (state, action) => {
      state.userName = action.payload;
    },
    getValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getUser } = userSlicec.actions;

export default userSlicec.reducer;
