import { RootEngine } from "flume";
import config from "./config";
import PeriodicTableDataSource from "./DataSources/PeriodicTable.js";

const l = (data) => {
  // console.log("l", data);
  return data;
};

const resolvePorts = (portType, data) => {
  // switch (portType) {
  //   case "string":
  //     return data.string;
  //   case "boolean":
  //     return data.boolean;
  //   case "number":
  //     return data.number;
  //   default:
  //     return data;
  // }
  return data;
};

const resolveNodes = (node, inputValues, nodeType, context) => {
  switch (node.type) {
    case "string":
      return { string: inputValues.string };
    case "boolean":
      return { boolean: inputValues.boolean };
    case "number":
      return { number: inputValues.number };
    case "reverseBoolean":
      return { boolean: !inputValues.boolean };
    case "boolToString":
      return { string: inputValues.boolean.boolean ? "true" : "false" };
    case "numberToString":
      return { string: inputValues.number.number.toString() };
    case "joinStrings":
      return {
        string:
          inputValues.string1.string +
          inputValues.string2.string +
          inputValues.string3.string,
      };
    case "includes":
      return { boolean: inputValues.string.includes(inputValues.includes) };
    case "and":
      return { boolean: inputValues.boolean1 && inputValues.boolean2 };
    case "or":
      return { boolean: inputValues.boolean1 || inputValues.boolean2 };
    case "addNumbers":
      return { number: inputValues.number1 + inputValues.number2 };
    case "subtractNumbers":
      return { number: inputValues.number1 - inputValues.number2 };
    case "multiplyNumbers":
      return { number: inputValues.number1 * inputValues.number2 };
    case "divideNumbers":
      return { number: inputValues.number1 / inputValues.number2 };
    case "moduloNumbers":
      return { number: inputValues.number1 % inputValues.number2 };
    case "greaterThan":
      return { boolean: inputValues.number1 > inputValues.number2 };
    case "lessThan":
      return { boolean: inputValues.number1 < inputValues.number2 };
    case "greaterThanOrEqual":
      return { boolean: inputValues.number1 >= inputValues.number2 };
    case "lessThanOrEqual":
      return { boolean: inputValues.number1 <= inputValues.number2 };
    case "numberEqual":
      return { boolean: inputValues.number1 === inputValues.number2 };
    case "stringEqual":
      return { boolean: inputValues.string1 === inputValues.string2 };
    case "replaceString":
      return {
        string: inputValues.string.replace(
          inputValues.replace,
          inputValues.with
        ),
      };
    case "replaceStringRegex":
      return {
        string: inputValues.string.replace(
          new RegExp(inputValues.replace, "g"),
          inputValues.with
        ),
      };
    case "splitString":
      return {
        string1: inputValues.string.split(inputValues.split)[0],
        string2: inputValues.string.split(inputValues.split)[1],
      };
    case "startsWith":
      return { boolean: inputValues.string.startsWith(inputValues.startsWith) };
    case "endsWith":
      return { boolean: inputValues.string.endsWith(inputValues.endsWith) };
    case "periodicTable":
      return l(PeriodicTableDataSource(inputValues));
    default:
      return inputValues;
  }
};

const engine = new RootEngine(config, resolvePorts, resolveNodes);

export default engine;
export { resolveNodes };
