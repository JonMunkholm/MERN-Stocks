import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { FetchedTickers } from "./models/tickerModel.js";
import axios from "axios";

const app = express();

//Middleware for parsing request body
app.use(express.json());
//Middleware Form URL encoded
app.use(express.urlencoded({ extended: false }));

// Fetch data from the URL
const response = await axios.get(
  "https://www.sec.gov/files/company_tickers.json",
  {
    headers: {
      "User-Agent": "jmunkholm1@yahoo.com",
      "Accept-Encoding": "gzip, deflate",
      Host: "www.sec.gov",
    },
  }
);
const newData = response.data;

console.log(typeof newData[0][`cik_str`]);

// app.get(`/api/tickers`, async (request, response) => {
//   try {
//     const tickers = await FetchedTickers.find({});
//     response.status(200).json(tickers);
//   } catch (error) {
//     response.status(500).json({ message: error.message });
//   }
// });

// app.post(`/api/tickers`, async (request, response) => {
//   try {
//     if (!request.body.cik_str || !request.body.title || !request.body.ticker) {
//       return response
//         .status(400)
//         .json({ message: `Send all required fields: cik, title, ticker` });
//     }
//     const newFetchedTickers = {
//       cik_str: request.body.cik_str,
//       title: request.body.title,
//       ticker: request.body.ticker,
//     };

//     const tick = await FetchedTickers.create(newFetchedTickers);

//     return response.status(200).json(tick);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).json({ message: error.message });
//   }
// });

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
