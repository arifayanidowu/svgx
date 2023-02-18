import { fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Navbar from "..";
import { renderWithProviders } from "../../../../test-utils";

const matches = vi.fn().mockReturnValue(false);
const isLightMode = vi.fn().mockReturnValue(true);
const onToggleSingleQuote = vi.fn();
const onToggleMode = vi.fn();

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual!,
    useMediaQuery: () => matches(),
  };
});

vi.mock("../../state/hooks", async () => ({
  __esModule: true,
  useAppDispatch: () => () => {
    onToggleSingleQuote();
  },
  useAppSelector: () => ({ isLightMode: isLightMode() }),
}));

vi.mock("../../state/slices/appSlice", async () => ({
  __esModule: true,
  onToggleMode: () => onToggleMode(),
}));

vi.mock("../DesktopNav", async () => ({
  __esModule: true,
  default: () => (
    <div data-testid="DesktopNav">
      <button data-testid="toggle-theme" onClick={onToggleMode} />
      <button data-testid="single-quote-switch" onClick={onToggleSingleQuote} />
    </div>
  ),
}));

vi.mock("../MobileNav", async () => ({
  __esModule: true,
  default: () => (
    <div data-testid="MobileNav">
      <button data-testid="toggle-theme" onClick={onToggleMode} />
    </div>
  ),
}));

vi.mock("../Logo", async () => ({
  __esModule: true,
  default: () => <div data-testid="logo" />,
}));

describe("Navbar", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should render DesktopNav", () => {
    matches.mockReturnValue(true);
    const screen = renderWithProviders(<Navbar />);
    expect(screen.getByTestId("DesktopNav")).toBeInTheDocument();
  });

  it("should render MobileNav", () => {
    matches.mockReturnValue(false);
    const screen = renderWithProviders(<Navbar />);
    expect(screen.getByTestId("MobileNav")).toBeInTheDocument();
  });

  it("should render Logo", () => {
    const screen = renderWithProviders(<Navbar />);
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("should toggle theme on DesktopNav", () => {
    matches.mockReturnValue(true);
    const screen = renderWithProviders(<Navbar />);
    fireEvent.click(screen.getByTestId("toggle-theme"));
    isLightMode.mockReturnValue(true);
    expect(onToggleMode).toHaveBeenCalled();
    expect(isLightMode()).toBe(true);
  });

  it("should toggle theme on MobileNav", () => {
    matches.mockReturnValue(false);
    const screen = renderWithProviders(<Navbar />);
    fireEvent.click(screen.getByTestId("toggle-theme"));
    isLightMode.mockReturnValue(true);
    expect(onToggleMode).toHaveBeenCalled();
    expect(isLightMode()).toBe(true);
  });
});
