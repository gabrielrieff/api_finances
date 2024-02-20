import express from "express";
import cors from "cors";
import { router } from "./routes/routes";

const main = async () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  //app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

  app.use(router);

  const port = process.env.PORT || 3333;
  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
