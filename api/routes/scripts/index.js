import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export const post = async (req, res) => {
  const { code } = req.body;
  const script = await prisma.script.create({
    data: {
      content: JSON.stringify(code),
    },
  });
  console.log(script);
  res.json({ ...script });
};

export const get = async (req, res) => {
  const scripts = await prisma.script.findMany();
  res.json(scripts);
};
