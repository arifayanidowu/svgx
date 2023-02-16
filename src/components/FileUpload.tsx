import React, { useCallback, useState } from "react";
import { styled } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { Text } from "./Text";
import { Toast } from "./Toast";
import { useAppSelector } from "../state/hooks";

interface IFileUpload {
  setCode: (value: React.SetStateAction<string>) => void;
}

const StyleDiv = styled("div")(({ theme }) => ({
  position: "absolute",
  zIndex: theme.zIndex.appBar + -1,
  top: "15%",
  [theme.breakpoints.down("xs")]: {
    left: "24%",
  },
  [theme.breakpoints.down("sm")]: {
    left: "22%",
    right: "8%",
  },
  [theme.breakpoints.up("md")]: {
    left: "26%",
  },
  padding: 30,
  height: "100%",
  maxWidth: 300,
  maxHeight: 200,
  borderStyle: "dashed",
  borderWidth: 3,
  borderRadius: theme.shape.borderRadius + 5,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
}));

type IToast = {
  open: boolean;
  message: string;
  severity: "error" | "success" | "info" | "warning";
};

export const FileUpload = ({ setCode }: IFileUpload) => {
  const { isLightMode } = useAppSelector((state) => state.app);
  const [toast, setToast] = useState<IToast>({
    open: false,
    message: "",
    severity: "error",
  });
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file.type !== "image/svg+xml") {
      setToast({
        open: true,
        message: "Please upload a valid Svg file",
        severity: "error",
      });
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          setToast({
            open: true,
            message: "File uploaded successfully",
            severity: "success",
          });
          setCode(result.toString());
        }
      };
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      // "image/svg": [".svg"],
    },
  });
  return (
    <StyleDiv
      {...getRootProps()}
      sx={{
        background: isLightMode ? "#a6a6a6" : "#061a1f",
        borderColor: isLightMode ? "#ccc" : "#333",
      }}
    >
      <input type="file" {...getInputProps()} />
      <Text sx={{ color: "#FFFFFF" }}>
        Drag 'n' drop your file here, or click to select file
      </Text>
      <Toast
        open={toast.open}
        message={toast.message}
        handleClose={() => setToast({ ...toast, open: false })}
        severity={toast.severity}
      />
    </StyleDiv>
  );
};
