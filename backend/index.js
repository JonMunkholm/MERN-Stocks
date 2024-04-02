import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Ticker } from "./models/tickerModel.js";

const app = express();

//Middleware for parsing request body
app.use(express.json());
//Middleware Form URL encoded
app.use(express.urlencoded({ extended: false }));

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Hello World!!");
});

app.get(`/api/tickers`, async (request, response) => {
  try {
    const tickers = await Ticker.find({});
    response.status(200).json(tickers);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

app.post(`/api/tickers`, async (request, response) => {
  try {
    if (!request.body.cik_str || !request.body.title || !request.body.ticker) {
      return response
        .status(400)
        .json({ message: `Send all required fields: cik, title, ticker` });
    }
    const newTicker = {
      cik_str: request.body.cik_str,
      title: request.body.title,
      ticker: request.body.ticker,
    };

    const tick = await Ticker.create(newTicker);

    return response.status(200).json(tick);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log(`app connected to database`);

    app.listen(PORT, () => {
      console.log(`app is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
