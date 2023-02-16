import { Link, Typography } from "@mui/material";

const Logo = ({ mode }: { mode?: boolean }) => {
  return (
    <Typography
      variant="h6"
      component={Link}
      sx={{
        fontFamily: "Akronim",
        fontWeight: 900,
        letterSpacing: 2.5,
        color: mode ? "#333" : "#fff",
        width: "fit-content",
        marginRight: "auto",
        transition: "all 0.3s ease-in-out",
      }}
      aria-label="SvgX"
      underline="none"
      href="/"
      data-testid="logo"
    >
      SvgX
    </Typography>
  );
};

export default Logo;
