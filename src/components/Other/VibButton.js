import React, { useState, useEffect } from "react";

function VibButton({
  src,
  toggledSrc,
  onToggled = (toggled) => {},
  style = {},
  initToggled = false,
}) {
  const [toggled, setToggled] = useState(initToggled);

  useEffect(() => {
    setToggled(initToggled);
  }, [initToggled]);

  return (
    <img
      src={toggled ? toggledSrc : src}
      alt="inspect"
      style={{ ...{ cursor: "pointer" }, ...style }}
      onClick={() => {
        try {
          navigator.vibrate(10);
        } catch {
          /*do nothing*/
        }

        const newToggled = !toggled;
        onToggled(newToggled);
        setToggled(newToggled);
      }}
    ></img>
  );
}

export default VibButton;
