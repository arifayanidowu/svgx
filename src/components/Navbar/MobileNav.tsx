import { Box, IconButton } from "@mui/material";
import { Lightbulb } from "@mui/icons-material";
import { GithubLink } from "./DesktopNav";
import MobileDropdown from "./MobileDropdown";
import { CustomMenuProps } from "./CustomMenu";
import ReactIcon from "../icons/ReactIcon";

interface IMobileNav
  extends Pick<CustomMenuProps, "anchorEl" | "open" | "handleClose"> {
  toggleMenu: (event: React.MouseEvent<HTMLElement>) => void;
  toggleMode: () => void;
  isLightMode: boolean;
}

const MobileNav = ({
  open,
  handleClose,
  anchorEl,
  toggleMenu,
  toggleMode,
  isLightMode,
}: IMobileNav) => {
  return (
    <Box data-testid="MobileNav">
      <GithubLink />
      <IconButton onClick={toggleMenu} color="inherit">
        <ReactIcon color="warning" fontSize="medium" />
      </IconButton>
      <MobileDropdown {...{ open, handleClose, anchorEl }} />
      <IconButton color="info" onClick={toggleMode}>
        <Lightbulb
          sx={{
            color: isLightMode ? "#aaa" : "#ffe700",
          }}
        />
      </IconButton>
    </Box>
  );
};

export default MobileNav;
