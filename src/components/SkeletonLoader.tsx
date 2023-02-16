import { Box, Skeleton } from "@mui/material";

export const SkeletonLoader = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        zIndex: 3,
        top: 20,
        padding: 2,
        overflow: "hidden",
      }}
    >
      <Skeleton height={30} width="100%" sx={{ ml: 5 }} />
      <Skeleton height={30} width="100%" sx={{ ml: 10, my: 1 }} />
      <Skeleton height={30} width="100%" sx={{ ml: 15 }} />
      <Skeleton height={30} width="100%" sx={{ ml: 10, my: 1 }} />
      <Skeleton height={30} width="100%" sx={{ ml: 6 }} />
      <Skeleton height={30} width="8%" sx={{ ml: 6, mt: 5 }} />
    </Box>
  );
};
