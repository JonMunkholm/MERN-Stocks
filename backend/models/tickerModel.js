import mongoose from "mongoose";

const tickerSchema = mongoose.Schema({
  cik_str: {
    type: String,
    required: true,
  },
  ticker: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

export const Ticker = mongoose.model(`ticker`, tickerSchema);
