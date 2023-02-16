import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import App from "./App";

import { renderWithProviders } from "../test-utils";

vi.mock("./state/hooks", async () => ({
  useAppSelector: () => ({
    isSingleQuote: true,
    isLightMode: true,
    loading: false,
    language: "javascript",
    framework: "react",
  }),
  useAppDispatch: () => () => {},
}));

describe("App", () => {
  it("should render", () => {
    const screen = renderWithProviders(<App />);
    expect(screen.getByText("single quotes")).toBeInTheDocument();
  });

  it("should render react text in button", async () => {
    const screen = renderWithProviders(<App />);

    expect(screen.getByTestId("framework-button")).toBeInTheDocument();
  });
});
