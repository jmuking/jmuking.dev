import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { links } from "../../configs/default";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import Loading from "../Other/Loading";

function CodeContainer() {
  const location = useLocation();
  const [codeContent, setCodeContent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let path = location.pathname;
    if (path === "/") path = "/home";

    const lowerCase = path.slice(0, 2);
    const upperCase = lowerCase.toUpperCase();
    const truePath = path.replace(lowerCase, upperCase);

    setLoading(true);
    fetch(`${links.gitApi}${truePath}.js`)
      .then(
        (response) => response.json(),
        (error) => {
          console.error(error);
        },
      )
      .then(
        (data) => {
          const buff = Buffer.from(data.content, "base64");
          setCodeContent(buff.toString("utf-8"));
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
        },
      );
  }, [location]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        overflowX: "hidden",
        p: 2,
        bgcolor: "background.paper",
        boxSizing: "border-box",
      }}
    >
      <Loading show={loading} />
      {!loading && (
        <SyntaxHighlighter language="javascript" style={materialDark}>
          {codeContent}
        </SyntaxHighlighter>
      )}
    </Box>
  );
}

export default CodeContainer;
