import React, { useEffect, useRef, useState } from "react";
import { NodeEditor, useRootEngine } from "flume";
import config from "./config";
import "./App.css";
import engine from "./engine";
import { Icon123, IconAbc, IconChecks } from "@tabler/icons-react";
import { Column, Row } from "./components/flex.styles";
import {
  Box,
  Mono,
  NodeContainer,
  Rightbar,
  Section,
  Spacer,
  Tooltip,
  Topnav,
} from "./components/basics.styles";
import { Button, Input } from "./components/interactables.styles";
import { H2, Small } from "./components/typography.styles";
import { Spinner } from "./components/spinner";

const App = () => {
  const [nodes, setNodes] = useState({});
  const [reRenderer, setReRenderer] = useState(0);

  const [scriptData, setScriptData] = useState({});
  useEffect(() => {
    (async () => {
      const id = window.location.pathname.split("/")[1];
      if (id) {
        const res = await fetch(`http://localhost:2000/scripts/${id}`);
        if (res.status === 404) {
        } else {
          const json = await res.json();
          if (!json.content) return console.log("No content");
          console.log(json.id);
          const nodeData = JSON.parse(JSON.parse(json.content));
          setScriptData(json);
          setNodes(nodeData);
          setReRenderer(reRenderer + 1);
        }
      }
    })();
  }, []);

  const [defaultNodes, setDefaultNodes] = useState([
    {
      type: "output",
      x: 190,
      y: -150,
    },
  ]);

  const nodeEditor = useRef(null);
  const [context, setContext] = useState({
    number: { num_output: 1234 },
    string: { str_output: "Hello, World!" },
    boolean: { bool_output: true },
  });

  const data = useRootEngine(nodes, engine, {
    context,
  });
  useEffect(() => {
    console.table(data);
  }, [data]);

  const [savingToServer, setSavingToServer] = useState(false);
  const saveToServer = async () => {
    setSavingToServer(true);
    let res;
    if (!scriptData.id) {
      res = await fetch("http://localhost:2000/scripts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: JSON.stringify(nodeEditor.current.getNodes()),
        }),
      });
    } else {
      res = await fetch(`http://localhost:2000/scripts/${scriptData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: JSON.stringify(nodeEditor.current.getNodes()),
        }),
      });
    }
    const json = await res.json();
    console.log(res);
    setScriptData(json);
    // set url path to the id
    window.history.pushState({}, "", `/${json.id}`);
    console.log("loaded data", json);
    setSavingToServer(false);
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <Column>
        <Topnav>
          <Column gap={10}>
            <Row gap={10}>
              <Input
                type="text"
                placeholder="File Name"
                style={{ maxWidth: 250, fontSize: 16 }}
              />
              <Small>
                {scriptData.id
                  ? `ID: ${scriptData.id}`
                  : `No ID (${JSON.stringify(scriptData)})`}
              </Small>
            </Row>

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
              <Button onClick={saveToServer}>
                {savingToServer ? <Spinner /> : "Save to Server"}
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
              context={context}
            />
          </NodeContainer>
          <Rightbar>
            <Section>
              <H2>Outputs</H2>
              <i>
                <Small>
                  Log information to this section using the "output node"
                </Small>
              </i>
              <Spacer units={1} />
              <Column gap={8}>
                <Box>
                  <Small>Number Output</Small>
                  <Row gap={10}>
                    <Icon123 />
                    <Mono>
                      {data.num_output
                        ? JSON.stringify(
                            data.num_output.number ?? data.num_output,
                            null,
                            2
                          )
                        : "null"}
                    </Mono>
                  </Row>
                </Box>
                <Box>
                  <Small>Boolean Output</Small>
                  <Row gap={10}>
                    <IconChecks />
                    <Mono>
                      {data.bool_output
                        ? JSON.stringify(
                            data.bool_output.boolean ?? data.bool_output,
                            null,
                            2
                          )
                        : "null"}
                    </Mono>
                  </Row>
                </Box>
                <Box>
                  <Small>String Output</Small>
                  <Row gap={10}>
                    <IconAbc />
                    <Mono>
                      {data.str_output
                        ? JSON.stringify(
                            data.str_output.string ?? data.str_output,
                            null,
                            2
                          )
                        : "null"}
                    </Mono>
                  </Row>
                </Box>
              </Column>
            </Section>
          </Rightbar>
        </Row>
      </Column>
    </div>
  );
};

export default App;
