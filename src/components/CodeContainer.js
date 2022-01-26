import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { colors, links } from "../configs/default";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";

const CodeContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 2rem;
`;

function CodeContainer() {
  const location = useLocation();
  const [codeContent, setCodeContent] = useState(null);

  useEffect(() => {
    let path = location.pathname;
    if (path === "/") path = "/home";

    const lowerCase = path.slice(0, 2);
    const upperCase = lowerCase.toUpperCase();
    const truePath = path.replace(lowerCase, upperCase);

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
        },
        (error) => {
          console.error(error);
        }
      );
  }, [location]);

  return (
    <CodeContent>
      <div
        style={{
          backgroundColor: colors.dark,
          color: colors.light,
          padding: "1rem",
          whiteSpace: "pre",
        }}
      >
        {codeContent}
      </div>
    </CodeContent>
  );
}

export default CodeContainer;