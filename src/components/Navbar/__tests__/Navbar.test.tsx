import { describe, expect, it, vi } from "vitest";
import Navbar from "..";
import { renderWithProviders } from "../../../../test-utils";

let matches = vi.fn().mockReturnValue(false);
const onToggleMode = vi.fn();

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual!,
    useMediaQuery: () => matches(),
  };
});

vi.mock("../../state/slices/appSlice", async () => ({
  __esModule: true,
  onToggleMode: () => onToggleMode(),
}));

vi.mock("../DesktopNav", async () => ({
  __esModule: true,
  default: () => <div data-testid="DesktopNav" />,
}));

vi.mock("../MobileNav", async () => ({
  __esModule: true,
  default: () => <div data-testid="MobileNav" />,
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
});
