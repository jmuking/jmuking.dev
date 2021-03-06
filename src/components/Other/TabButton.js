import React, { useState } from "react";
import { colors, font } from "../../configs/default";

function TabButton({ active, text, onClick, isMobile }) {
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
        background: active
          ? colors.primary
          : hovering
          ? colors.other2
          : colors.dark,
        color: active ? colors.dark : "white",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        textAlign: "center",
        border: `1px solid ${colors.dark}`,
        height: active && !isMobile ? "100%" : !isMobile ? "80%" : "4rem",
        fontWeight: active ? "bold" : "normal",
        fontSize: active ? "18px" : "14px",
        cursor: active ? "auto" : "pointer",
        borderTop: isMobile ? `2px solid ${colors.dark}` : "0",
        fontFamily: font,
        zIndex: 100,
        margin: 0,
        boxShadow: active
          ? !isMobile
            ? `3px 3px 2px 0 ${colors.dark}`
            : `0px 3px 2px 0 ${colors.dark}`
          : "none",
      }}
    >
      {text}
    </button>
  );
}

export default TabButton;
