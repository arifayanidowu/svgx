import { useAppDispatch } from "../../state/hooks";
import { onChangeFramework } from "../../state/slices/appSlice";
import CustomMenu, { CustomMenuProps } from "./CustomMenu";
import { StyledMenuItem } from "./DesktopNav";

const css = {
  fontSize: 15,
  "&:hover": {
    backgroundColor: "#fefefe",
  },
};

const MobileDropdown = ({
  anchorEl,
  open,
  handleClose,
}: Omit<CustomMenuProps, "children">) => {
  const dispatch = useAppDispatch();

  const handleChangeFramework = (framework: "react" | "react-native") => {
    dispatch(onChangeFramework(framework));
    handleClose!();
  };

  return (
    <CustomMenu
      anchorEl={anchorEl}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      open={open}
      handleClose={handleClose}
    >
      <StyledMenuItem
        sx={{
          ...css,
        }}
        onClick={() => handleChangeFramework("react")}
      >
        React
      </StyledMenuItem>
      <StyledMenuItem
        sx={{ ...css }}
        onClick={() => handleChangeFramework("react-native")}
      >
        React Native
      </StyledMenuItem>
    </CustomMenu>
  );
};

export default MobileDropdown;
