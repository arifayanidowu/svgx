import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch } from "../state/hooks";
import { onLoad, onLoaded } from "../state/slices/appSlice";
import Navbar from "./Navbar";

interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: ILayoutProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onLoad());
    setTimeout(() => {
      dispatch(onLoaded());
    }, 1500);
  }, [dispatch, onLoad]);

  return (
    <Box sx={{ width: "100%", overflowY: "hidden" }} data-testid="Layout">
      <Navbar />
      {children}
    </Box>
  );
};
