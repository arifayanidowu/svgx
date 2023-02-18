import { useState, useEffect } from "react";
import { IToastProps } from "../components";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { onLoad, onLoaded } from "../state/slices/appSlice";
import { getOutput, svgTagsToUpperCase } from "../utils";

export const useEditor = () => {
  const dispatch = useAppDispatch();
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [clipboardText, setClipboardText] = useState("Copy");
  const [toast, setToast] = useState<
    Omit<IToastProps, "handleClose" | "timeout">
  >({
    open: false,
    message: "",
    severity: undefined,
  });
  const { loading, framework } = useAppSelector((state) => state.app);

  useEffect(() => {
    dispatch(onLoad());
    setTimeout(() => {
      dispatch(onLoaded());
    }, 1500);
  }, [dispatch, onLoad]);

  useEffect(() => {
    (async () => {
      if (code.length) {
        try {
          const output = await getOutput(code, framework);
          //Remove xmlns from svg for react-native-svg package
          const cleanedOutput = output!.replace(
            /xmlns=["']http:\/\/www\.w3\.org\/2000\/svg["']/g,
            ""
          );
          const convertedOutput = svgTagsToUpperCase(cleanedOutput); // Convert svg tags to uppercase

          setOutput(framework === "react-native" ? convertedOutput : output!);

          setToast({
            message: "SVG converted successfully",
            severity: "success",
            open: true,
          });
        } catch (error: unknown) {
          let err = error as { message: string };
          setToast({
            message: err?.message,
            severity: "error",
            open: true,
          });
        }
      }
    })();
  }, [code, framework]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setToast({
      open: false,
      message: "",
      severity: undefined,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setToast({
      message: "Copied to clipboard",
      severity: "success",
      open: true,
    });
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
    toast,
    clipboardText,
    setClipboardText,
    handleClose,
    handleCopy,
    appLoading: loading,
  };
};
