import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type AppState = {
  loading: boolean;
  language: "typescript" | "javascript";
  framework: "react" | "react-native";
  isSingleQuote?: boolean;
  isLightMode?: boolean;
};

const initialState: AppState = {
  loading: false,
  language: "javascript",
  framework: "react",
  isSingleQuote: false || JSON.parse(localStorage.getItem("isSingleQuote")!),
  isLightMode: false || JSON.parse(localStorage.getItem("isLightMode")!),
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    onLoad: (state) => {
      state.loading = true;
    },
    onLoaded: (state) => {
      state.loading = false;
    },
    onChangeFramework: (
      state,
      action: PayloadAction<AppState["framework"]>
    ) => {
      state.framework = action.payload;
    },
    onChangeLanguage: (state, action: PayloadAction<AppState["language"]>) => {
      state.language = action.payload;
    },
    onToggleSingleQuote: (state) => {
      state.isSingleQuote = !state.isSingleQuote;
      localStorage.setItem("isSingleQuote", String(state.isSingleQuote));
    },
    onToggleMode: (state) => {
      state.isLightMode = !state.isLightMode;
      localStorage.setItem("isLightMode", String(state.isLightMode));
      window.document.body.classList.toggle("light");
    },
  },
});

export const {
  onLoad,
  onLoaded,
  onChangeFramework,
  onChangeLanguage,
  onToggleSingleQuote,
  onToggleMode,
} = appSlice.actions;

export default appSlice.reducer;
