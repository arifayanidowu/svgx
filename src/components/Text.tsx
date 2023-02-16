import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface ITextProps extends TypographyProps {
  children: React.ReactNode;
}

export const Text = ({ children, ...rest }: ITextProps) => {
  return (
    <Typography
      sx={{
        fontFamily: "Abel",
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
};
