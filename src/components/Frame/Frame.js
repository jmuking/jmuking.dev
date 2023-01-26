import React, { useEffect, useRef, useState } from "react";
import Loading from "../Other/Loading";

function Frame({
  src,
  title,
  infoText = "",
  style = {},
  id = "",
  fullHeight = false,
  onLoaded = () => {},
}) {
  const frame = useRef(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (frame.current) {
      frame.current.addEventListener("load", () => {
        setLoading(false);
        onLoaded();
      });
    }
  }, [frame]);

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: fullHeight ? "100vh" : "100%",
      }}
    >
      <Loading show={loading}></Loading>
      <iframe
        id={id}
        ref={frame}
        style={{ ...{ flexGrow: 1, display: loading ? "none" : "" }, ...style }}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen=""
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
      ></iframe>
      <p style={{ textAlign: "left", fontSize: 10 }}>{infoText}</p>
    </div>
  );
}

export default Frame;
