import { useState } from "react";
import { AppBar, Toolbar, useMediaQuery } from "@mui/material";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { onToggleMode } from "../../state/slices/appSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const matches = useMediaQuery("(min-width:600px)");
  const { isLightMode } = useAppSelector((state) => state.app);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const toggleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: isLightMode ? "#dcdcdc" : "#0a3e4b",
          minWidth: window.innerWidth,
          width: "100%",
        }}
        elevation={0}
        color={isLightMode ? "transparent" : "primary"}
        aria-label="Main Navigation"
        data-testid="navbar"
      >
        <Toolbar
          sx={{
            minHeight: 46,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Logo mode={isLightMode} />
          {!matches ? (
            <MobileNav
              {...{
                open,
                handleClose,
                anchorEl,
                toggleMenu,
                isLightMode: isLightMode!,
                toggleMode: () => {
                  dispatch(onToggleMode());
                },
              }}
            />
          ) : (
            <DesktopNav />
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
