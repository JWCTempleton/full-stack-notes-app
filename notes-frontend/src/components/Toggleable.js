import { useState } from "react";
import { Button, Typography } from "@mui/material";

const Toggleable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" onClick={toggleVisibility}>
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button variant="contained" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  );
};

export default Toggleable;
