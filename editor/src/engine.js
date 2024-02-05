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
      return { string: tTRv(inputValues.boolean) ? "true" : "false" };
    case "numberToString":
      return { string: tTRv(inputValues.number).toString() };
    case "joinStrings":
      return {
        string:
          tTRv(inputValues.string1) +
          tTRv(inputValues.string2) +
          tTRv(inputValues.string3),
      };
    case "includes":
      return { boolean: inputValues.string.includes(inputValues.includes) };
    case "and":
      return {
        boolean: tTRv(inputValues.boolean1) && tTRv(inputValues.boolean2),
      };
    case "or":
      return {
        boolean: tTRv(inputValues.boolean1) || tTRv(inputValues.boolean2),
      };
    case "addNumbers":
      return {
        number: parseFloat(tTRv(inputValues.num1) + tTRv(inputValues.num2)),
      };
    case "subtractNumbers":
      return {
        number: tTRv(inputValues.num1) - tTRv(inputValues.num2),
      };
    case "multiplyNumbers":
      return { number: tTRv(inputValues.num1) * tTRv(inputValues.num2) };
    case "divideNumbers":
      return { number: tTRv(inputValues.num1) / tTRv(inputValues.num2) };
    case "moduloNumbers":
      return { number: tTRv(inputValues.num1) % tTRv(inputValues.num2) };
    case "greaterThan":
      console.log(
        "greaterThan",
        inputValues.num1,
        inputValues.num2,
        tTRv(inputValues.num1) > tTRv(inputValues.num2)
      );
      return { boolean: tTRv(inputValues.num1) > tTRv(inputValues.num2) };
    case "lessThan":
      return { boolean: tTRv(inputValues.num1) < tTRv(inputValues.num2) };
    case "greaterThanOrEqual":
      return { boolean: tTRv(inputValues.num1) >= tTRv(inputValues.num2) };
    case "lessThanOrEqual":
      return { boolean: tTRv(inputValues.num1) <= tTRv(inputValues.num2) };
    case "numberEqual":
      return { boolean: tTRv(inputValues.num1) === tTRv(inputValues.num2) };
    case "stringEqual":
      return {
        boolean: tTRv(inputValues.string1) === tTRv(inputValues.string2),
      };
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
      console.log(inputValues);
      let r = {
        string1: tTRv(inputValues.string).split(tTRv(inputValues.separator))[0],
        string2: tTRv(inputValues.string).split(tTRv(inputValues.separator))[1],
      };
      console.log("splitString", r);
      return r;
    case "startsWith":
      return { boolean: inputValues.string.startsWith(inputValues.startsWith) };
    case "endsWith":
      return { boolean: inputValues.string.endsWith(inputValues.endsWith) };
    case "log":
      console.log("Log", inputValues);
      return inputValues;
    case "periodicTable":
      return l(PeriodicTableDataSource(inputValues));
      return inputValues;
    case "input":
      console.log("Input_", inputValues, context);
      return inputValues;
    case "if":
      console.log(
        "if",
        inputValues.condition,
        inputValues.true,
        inputValues.false
      );
      return {
        string: tTRv(inputValues.condition)
          ? tTRv(inputValues.true)
          : tTRv(inputValues.false),
      };
    default:
      return inputValues;
  }
};

const engine = new RootEngine(config, resolvePorts, resolveNodes);

export default engine;
export { resolveNodes };

// traverse to real value
const tTRv = (data) => {
  const valueToReturn =
    typeof data === "object" ? Object.values(data)[0] : data;
  return valueToReturn;
};
