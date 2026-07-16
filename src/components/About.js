import { Box, Typography } from "@mui/material";
import { colors, photos } from "../configs/default";
import meJpg from "../resources/me.jpg";

function About() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
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
            I am a software engineer who works mainly on the front end. A lot
            of my work is focused on application and product development. The
            languages that I spend the most time in are: <b>React and Python.</b>{" "}
            I am currently working as a <b>Sr. Software Engineer</b> at{" "}
            <a href="https://target.com">
              <b>Target</b>
            </a>
            .
          </Typography>
        </Box>
      </Box>

      <Typography component="p" sx={{ mt: 0, mb: 0, lineHeight: "1.6" }}>
        In my free time I love to bike, play games, and yell at my cats. I also
        participate in game jams, and have made a few fun little games (with my
        friend Sam) that you can play in the "play" section of this site. When
        I'm making games, I love to keep improving on my pixel art. See some of
        my art{" "}
        <a href="/play" style={{ color: colors.tertiary }}>
          here
        </a>
        !
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          justifyContent: "space-between",
        }}
      >
        {photos.map((photo, index) => {
          return (
            <Box
              component="img"
              src={photo.src}
              alt={`${index}`}
              sx={{
                display: "block",
                width: "100%",
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
                marginTop: "1rem",
                borderRadius: "5%",
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default About;
