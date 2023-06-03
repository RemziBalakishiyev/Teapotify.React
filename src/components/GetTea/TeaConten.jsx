import React from "react";

const TeaConten = (props) => {
  console.log("Enabled");
  return <p>{props.enable ? "Tea Content" : ""}</p>;
};

export default React.memo(TeaConten);
