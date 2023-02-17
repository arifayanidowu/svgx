import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { onLoad, onLoaded } from "../state/slices/appSlice";
import { extractTags } from "../utils/extractTags";
import { svgTagsToUpperCase } from "../utils/svgTagsToUppercase";

export const useEditor = () => {
  const dispatch = useAppDispatch();
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [open, setOpen] = useState(false);
  const [clipboardText, setClipboardText] = useState("Copy");
  const { loading, framework } = useAppSelector((state) => state.app);

  useEffect(() => {
    dispatch(onLoad());
    setTimeout(() => {
      dispatch(onLoaded());
    }, 1500);
  }, [dispatch, onLoad]);

  useEffect(() => {
    if (code !== "") {
      const tags = extractTags(code); // Extract svg tags
      const output = `
            import React, {memo} from "react";
            ${
              framework === "react-native"
                ? `import Svg, { ${tags!.join(", ")} } from "react-native-svg"`
                : "\n"
            };
        
            function MySvg() {
              return (
                  ${code.replace(/;/g, "")}
              );
            }
      
            export default memo(MySvg);
            `;

      //Remove xmlns from svg for react-native-svg package
      const cleanedOutput = output.replace(
        /xmlns=["']http:\/\/www\.w3\.org\/2000\/svg["']/g,
        ""
      );
      const convertedOutput = svgTagsToUpperCase(cleanedOutput); // Convert svg tags to uppercase

      setOutput(framework === "react-native" ? convertedOutput : output);
    } else {
      setOutput("");
    }
  }, [code, framework]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setOpen(true);
    setClipboardText("Copied!");
    setTimeout(() => {
      setClipboardText("Copy");
    }, 2000);
  };

  return {
    code,
    setCode,
    output,
    setOutput,
    open,
    setOpen,
    clipboardText,
    setClipboardText,
    handleClose,
    handleCopy,
    appLoading: loading,
  };
};
