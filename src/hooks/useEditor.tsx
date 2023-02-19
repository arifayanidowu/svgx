import { useState, useEffect, useCallback } from "react";
import type { IToastProps } from "../components";
import { useAppSelector } from "../state/hooks";
import { getOutput, svgTagsToUpperCase } from "../utils";

export const useEditor = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [clipboardText, setClipboardText] = useState("Copy");
  const [isFailed, setIsFailed] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [toast, setToast] = useState<
    Omit<IToastProps, "handleClose" | "timeout">
  >({
    open: false,
    message: "",
    severity: undefined,
  });
  const { framework } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (code.length) {
      setToast({
        message: "SVG converted successfully",
        severity: "success",
        open: true,
      });
    }
  }, [code]);

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
          setIsFailed(false);
        } catch (error: unknown) {
          let err = error as { message: string };
          setIsFailed(true);
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
    setToast((prev) => ({
      ...prev,
      open: false,
      message: "",
      severity: prev.severity,
    }));
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

  const reload = useCallback(() => {
    setAnimate(true);
    setTimeout(() => {
      window.location.reload();
      setAnimate(false);
    }, 2000);
  }, []);

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
    isFailed,
    reload,
    animate,
  };
};
