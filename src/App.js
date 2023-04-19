import React, { useEffect, useRef, useState } from "react";
import { NodeEditor, useRootEngine } from "flume";
import config from "./config";
import "./app.css";
import engine from "./engine";
console.error = (message) =>
  message.includes("Encountered two children with the same key")
    ? null
    : console.error(message);

const App = () => {
  const [nodes, setNodes] = useState({});
  const [reRenderer, setReRenderer] = useState(true);

  const [defaultNodes, setDefaultNodes] = useState([
    {
      type: "output",
      x: 190,
      y: -150,
    },
  ]);

  const nodeEditor = useRef(null);

  const data = useRootEngine(nodes, engine, {});
  useEffect(() => {
    console.table(data);
  }, [data]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <NodeEditor
        key={reRenderer}
        ref={nodeEditor}
        portTypes={config.portTypes}
        nodeTypes={config.nodeTypes}
        onChange={setNodes}
        nodes={nodes}
        defaultNodes={defaultNodes}
      />
      <div className="float">
        <button
          onClick={() => {
            localStorage.setItem(
              "nodes",
              JSON.stringify(nodeEditor.current.getNodes())
            );
          }}
        >
          Save to LocalStorage
        </button>
        <button
          onClick={() => {
            const items = Object.values(
              JSON.parse(localStorage.getItem("nodes"))
            );

            console.log(items);
            setDefaultNodes(items);
            setReRenderer(!reRenderer);
          }}
        >
          Load from LocalStorage
        </button>
      </div>
    </div>
  );
};

export default App;
