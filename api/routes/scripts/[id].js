import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
// import { RootEngine } from "flume";
// import config from "../../../editor/src/config.js";

export const get = async (req, res) => {
  const { id } = req.params;
  const script = await prisma.script.findUnique({
    where: {
      id,
    },
  });
  if (!script) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json(script);
  }
};

export const put = async (req, res) => {
  const { id } = req.params;
  const { code, name } = req.body;
  const script = await prisma.script.update({
    where: {
      id,
    },
    data: {
      content: JSON.stringify(code),
      name: name,
    },
  });
  res.json(script);
};

// export const post = async (req, res) => {
//   const { inputs } = req.body;
//   const { id } = req.params;
//   const script = await prisma.script.findFirst({
//     where: {
//       id,
//     },
//   });

//   const engine = new RootEngine(config);
//   const resolvedValues = engine.resolveRootNode(JSON.parse(script.content), {
//     context: inputs,
//   });
//   res.json(resolvedValues);
// };
