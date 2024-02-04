import React, { useEffect, useRef, useState } from "react";
import { NodeEditor, useRootEngine } from "flume";
import config from "./config";
import "./App.css";
import engine from "./engine";
import { Column, Row } from "./components/flex.styles";
import { NodeContainer, Rightbar, Topnav } from "./components/basics.styles";
import { Button, Input } from "./components/interactables.styles";
console.error = (message) =>
  message.includes("Encountered two children with the same key")
    ? null
    : console.error(message);

const App = () => {
  const [nodes, setNodes] = useState({});
  const [reRenderer, setReRenderer] = useState(0);

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
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <Column>
        <Topnav>
          <Column gap={10}>
            <Input
              type="text"
              placeholder="File Name"
              style={{ maxWidth: 250, fontSize: 16 }}
            />
            <Row gap={10}>
              <Button
                onClick={() => {
                  localStorage.setItem(
                    "nodes",
                    JSON.stringify(nodeEditor.current.getNodes())
                  );
                }}
              >
                Save to LocalStorage
              </Button>
              <Button
                onClick={() => {
                  const items = JSON.parse(localStorage.getItem("nodes"));
                  setNodes(items);
                  setReRenderer(reRenderer + 1);
                }}
              >
                Load from LocalStorage
              </Button>
            </Row>
          </Column>
        </Topnav>
        <Row>
          <NodeContainer>
            <NodeEditor
              key={reRenderer}
              ref={nodeEditor}
              portTypes={config.portTypes}
              nodeTypes={config.nodeTypes}
              onChange={setNodes}
              nodes={nodes}
              defaultNodes={defaultNodes}
            />
          </NodeContainer>
          <Rightbar>asdf</Rightbar>
        </Row>
      </Column>
    </div>
  );
};

export default App;
