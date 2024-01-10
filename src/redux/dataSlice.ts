// dataSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  data: string[];
}

const initialState: DataState = {
  data: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<string>) => {
      state.data.push(action.payload);
    },
    removeData: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(item => item !== action.payload);
    },
  },
});

export const { addData, removeData } = dataSlice.actions;
export default dataSlice.reducer;
