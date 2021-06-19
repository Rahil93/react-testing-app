import React from "react";

function TextError(props) {
  return (
    <div data-testid={`${props.testid}Error`} className="error">
      {props.children}
    </div>
  );
}

export default TextError;
