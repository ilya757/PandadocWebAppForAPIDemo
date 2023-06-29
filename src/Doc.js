import React, { useState } from "react";

export default function Doc({ docURI }) {
  return (
    <div className="App">
      <iframe
        style={{
          border: "1px solid #8080801f",
          maxHeight: 1000,
          maxWidth: 1000,
          height: "100%",
          width: "90%"
        }}
        src={docURI}
      />
    </div>
  );
}
