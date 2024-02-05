import { FlumeConfig, Colors, Controls } from "flume";

const config = new FlumeConfig();
config
  .addPortType({
    type: "string",
    name: "string",
    label: "Text",
    color: Colors.red,
    controls: [
      Controls.text({
        name: "string",
        label: "Text",
      }),
    ],
  })
  .addPortType({
    type: "number",
    name: "number",
    label: "Number",
    color: Colors.yellow,
    controls: [
      Controls.number({
        name: "number",
        label: "Number",
      }),
    ],
  })
  .addPortType({
    type: "boolean",
    name: "boolean",
    label: "Boolean",
    color: Colors.green,
    controls: [
      Controls.checkbox({
        name: "boolean",
        label: "Boolean",
      }),
    ],
  })
  .addPortType({
    type: "object",
    name: "object",
    label: "Object",
    color: Colors.blue,
    controls: [
      Controls.text({
        name: "object",
        label: "Object",
      }),
    ],
  })
  .addPortType({
    type: "debug",
    name: "debug",
    label: "Debug",
    acceptTypes: ["number", "string", "boolean"],
    color: Colors.pink,
    controls: [
      Controls.text({
        name: "debug",
        label: "Debug",
      }),
    ],
  })
  .addPortType({
    type: "numberOrString",
    name: "numberOrString",
    label: "Number or String",
    color: Colors.purple,
    acceptTypes: ["number", "string"],
    controls: [
      Controls.text({
        name: "numberOrString",
        label: "Number or String",
      }),
    ],
  })
  .addRootNodeType({
    type: "output",
    label: "Output",
    initialWidth: 170,
    inputs: (ports) => [
      ports.string({
        name: "str_output",
        label: "String Output",
      }),
      ports.boolean({
        name: "bool_output",
        label: "Boolean Output",
      }),
      ports.number({
        name: "num_output",
        label: "Number Output",
      }),
    ],
  })
  .addNodeType({
    type: "debug",
    label: "Debug",
    description: "Debug",
    initialWidth: 140,
    inputs: (ports) => [
      ports.debug({
        name: "input",
        label: "Input",
      }),
    ],
    outputs: () => [],
    component: (props) => {
      return <div>{JSON.stringify(props)}</div>;
    },
  })
  .addNodeType({
    type: "if",
    label: "If Switch (String)",
    description: "Changes output based on a condition",
    initialWidth: 140,
    inputs: (ports) => [
      ports.boolean({
        name: "condition",
        label: "Condition",
      }),
      ports.string({
        name: "true",
        label: "True",
      }),
      ports.string({
        name: "false",
        label: "False",
      }),
    ],
    outputs: (ports) => [ports.string()],
  })
  .addNodeType({
    type: "string",
    label: "String",
    description: "Outputs a string of text",
    inputs: (ports) => [ports.string()],
    outputs: (ports) => [ports.string()],
  })
  .addNodeType({
    type: "number",
    label: "Number",
    description: "Outputs a number",
    inputs: (ports) => [ports.number()],
    outputs: (ports) => [ports.number()],
  })
  .addNodeType({
    type: "boolean",
    label: "Boolean",
    description: "Outputs a boolean",
    inputs: (ports) => [ports.boolean()],
    outputs: (ports) => [ports.boolean()],
  })
  .addNodeType({
    type: "reverseBoolean",
    label: "Not/Reverse Boolean (Bang)",
    description: "Reverses a true/false value",
    initialWidth: 140,
    inputs: (ports) => [ports.boolean()],
    outputs: (ports) => [ports.boolean()],
  })
  .addNodeType({
    type: "boolToString",
    label: "Boolean To String",
    description: "Turns booleans into text [true/false]",
    initialWidth: 140,
    inputs: (ports) => [ports.boolean()],
    outputs: (ports) => [ports.string()],
  })
  .addNodeType({
    type: "numberToString",
    label: "Number To String",
    description: "Turns numbers into text",
    initialWidth: 140,
    inputs: (ports) => [ports.number()],
    outputs: (ports) => [ports.string()],
  })
  .addNodeType({
    type: "joinStrings",
    label: "Join Strings",
    description: "Joins two strings of text",
    initialWidth: 140,
    inputs: (ports) => [
      ports.string({
        name: "string1",
        label: "String 1",
      }),
      ports.string({
        name: "string2",
        label: "Connector",
      }),
      ports.string({
        name: "string3",
        label: "String 2",
      }),
    ],
    outputs: (ports) => [ports.string()],
  })
  .addNodeType({
    type: "includes",
    label: "Includes",
    description: "Checks if a string includes another string",
    initialWidth: 140,
    inputs: (ports) => [
      ports.string({
        name: "string",
        label: "Text",
      }),
      ports.string({
        name: "includes",
        label: "Query",
      }),
    ],
    outputs: (ports) => [ports.boolean()],
  })
  .addNodeType({
    type: "and",
    label: "And",
    description: "Checks if two booleans are true",
    initialWidth: 140,
    inputs: (ports) => [
      ports.boolean({
        name: "bool1",
        label: "Boolean 1",
      }),
      ports.boolean({
        name: "bool2",
        label: "Boolean 2",
      }),
    ],
    outputs: (ports) => [ports.boolean()],
  })
  .addNodeType({
    type: "or",
    label: "Or",
    description: "Checks if one of two booleans is true",
    initialWidth: 140,
    inputs: (ports) => [
      ports.boolean({
        name: "bool1",
        label: "Boolean 1",
      }),
      ports.boolean({
        name: "bool2",
        label: "Boolean 2",
      }),
    ],
    outputs: (ports) => [ports.boolean()],
  })
  .addNodeType({
    type: "addNumbers",
    label: "Add Numbers",
    description: "Adds two numbers together",
    initialWidth: 140,
    inputs: (ports) => [
      ports.number({
        name: "num1",
        label: "Number 1",
      }),
      ports.number({
        name: "num2",
        label: "Number 2",
      }),
    ],
    outputs: (ports) => [ports.number()],
  })
  .addNodeType({
    type: "subtractNumbers",
    label: "Subtract Numbers",
    description: "Subtracts two numbers",
    initialWidth: 140,
    inputs: (ports) => [
      ports.number({
        name: "num1",
        label: "Number 1",
      }),
      ports.number({
        name: "num2",
        label: "Number 2",
      }),
    ],
    outputs: (ports) => [ports.number()],
  })
  .addNodeType({
    type: "multiplyNumbers",
    label: "Multiply Numbers",
    description: "Multiplies two numbers",
    initialWidth: 140,
    inputs: (ports) => [
      ports.number({
        name: "num1",
        label: "Number 1",
      }),
      ports.number({
        name: "num2",
        label: "Number 2",
      }),
    ],
    outputs: (ports) => [ports.number()],
  })
  .addNodeType({
    type: "divideNumbers",
    label: "Divide Numbers",
    description: "Divides two numbers",
    initialWidth: 140,
    inputs: (ports) => [
      ports.number({
        name: "num1",
        label: "Number 1",
      }),
      ports.number({
        name: "num2",
        label: "Number 2",
      }),
    ],
    outputs: (ports) => [ports.number()],
  })
  .addNodeType({
    type: "moduloNumbers",
    label: "Modulo Numbers (Remainder)",
    description: "Modulos two numbers",
    initialWidth: 140,
    inputs: (ports) => [
      ports.number({
        name: "num1",
        label: "Number 1",
      }),
      ports.number({
        name: "num2",
        label: "Number 2",
      }),
    ],
    outputs: (ports) => [ports.number()],
  })
  .addNodeType({
    type: "greaterThan",
    label: "Greater Than",
    description: "Checks if a number is greater than another number",
    initialWidth: 140,
    inputs: (ports) => [
      ports.number({
        name: "num1",
        label: "Number 1",
      }),
      ports.number({
        name: "num2",
        label: "Number 2",
      }),
    ],
    outputs: (ports) => [ports.boolean()],
  })
  .addNodeType({
    type: "lessThan",
    label: "Less Than",
    description: "Checks if a number is less than another number",
    initialWidth: 140,
    inputs: (ports) => [
      ports.number({
        name: "num1",
        label: "Number 1",
      }),
      ports.number({
        name: "num2",
        label: "Number 2",
      }),
    ],
    outputs: (ports) => [ports.boolean()],
  })
  .addNodeType({
    type: "greaterThanOrEqual",
    label: "Greater Than Or Equal",
    description:
      "Checks if a number is greater than or equal to another number",
    initialWidth: 140,
    inputs: (ports) => [
      ports.number({
        name: "num1",
        label: "Number 1",
      }),
      ports.number({
        name: "num2",
        label: "Number 2",
      }),
    ],
    outputs: (ports) => [ports.boolean()],
  })
  .addNodeType({
    type: "lessThanOrEqual",
    label: "Less Than Or Equal",
    description: "Checks if a number is less than or equal to another number",
    initialWidth: 140,
    inputs: (ports) => [
      ports.number({
        name: "num1",
        label: "Number 1",
      }),
      ports.number({
        name: "num2",
        label: "Number 2",
      }),
    ],
    outputs: (ports) => [ports.boolean()],
  })
  .addNodeType({
    type: "numberEqual",
    label: "Number Equal",
    description: "Checks if two values are equal",
    initialWidth: 140,
    inputs: (ports) => [
      ports.number({
        name: "value1",
        label: "Value 1",
      }),
      ports.number({
        name: "value2",
        label: "Value 2",
      }),
    ],
    outputs: (ports) => [ports.boolean()],
  })
  .addNodeType({
    type: "stringEqual",
    label: "String Equal",
    description: "Checks if two values are equal",
    initialWidth: 140,
    inputs: (ports) => [
      ports.string({
        name: "value1",
        label: "Value 1",
      }),
      ports.string({
        name: "value2",
        label: "Value 2",
      }),
    ],
    outputs: (ports) => [ports.boolean()],
  })
  .addNodeType({
    type: "replaceString",
    label: "Replace String",
    description: "Replaces text in a string",
    initialWidth: 140,
    inputs: (ports) => [
      ports.string({
        name: "string",
        label: "Original String",
      }),
      ports.string({
        name: "replace",
        label: "Replace",
      }),
      ports.string({
        name: "with",
        label: "With",
      }),
    ],
    outputs: (ports) => [ports.string()],
  })
  .addNodeType({
    type: "replaceStringRegex",
    label: "Replace String (Regex)",
    description: "Replaces text in a string using a regex",
    initialWidth: 140,
    inputs: (ports) => [
      ports.string({
        name: "string",
        label: "Original String",
      }),
      ports.string({
        name: "replace",
        label: "Replace (Regex)",
      }),
      ports.string({
        name: "with",
        label: "With",
      }),
    ],
    outputs: (ports) => [ports.string()],
  })
  .addNodeType({
    type: "splitString",
    label: "Split String",
    description: "Splits a string into 2 strings",
    initialWidth: 140,
    inputs: (ports) => [
      ports.string({
        name: "string",
        label: "Original String",
      }),
      ports.string({
        name: "separator",
        label: "Separator",
      }),
    ],
    outputs: (ports) => [ports.string(), ports.string()],
  })
  .addNodeType({
    type: "startsWith",
    label: "Starts With",
    description: "Checks if a string starts with another string",
    initialWidth: 140,
    inputs: (ports) => [
      ports.string({
        name: "string",
        label: "String",
      }),
      ports.string({
        name: "startsWith",
        label: "Starts With",
      }),
    ],
    outputs: (ports) => [ports.boolean()],
  })
  .addNodeType({
    type: "endsWith",
    label: "Ends With",
    description: "Checks if a string ends with another string",
    initialWidth: 140,
    inputs: (ports) => [
      ports.string({
        name: "string",
        label: "String",
      }),
      ports.string({
        name: "endsWith",
        label: "Ends With",
      }),
    ],
    outputs: (ports) => [ports.boolean()],
  })
  .addNodeType({
    type: "input",
    label: "Input",
    description: "Input",
    initialWidth: 140,
    inputs: (ports) => (inputData, connections, context) => [],
    outputs: (ports) => (inputData, connections, context) => {
      console.log("Input", inputData, context);
      return Object.keys(context).map((key) => {
        console.log("Key", key, context[key]);
        const value = context[key];
        const type = typeof Object.values(value)[0];
        if (type === "string") {
          return ports.string({
            name: key,
            label: key,
          });
        } else if (type === "number") {
          return ports.number({
            name: key,
            label: key,
          });
        } else if (type === "boolean") {
          return ports.boolean({
            name: key,
            label: key,
          });
        }
      });
    },
  });
// === END OF PRIMARY NODES ===
config.addNodeType({
  type: "periodicTable",
  label: "Periodic Table",
  description: "Get data from the Periodic Table",
  initialWidth: 140,
  inputs: (ports) => [
    ports.string({
      name: "symbol",
      label: "Symbol",
    }),
    ports.string({
      name: "name",
      label: "Name",
    }),
    ports.number({
      name: "atomicNumber",
      label: "Atomic Number",
    }),
  ],
  outputs: (ports) => [
    ports.string({
      name: "symbol",
      label: "Symbol",
    }),
    ports.string({
      name: "name",
      label: "Name",
    }),
    ports.number({
      name: "atomicNumber",
      label: "Atomic Number",
    }),
    ports.number({
      name: "atomicMass",
      label: "Atomic Mass",
    }),
    ports.string({
      name: "phase",
      label: "Phase",
    }),
    ports.string({
      name: "meltingPoint",
      label: "Melting Point",
    }),
    ports.string({
      name: "boilingPoint",
      label: "Boiling Point",
    }),
    ports.string({
      name: "density",
      label: "Density",
    }),
    ports.string({
      name: "electronegativity",
      label: "Electronegativity",
    }),
  ],
});
export default config;
