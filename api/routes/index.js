import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export const get = async (req, res) => {
  const scripts = await prisma.script.findMany();
  res.json(scripts);
};
