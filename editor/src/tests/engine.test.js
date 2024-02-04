import { resolveNodes } from "../engine";
// Test everything in engine.js

describe("Node Resolvers", () => {
  it("Should process a string node", () => {
    const node = {
      type: "string",
    };
    const inputValues = {
      string: "Hello World",
    };
    const nodeType = "string";
    const context = {};
    const result = resolveNodes(node, inputValues, nodeType, context);
    expect(result).toEqual({ string: "Hello World" });
  });
  it("Should process a boolean node", () => {
    const node = {
      type: "boolean",
    };
    const inputValues = {
      boolean: true,
    };
    const nodeType = "boolean";
    const context = {};
    const result = resolveNodes(node, inputValues, nodeType, context);
    expect(result).toEqual({ boolean: true });
  });
  it("Should process a number node", () => {
    const node = {
      type: "number",
    };
    const inputValues = {
      number: 42,
    };
    const nodeType = "number";
    const context = {};
    const result = resolveNodes(node, inputValues, nodeType, context);
    expect(result).toEqual({ number: 42 });
  });
  it("Should reverse a boolean on a reverseBoolean node", () => {
    const node = {
      type: "reverseBoolean",
    };
    const inputValues = {
      boolean: true,
    };
    const nodeType = "boolean";
    const context = {};
    const result = resolveNodes(node, inputValues, nodeType, context);
    expect(result).toEqual({ boolean: false });
  });
  it("Should convert a boolean to a string on a boolToString node", () => {
    const node = {
      type: "boolToString",
    };
    const inputValues = {
      boolean: true,
    };
    const nodeType = "string";
    const context = {};
    const result = resolveNodes(node, inputValues, nodeType, context);
    expect(result).toEqual({ string: "true" });
  });
  it("Should convert a number to a string on a numberToString node", () => {
    const node = {
      type: "numberToString",
    };
    const inputValues = {
      number: 42,
    };
    const nodeType = "string";
    const context = {};
    const result = resolveNodes(node, inputValues, nodeType, context);
    expect(result).toEqual({ string: "42" });
  });
  it("Should join strings on a joinStrings node", () => {
    const node = {
      type: "joinStrings",
    };
    const inputValues = {
      string1: "Hello",
      string2: "World",
      string3: "!",
    };
    const nodeType = "string";
    const context = {};
    const result = resolveNodes(node, inputValues, nodeType, context);
    expect(result).toEqual({ string: "HelloWorld!" });
  });
  it("Should check if a string includes another string on an includes node", () => {
    const node = {
      type: "includes",
    };
    const inputValues = {
      string: "Hello World",
      includes: "World",
    };
    const nodeType = "boolean";
    const context = {};
    const result = resolveNodes(node, inputValues, nodeType, context);
    expect(result).toEqual({ boolean: true });
  });
  it("Should check if both booleans are true on an and node", () => {
    const node = {
      type: "and",
    };
    const inputValues = {
      boolean1: true,
      boolean2: true,
    };
    const nodeType = "boolean";
    const context = {};
    const result = resolveNodes(node, inputValues, nodeType, context);
    expect(result).toEqual({ boolean: true });
  });
  it("Should check if either boolean is true on an or node", () => {
    const node = {
      type: "or",
    };
    const inputValues = {
      boolean1: true,
      boolean2: false,
    };
    const nodeType = "boolean";
    const context = {};
    const result = resolveNodes(node, inputValues, nodeType, context);
    expect(result).toEqual({ boolean: true });
  });
  it("Should add two numbers on an add node", () => {
    const node = {
      type: "add",
    };
    const inputValues = {
      number1: 1,
      number2: 2,
    };
    const nodeType = "number";
    const context = {};
    const result = resolveNodes(node, inputValues, nodeType, context);
    expect(result).toEqual({ number: 3 });
  });
  it("Should subtract two numbers on a subtract node", () => {
    const node = {
      type: "subtract",
    };
    const inputValues = {
      number1: 2,
      number2: 1,
    };
    const nodeType = "number";
    const context = {};
    const result = resolveNodes(node, inputValues, nodeType, context);
    expect(result).toEqual({ number: 1 });
  });
  it("Should multiply two numbers on a multiply node", () => {
    const node = {
      type: "multiply",
    };
    const inputValues = {
      number1: 2,
      number2: 2,
    };
    const nodeType = "number";
    const context = {};
    const result = resolveNodes(node, inputValues, nodeType, context);
    expect(result).toEqual({ number: 4 });
  });
  it("Should divide two numbers on a divide node", () => {
    const node = {
      type: "divide",
    };
    const inputValues = {
      number1: 4,
      number2: 2,
    };
    const nodeType = "number";
    const context = {};
    const result = resolveNodes(node, inputValues, nodeType, context);
    expect(result).toEqual({ number: 2 });
  });
  it("Should calculate a the remainder of two numbers on a modulo node", () => {
    const node = {
      type: "modulo",
    };
    const inputValues = {
      number1: 5,
      number2: 2,
    };
    const nodeType = "number";
    const context = {};
    const result = resolveNodes(node, inputValues, nodeType, context);
    expect(result).toEqual({ number: 1 });
  });
});
