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
        py: { xs: 1, sm: 2 },
      }}
    >
      <Stack
        direction="row"
        spacing={{ xs: 1.5, sm: 6 }}
        alignItems="center"
        justifyContent="center"
        useFlexGap
        flexWrap="wrap"
        sx={{ width: "100%" }}
      >
        <Stack
          spacing={{ xs: 0.25, sm: 1 }}
          alignItems="center"
          sx={{ minWidth: { xs: "44%", sm: "auto" } }}
        >
          <Link
            href={resumePdf}
            underline="hover"
            color="primary.main"
            sx={{ fontSize: { xs: "0.85rem", sm: "1rem" }, lineHeight: 1.2 }}
          >
            {strings.resume}
          </Link>
          <Link
            href={`mailto:${links.email}`}
            underline="hover"
            color="primary.main"
            sx={{ fontSize: { xs: "0.85rem", sm: "1rem" }, lineHeight: 1.2 }}
          >
            {strings.email}
          </Link>
        </Stack>

        <Stack
          spacing={{ xs: 0.25, sm: 1 }}
          alignItems="center"
          sx={{ minWidth: { xs: "44%", sm: "auto" } }}
        >
          <Link
            href={links.github}
            underline="hover"
            color="primary.main"
            sx={{ fontSize: { xs: "0.85rem", sm: "1rem" }, lineHeight: 1.2 }}
          >
            {strings.github}
          </Link>
          <Link
            href={links.itch}
            underline="hover"
            color="primary.main"
            sx={{ fontSize: { xs: "0.85rem", sm: "1rem" }, lineHeight: 1.2 }}
          >
            {strings.itch}
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;
