import { Box } from "@mui/material";
import { CustomButton } from "./CustomButton";

interface IClipboardCopyProps {
  onCopy: () => void;
  text: string;
}

export const ClipboardCopy = ({ onCopy, text }: IClipboardCopyProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 1,
      }}
    >
      <CustomButton
        onClick={onCopy}
        size="small"
        variant="contained"
        color="success"
        sx={{
          backgroundColor: "#3f51b5",
          fontSize: 10,
          textTransform: "none",
          borderRadius: 0,
        }}
        data-testid="copy-button"
      >
        {text}
      </CustomButton>
    </Box>
  );
};
