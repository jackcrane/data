import React, { useEffect, useRef, useState } from "react";
import { NodeEditor, useRootEngine } from "flume";
import config from "./config";
import "./App.css";
import engine from "./engine";
import {
  Icon123,
  IconAbc,
  IconChecks,
  IconCloud,
  IconCloudDown,
  IconCloudUp,
  IconCode,
  IconCrane,
  IconDeviceFloppy,
  IconDownload,
  IconFile,
  IconPlus,
  IconUpload,
} from "@tabler/icons-react";
import { Column, Row } from "./components/flex.styles";
import {
  Box,
  Hr,
  Mono,
  NodeContainer,
  Rightbar,
  Section,
  Spacer,
  Tooltip,
  Topnav,
} from "./components/basics.styles";
import { Button, Input } from "./components/interactables.styles";
import { H2, H3, Small } from "./components/typography.styles";
import { Spinner } from "./components/spinner";
import { Modal } from "./components/modal.styles";
import { Table, Td, Th, Tr } from "./components/table.styles";
import { useUndo } from "./hooks/useUndo";
import { Dropdown } from "./components/dropdown.styles";

const App = () => {
  const [nodes, setNodes] = useState({});
  const [reRenderer, setReRenderer] = useState(0);

  const [scriptData, setScriptData] = useState({});
  useEffect(() => {
    loadScriptFromUrl();
  }, []);

  async function loadScriptFromUrl() {
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
  }

  const [defaultNodes, setDefaultNodes] = useState([
    {
      type: "output",
      x: 150,
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
          name: scriptData.name,
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
          name: scriptData.name,
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

  const [contextBuilderOpen, setContextBuilderOpen] = useState(false);
  const openContextBuilder = () => {
    setContextBuilderOpen(true);
  };
  const closeContextBuilder = () => {
    setContextBuilderOpen(false);
  };

  const [fileFinderOpen, setFileFinderOpen] = useState(false);
  const openFileFinder = () => {
    setFileFinderOpen(true);
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
                style={{ maxWidth: 250 }}
                onInput={(e) => {
                  setScriptData({ ...scriptData, name: e.target.value });
                }}
                value={scriptData.name || ""}
              />
              <Small>{scriptData.id ? `ID: ${scriptData.id}` : `No ID`}</Small>
            </Row>

            <Row gap={10}>
              <Dropdown label={"File"} icon={<IconFile size={12} />}>
                <Button
                  onClick={() => {
                    window.history.pushState({}, "", "/");
                    setScriptData({});
                    setNodes({});
                    setReRenderer(reRenderer + 1);
                  }}
                >
                  <Row gap={5}>
                    <IconPlus size={12} />
                    New
                  </Row>
                </Button>
                <Button
                  onClick={() => {
                    localStorage.setItem(
                      "nodes",
                      JSON.stringify(nodeEditor.current.getNodes())
                    );
                  }}
                >
                  <Row gap={5}>
                    <IconDownload size={12} />
                    Save to LocalStorage
                  </Row>
                </Button>
                <Button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to load from LocalStorage? You will lose any unsaved changes"
                      )
                    ) {
                      const items = JSON.parse(localStorage.getItem("nodes"));
                      setNodes(items);
                      setReRenderer(reRenderer + 1);
                    }
                  }}
                >
                  <Row gap={5}>
                    <IconUpload size={12} />
                    Load from LocalStorage
                  </Row>
                </Button>
              </Dropdown>
              <Dropdown label={"Server"} icon={<IconCloud size={12} />}>
                <Button onClick={saveToServer}>
                  {savingToServer ? (
                    <Spinner />
                  ) : (
                    <Row gap={5}>
                      <IconCloudUp size={12} />
                      Save to Server
                    </Row>
                  )}
                </Button>
                <Button onClick={openFileFinder}>
                  <Row gap={5}>
                    <IconCloudDown size={12} />
                    Load from Server
                  </Row>
                </Button>
              </Dropdown>
              <Dropdown label={"Script"} icon={<IconCode size={12} />}>
                <Button onClick={openContextBuilder}>
                  <Row gap={5}>
                    <IconCrane size={12} />
                    Open Context Builder
                  </Row>
                </Button>
              </Dropdown>
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
      <ContextBuilder
        contextBuilderOpen={contextBuilderOpen}
        closeContextBuilder={closeContextBuilder}
        globalContext={context}
        setGlobalContext={setContext}
      />
      <FileFinder
        fileFinderOpen={fileFinderOpen}
        closeFileFinder={() => setFileFinderOpen(false)}
        loadScriptFromUrl={loadScriptFromUrl}
      />
    </div>
  );
};

export default App;

const ifNumber = (value) => {
  if (value[value.length - 1] === ".") return false;
  if (value === "") return false;
  if (typeof value === "number") return true;
  if (typeof value === "string" && !isNaN(value)) return true;
};
const ifString = (value) => {
  if (value === "") return true;
  if (typeof value === "string") return true;
};
const ifBoolean = (value) => {
  if (value === "") return false;
  if (value === "true" || value === "false") return true;
  if (typeof value === "boolean") return true;
};

const ContextBuilder = ({
  contextBuilderOpen,
  closeContextBuilder,
  globalContext,
  setGlobalContext,
}) => {
  const [context, setContext] = useState(globalContext);
  useEffect(() => {
    setContext(globalContext);
  }, [globalContext]);
  useEffect(() => {
    setGlobalContext(context);
  }, [context]);
  const inputRefs = useRef({});
  return (
    <Modal
      open={contextBuilderOpen}
      onClose={closeContextBuilder}
      icon={<IconCrane size={"300px"} />}
    >
      <H2>Context Builder</H2>
      <Hr />
      <Small>
        Context is information that will be passed into your script when it is
        being run non-interactively. You will be able to pass in context when
        you trigger your script from the API or from integrations with other
        applications.
      </Small>
      <Hr />
      <Table>
        <Tr>
          <Th>Key</Th>
          <Th>Default Value</Th>
          <Th>Type</Th>
        </Tr>
        {Object.keys(context).map((key, i) => {
          const value = Object.values(context[key])[0];
          return (
            <Tr key={i}>
              <Td>
                <Input
                  type="text"
                  value={key}
                  ref={(el) => (inputRefs[i] = el)}
                  onChange={(e) => {
                    const newContext = { ...context };
                    delete newContext[key];
                    newContext[e.target.value] = context[key];
                    setContext(newContext);
                    inputRefs[i].focus();
                  }}
                  style={{
                    width: 50,
                  }}
                />
              </Td>
              <Td>
                <Input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    const newContext = { ...context };
                    let newValue;
                    let dataType = "str_output";
                    if (ifNumber(e.target.value)) {
                      newValue = parseFloat(e.target.value);
                      dataType = "num_output";
                    } else if (ifBoolean(e.target.value)) {
                      newValue = e.target.value === "true";
                      dataType = "bool_output";
                    } else {
                      newValue = e.target.value;
                    }
                    newContext[key] = {
                      [dataType]: newValue,
                    };
                    setContext(newContext);
                  }}
                />
              </Td>
              <Td>{typeof value}</Td>
            </Tr>
          );
        })}
      </Table>
      <Button
        onClick={() => {
          const newContext = { ...context };
          newContext[""] = { str_output: "" };
          setContext(newContext);
        }}
      >
        Add new key
      </Button>
      <Hr />
      <H3>Data Types</H3>
      <Spacer units={1} />
      <Table>
        <Tr>
          <Th>Type</Th>
          <Th>Description</Th>
          <Th>Example</Th>
        </Tr>
        <Tr>
          <Td>Number</Td>
          <Td>Any numerical value, can be whole numbers or decimals</Td>
          <Td>1234.56</Td>
        </Tr>
        <Tr>
          <Td>String</Td>
          <Td>Any text value</Td>
          <Td>Hello, World!</Td>
        </Tr>
        <Tr>
          <Td>Boolean</Td>
          <Td>True or False</Td>
          <Td>true</Td>
        </Tr>
      </Table>
      <Small>Data types are automatically inferred from your data.</Small>
    </Modal>
  );
};

const FileFinder = ({ fileFinderOpen, closeFileFinder, loadScriptFromUrl }) => {
  const [scripts, setScripts] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:2000/scripts");
      const json = await res.json();
      setScripts(json);
    })();
  }, []);
  return (
    <Modal
      open={fileFinderOpen}
      onClose={closeFileFinder}
      icon={<IconCloud size={"300px"} />}
    >
      <H2>File Finder</H2>
      <Hr />
      <Table>
        <Tr>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Size</Th>
          <Th>Nodes</Th>
          <Th>Actions</Th>
        </Tr>
        {scripts.map((script) => {
          return (
            <Tr key={script.id}>
              <Td>{ellipsize(script.id)}</Td>
              <Td>{script.name}</Td>
              <Td>
                {
                  new Blob([JSON.stringify(script.content, null, 2)], {
                    type: "application/json",
                  }).size
                }{" "}
                bytes
              </Td>
              <Td>
                {Object.values(JSON.parse(JSON.parse(script.content))).length}
              </Td>
              <Td>
                <Button
                  onClick={() => {
                    window.history.pushState({}, "", `/${script.id}`);
                    loadScriptFromUrl();
                    closeFileFinder();
                  }}
                >
                  Open
                </Button>
              </Td>
            </Tr>
          );
        })}
      </Table>
    </Modal>
  );
};

const ellipsize = (str, length = 12) => {
  if (str.length > length) {
    return str.slice(0, length) + "...";
  }
  return str;
};
