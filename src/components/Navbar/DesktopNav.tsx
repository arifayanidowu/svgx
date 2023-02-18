import { useCallback, useState } from "react";
import {
  Box,
  FormControlLabel,
  IconButton,
  Switch,
  Menu,
  MenuItem,
  styled,
  Tooltip,
  Link,
} from "@mui/material";
import { ArrowDropDown, Cached, GitHub, Lightbulb } from "@mui/icons-material";
import { CustomButton } from "../CustomButton";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  onChangeFramework,
  onToggleSingleQuote,
  onToggleMode,
} from "../../state/slices/appSlice";

const label = { inputProps: { "aria-label": "Size switch demo" } };

export const StyledMenuItem = styled(MenuItem)({
  fontFamily: "Abel",
});

export const GithubLink = () => (
  <IconButton
    color="inherit"
    LinkComponent={Link}
    aria-label="Github Repository Link"
    href="https://github.com/stizzle123/svgx"
    target="_blank"
  >
    <GitHub />
  </IconButton>
);

const css = (animate: boolean) => ({
  animation: animate ? "spin 1s linear infinite" : "none",
  "@keyframes spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
});

const DesktopNav = () => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [animate, setAnimate] = useState(false);
  const { framework, isSingleQuote, isLightMode } = useAppSelector(
    (state) => state.app
  );
  const toggle = useCallback(() => dispatch(onToggleSingleQuote()), []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangeFramework = (framework: "react" | "react-native") => {
    dispatch(onChangeFramework(framework));
    setAnchorEl(null);
  };

  const reload = () => {
    setAnimate(true);
    setTimeout(() => {
      window.location.reload();
      setAnimate(false);
    }, 2000);
  };

  return (
    <Box
      sx={{
        gap: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
      data-testid="DesktopNav"
    >
      <Box>
        <Tooltip title="Reload Page" arrow placement="left">
          <IconButton color="success" onClick={reload}>
            <Cached
              color="inherit"
              sx={{
                ...css(animate),
              }}
            />
          </IconButton>
        </Tooltip>
        <FormControlLabel
          control={<Switch {...label} size="small" color="warning" />}
          label="single quotes"
          labelPlacement="start"
          aria-label="single quotes"
          sx={{
            "& > .MuiTypography-root.MuiTypography-body1.MuiFormControlLabel-label":
              {
                fontSize: 9,
                fontFamily: "Abel",
                textTransform: "uppercase",
              },
          }}
          checked={isSingleQuote}
          onChange={toggle}
          data-testid="single-quote-switch"
        />
      </Box>

      <Box>
        <CustomButton
          variant="outlined"
          color="inherit"
          size="small"
          sx={{
            borderRadius: 0,
          }}
          onClick={handleClick}
          endIcon={<ArrowDropDown />}
          data-testid="framework-button"
        >
          {framework === "react" ? "React" : "React Native"}
        </CustomButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          sx={{
            "& .MuiPaper-root": {
              borderRadius: 0,
            },
          }}
        >
          <StyledMenuItem onClick={() => handleChangeFramework("react")}>
            React
          </StyledMenuItem>
          <StyledMenuItem onClick={() => handleChangeFramework("react-native")}>
            React Native
          </StyledMenuItem>
        </Menu>
      </Box>
      <Box>
        <GithubLink />
        <Tooltip title="toggle theme" arrow>
          <IconButton
            color="info"
            onClick={() => {
              dispatch(onToggleMode());
            }}
            data-testid="toggle-theme"
          >
            <Lightbulb
              sx={{
                color: isLightMode ? "#aaa" : "#ffe700",
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default DesktopNav;
