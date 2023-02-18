import { vi, expect, test, describe } from "vitest";
import Index from "..";
import { renderWithProviders } from "../../../test-utils";

const mockCode = vi
  .fn()
  .mockReturnValue(
    `<svg xmlns="http://www.w3.org/2000/svg"><path fill="#00CD9F"/></svg>`
  );
const mockSetCode = vi.fn();
const mockParseCode = vi.fn();
const mockUseAppDispatch = vi.fn();
const mockAppLoading = vi.fn().mockReturnValue(true);
const mockOutput = vi.fn().mockReturnValue(
  `
  import React from "react";

  const SvgComponent = () => (
    <svg xmlns="http://www.w3.org/2000/svg">
      <path fill="#00CD9F"/>
    </svg>
  );

  export default SvgComponent;
    `
);
const mockToast = vi.fn().mockReturnValue({
  message: "SVG converted successfully",
  severity: "success",
  open: true,
});
const mockUseEditor = vi.fn().mockReturnValue({
  appLoading: () => mockAppLoading(),
});

const prettier = {
  format: vi.fn(),
};

vi.mock("prettier/parser-babel", async () => {
  const actual = await vi.importActual("prettier/parser-babel");
  return {
    ...actual!,
    parsers: {
      babel: {
        parse: () => vi.fn(),
      },
    },
  };
});

vi.mock("prettier/standalone", async () => {
  const actual = await vi.importActual("prettier/standalone");
  return {
    ...actual!,
    format: () => prettier.format(),
  };
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

// vi.mock("../../utils", async () => {
//   const actual = await vi.importActual("../../utils");
//   return {
//     ...actual!,
//     default: () => ({
//       __esModule: true,
//       parseCode: () => mockParseCode(),
//       svgTagsToUpperCase: (code: string) => code,
//       getOutput: async (code: string, framework: string) => {
//         return `
//         import React from "react";

//         const SvgComponent = () => (
//           <svg xmlns="http://www.w3.org/2000/svg">
//             <path fill="#00CD9F"/>
//           </svg>
//         );

//         export default SvgComponent;
//           `;
//       },
//     }),
//   };
// });

describe("Index", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // prettier.format.mockImplementation((code: string) => code);
    mockUseAppDispatch.mockReturnValue(() => vi.fn());
  });
  test("renders", () => {
    const { getByTestId } = renderWithProviders(<Index />);
    mockAppLoading.mockReturnValue(false);
    expect(getByTestId("index")).toBeInTheDocument();
  });
});
