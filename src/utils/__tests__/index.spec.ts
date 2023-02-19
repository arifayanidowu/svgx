import { waitFor } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { checkIsSvg, extractTags, svgTagsToUpperCase, getOutput } from "..";

const mockSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    </svg>
`;

const mockNativeTransformedSvg = `
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <Path d="M0 0h24v24H0z" fill="none"/>
        <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    </Svg>
`;

const mockJsxOutput = `
    import React, {memo} from "react";

    function MySvg() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
        );
    }

    export default memo(MySvg);
`;

const mockNativeJsxOutput = `
    import React, {memo} from "react";
    import Svg, { Path } from "react-native-svg";

    function MySvg() {
        return (
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <Path d="M0 0h24v24H0z" fill="none"/>
                <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </Svg>
        );
    }

    export default memo(MySvg);
`;

const mockNonSvg = `
    <div>
        <p>Some text</p>
    </div>
`;

describe("utils", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return svg if it is a valid svg", async () => {
    await waitFor(async () => {
      expect(await checkIsSvg(mockSvg)).toEqual(mockSvg);
    });
  });

  it("should throw an error if it is not an svg", async () => {
    await waitFor(async () => {
      try {
        await checkIsSvg(mockNonSvg);
        // If checkIsSvg does not throw an error, the test should fail
        expect(true).toBe(false);
      } catch (error) {
        const err = error as { message: string };
        expect(err.message).toBe("Not a valid SVG");
      }
    });
  });

  it("should return an array of svg tags", async () => {
    expect(extractTags(mockSvg)).toEqual(["Path"]);
  });

  it("should transform svg tags in uppercase", async () => {
    expect(svgTagsToUpperCase(mockSvg)).toEqual(mockNativeTransformedSvg);
  });

  it("should return a React jsx output", async () => {
    waitFor(async () => {
      expect(await getOutput(mockSvg, "react")).toEqual(mockJsxOutput);
    });
  });

  it("should return a React-Native jsx output", async () => {
    waitFor(async () => {
      expect(await getOutput(mockSvg, "react-native")).toEqual(
        mockNativeJsxOutput
      );
    });
  });
});
