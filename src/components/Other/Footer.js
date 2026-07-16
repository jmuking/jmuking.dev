import { Box, Link, Stack, Typography } from "@mui/material";
import { links, strings } from "../../configs/default";
import resumePdf from "../../resources/Resume.pdf";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "text.primary",
        color: "common.white",
        px: 2,
        py: 2,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, sm: 6 }}
        alignItems="center"
        justifyContent="center"
      >
        <Stack spacing={1} alignItems="center">
          <Link href={resumePdf} underline="hover" color="primary.main">
            {strings.resume}
          </Link>
          <Link
            href={`mailto:${links.email}`}
            underline="hover"
            color="primary.main"
          >
            {strings.email}
          </Link>
        </Stack>

        <Stack spacing={1} alignItems="center">
          <Typography>{strings.byline}</Typography>
          <Typography>{`©${strings.year}`}</Typography>
        </Stack>

        <Stack spacing={1} alignItems="center">
          <Link href={links.github} underline="hover" color="primary.main">
            {strings.github}
          </Link>
          <Link href={links.itch} underline="hover" color="primary.main">
            {strings.itch}
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;
