import { Box, Typography } from "@mui/material";
import meJpg from "../resources/me.jpg";

function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="h2" sx={{ mt: 0, mb: 3 }}>
        Code Slinger
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          gap: 4,
          width: "100%",
        }}
      >
        <Box
          component="img"
          src={meJpg}
          alt="me"
          sx={{
            maxWidth: "min(50%, 2651px)",
            width: { xs: "100%", md: "min(22rem, 40%)" },
            height: "auto",
            borderRadius: "5%",
          }}
        />
        <Typography
          component="p"
          sx={{
            lineHeight: "1.8",
            mt: 0,
            mb: 0,
            flex: 1,
          }}
        >
          I am a software engineer who works mainly on the front end. A lot of
          my work is focused on application and product development. The
          languages that I spend the most time in are: <b>React and Python.</b>{" "}
          I am currently working as a <b>Sr. Software Engineer</b> at{" "}
          <a href="https://target.com">
            <b>Target</b>
          </a>
          .
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
