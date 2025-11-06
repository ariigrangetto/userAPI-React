import express from "express";
import cors from "cors";
import "dotenv/config";
import process from "process";
import { createRouter } from "./router/routesUser.js";

export const createApp = ({ userModel }) => {
  const app = express();
  app.disable("x-powered-by");

  app.use(cors());
  app.use(express.json()); //middleware global

  app.use("/users", createRouter({ userModel }));

  app.use((req, res) => {
    res.status(404).send("<h1>404 - not found</h1>");
  });

  const PORT = process.env.PORT;

  app.listen(PORT, () =>
    console.log(`Servidor escuchando en el http://localhost:${PORT}`)
  );

  app.on("error", (err) => {
    console.log(`${err}`);
    process.exit(1);
  });
};
