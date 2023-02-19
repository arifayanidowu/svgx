import { vi, expect, test, describe } from "vitest";
import Index from "..";
import { renderWithProviders } from "../../../test-utils";

const mockCode = vi
  .fn()
  .mockReturnValue(
    `<svg xmlns="http://www.w3.org/2000/svg"><path fill="#00CD9F"/></svg>`
  );
const mockSetCode = vi.fn();
const mockUseAppDispatch = vi.fn();
const mockAppLoading = vi.fn().mockReturnValue(true);

const mockUseEditor = vi.fn().mockReturnValue({
  appLoading: () => mockAppLoading(),
});

vi.mock("../../state/hooks", async () => ({
  __esModule: true,
  useAppDispatch: () => mockUseAppDispatch(),
  useAppSelector: () => ({
    loading: false,
    framework: "react",
  }),
}));

vi.mock("../../hooks", async () => {
  const actual = await vi.importActual("../../hooks");
  return {
    ...actual!,
    default: () => ({
      useEditor: () => mockUseEditor(),
    }),
  };
});

vi.mock("react-ace", async () => {
  const actual = await vi.importActual("react-ace");
  return {
    ...actual!,
    onChange: (code: string) => mockSetCode(code),
    onPaste: (code: string) => mockSetCode(code),
    value: () => mockCode(),
  };
});

describe("Index", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(() => vi.fn());
  });
  test("renders", () => {
    const { getByTestId } = renderWithProviders(<Index />);
    mockAppLoading.mockReturnValue(false);
    expect(getByTestId("index")).toBeInTheDocument();
  });

  test("renders editor", () => {
    const { container, getByText } = renderWithProviders(<Index />);
    expect(container.querySelector("#svg-editor")).toBeInTheDocument();
    expect(getByText("Paste your SVG code here")).toBeInTheDocument();
  });
});
