import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IConfigType = {
  open_add_channel_model: boolean;
  open_change_post_notification_toggle_dialogue: boolean;
};

const initState: IConfigType = {
  open_add_channel_model: false,
  open_change_post_notification_toggle_dialogue: false,
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
