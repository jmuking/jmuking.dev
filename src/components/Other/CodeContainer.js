import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { colors, links } from "../../configs/default";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import Loading from "../Other/Loading";

const CodeContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 2rem;
  flex-grow: 1;
  background: ${colors.light};
  z-index: 1;
`;

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
        }
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
        }
      );
  }, [location]);

  return (
    <CodeContent>
      <Loading show={loading} />
      {!loading && (
        <SyntaxHighlighter language="javascript" style={materialDark}>
          {codeContent}
        </SyntaxHighlighter>
      )}
    </CodeContent>
  );
}

export default CodeContainer;
