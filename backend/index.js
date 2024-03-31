import express from "express";
import { PORT } from "./config.js";

const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Hello World!!");
});
app.listen(PORT, () => {
  console.log(`app is listening to port: ${PORT}`);
});
