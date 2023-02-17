import { Box } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";

interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: ILayoutProps) => {
  return (
    <Box sx={{ width: "100%", overflowY: "hidden" }} data-testid="layout">
      <Navbar />
      {children}
    </Box>
  );
};
