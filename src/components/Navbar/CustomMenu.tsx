import { Menu, PopoverOrigin } from "@mui/material";
import { memo } from "react";

export interface CustomMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose?: () => void;
  children: React.ReactNode;
  transformOrigin?: PopoverOrigin;
}

const CustomMenu = ({
  anchorEl,
  open,
  handleClose,
  children,
  transformOrigin,
}: CustomMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          fontFamily: "Abel",
          borderRadius: 0,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={transformOrigin}
      anchorOrigin={transformOrigin}
    >
      {children}
    </Menu>
  );
};

export default memo(CustomMenu);
