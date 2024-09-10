// import React and ReactDOM from node_modules
// these are global exports from index.js of react and react-dom folder from node_modules.

import React from "react";
import ReactDOM from "react-dom/client";

const div = React.createElement("div", { id: "parent" }, [
  React.createElement("p", { id: "child1" }, "I'm child 1"),
  React.createElement("p", { id: "child2" }, "I'm child 2"),
]);

const reactRoot = ReactDOM.createRoot(document.getElementById("root"));

reactRoot.render(div);
