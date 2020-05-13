import React from "react";

const style = {
  backgroundColor: "#333",
  height: "50vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
};

const Placeholder = () => {
  return (
    <div style={style}>
      <p>
        Both news and charts will be displayed here depending on the url. by
        default it will start with the charts.
      </p>
    </div>
  );
};

export default Placeholder;
