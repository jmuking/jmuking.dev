import React, { useState } from "react";
import { colors } from "../configs/default";

function TabButton({ active, text, style, onClick }) {
  const [hovering, setHovering] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      style={{
        ...{
          background: active
            ? colors.primary
            : hovering
            ? colors.other2
            : colors.dark,
          color: active ? colors.dark : colors.light,
          paddingLeft: "2rem",
          paddingRight: "2rem",
          textAlign: "center",
          border: "0px",
          height: active ? "100%" : "80%",
          fontWeight: active ? "bold" : "normal",
          fontSize: active ? "18px" : "14px",
          cursor: active ? "auto" : "pointer",
          boxShadow: active ? `5px 5px 5px 0 ${colors.dark}` : "none",
        },
        ...style,
      }}
    >
      {text}
    </button>
  );
}

export default TabButton;
