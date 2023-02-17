/* eslint-disable import/export */
import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import appSlice from "./src/state/slices/appSlice";

export function renderWithProviders(
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  {
    // @ts-ignore
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: { app: appSlice },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: JSX.Element }): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
