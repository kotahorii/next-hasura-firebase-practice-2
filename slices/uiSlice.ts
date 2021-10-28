import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { EditNews, EditTask } from "../types/types";

export type uiState = {
  editedTask: EditTask;
  editedNews: EditNews;
};

const initialState: uiState = {
  editedTask: {
    id: "",
    title: "",
  },
  editedNews: {
    id: "",
    content: "",
  },
};
export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setEditedTask: (state, action: PayloadAction<EditTask>) => {
      state.editedTask = action.payload;
    },
    resetEditTask: (state) => {
      state.editedTask = initialState.editedTask;
    },
    setEditedNews: (state, action: PayloadAction<EditNews>) => {
      state.editedNews = action.payload;
    },
    resetEditedNews: (state) => {
      state.editedNews = initialState.editedNews;
    },
  },
});
export const { setEditedNews, resetEditTask, setEditedTask, resetEditedNews } =
  uiSlice.actions;
export const selectTask = (state: RootState) => state.ui.editedTask;
export const selectNews = (state: RootState) => state.ui.editedNews;
export default uiSlice.reducer;
