import { Box, IconButton } from "@mui/material";
import { GithubLink } from "./DesktopNav";
import { Lightbulb } from "@mui/icons-material";
import MobileDropdown from "./MobileDropdown";
import ReactIcon from "../icons/ReactIcon";

interface IMobileNav {
  open: boolean;
  handleClose: () => void;
  anchorEl: HTMLElement | null;
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
    <Box>
      <GithubLink />
      <IconButton onClick={toggleMenu} color="inherit">
        <ReactIcon color="warning" fontSize="medium" />
      </IconButton>
      <MobileDropdown {...{ open, handleClose, anchorEl }} />
      <IconButton color="info" onClick={toggleMode}>
        <Lightbulb
          sx={{
            color: isLightMode ? "#aaa" : "orange",
          }}
        />
      </IconButton>
    </Box>
  );
};

export default MobileNav;
