import { Box } from "@mui/material";
import loadingGif from "../../resources/loading.gif";

function Loading({ show }) {
  return (
    <Box
      component="img"
      src={loadingGif}
      alt="loading"
      sx={{
        display: show ? "block" : "none",
        justifySelf: "center",
        alignSelf: "center",
        width: 100,
        height: 100,
      }}
    />
  );
}

export default Loading;
