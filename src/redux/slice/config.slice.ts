import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IConfigType = {
  open_add_channel_model: boolean;
};

const initState: IConfigType = {
  open_add_channel_model: false,
};

const resetState = () => initState;

const setState: CaseReducer<IConfigType, PayloadAction<any>> = (
  state,
  action
) => ({
  ...state,
  ...action.payload,
});

const configSlice = createSlice({
  name: "config",
  initialState: initState,
  reducers: {
    resetState,
    setState,
  },
});

export default configSlice;
