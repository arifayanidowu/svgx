import { describe, expect, it, vi } from "vitest";
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
  it("should render GitHubIcon", () => {
    const screen = renderWithProviders(<App />);
    expect(screen.getByTestId("GitHubIcon")).toBeInTheDocument();
  });

  it("should render logo", async () => {
    const screen = renderWithProviders(<App />);

    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });
});
