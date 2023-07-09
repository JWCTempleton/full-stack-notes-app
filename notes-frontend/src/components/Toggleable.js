import { useState, forwardRef, useImperativeHandle } from "react";
import { Button } from "@mui/material";

const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // The function that creates the component is wrapped inside of a forwardRef function call. This way the component can access the ref that is assigned to it.
  // The component uses the useImperativeHandle hook to make its toggleVisibility function available outside of the component.
  // hide the form by calling noteFormRef.current.toggleVisibility() after a new note has been created
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="contained" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  );
});

export default Toggleable;
