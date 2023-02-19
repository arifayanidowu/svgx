import { useMemo, useState } from "react";
import { Box, CircularProgress, styled } from "@mui/material";
import { BigCloseIcon } from "./icons/BigCloseIcon";
import { CustomButton } from "./CustomButton";
import { Text } from "./Text";
import { useEditor } from "../hooks";

const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "10%",
  left: "30%",
  zIndex: 3,
  textAlign: "center",
  [theme.breakpoints.down("xs")]: {
    left: "24%",
  },
  [theme.breakpoints.down("sm")]: {
    left: "16%",
  },
  animation: "fadeIn 0.5s ease-in-out",

  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
}));

export const Failed = () => {
  const { animate, reload } = useEditor();

  return (
    <StyledBox property={animate?.toString()}>
      <Box>
        <BigCloseIcon
          fontSize="large"
          color="error"
          sx={{
            width: 300,
            height: 300,
          }}
        />
      </Box>
      <Text color="red">
        Something went wrong. Please check your code and try again.
      </Text>
      <CustomButton
        variant="outlined"
        color="error"
        sx={{
          borderRadius: 0,
          my: 3,
        }}
        onClick={reload}
        endIcon={animate && <CircularProgress size={15} color="error" />}
      >
        {animate ? "Reloading..." : "Reload"}
      </CustomButton>
    </StyledBox>
  );
};
