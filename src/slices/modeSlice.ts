import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  drawing: boolean;
}

const initialState: InitialState = {
  drawing: false,
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setDrawing: (state, action) => {
      state.drawing = action.payload;
    },
  },
});

export const { setDrawing } = modeSlice.actions;
export default modeSlice.reducer;
