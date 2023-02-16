import React from "react";
import { Button, ButtonProps, styled } from "@mui/material";

interface IButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const StyledButton = styled(Button)({
  textTransform: "none",
  fontFamily: ["Abel !important", "sans-serif"].join(","),
  transition: "all 0.3s ease",
});

export const CustomButton = ({ children, ...rest }: IButtonProps) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};
