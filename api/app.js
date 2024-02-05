import express from "express";
import createRouter, { router } from "express-file-routing";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

await createRouter(app);

app.listen(2000, () => {
  console.log("Server listening on 2000");
});
