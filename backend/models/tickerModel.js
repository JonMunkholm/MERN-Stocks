import mongoose from "mongoose";

const fetchedTickersSchema = mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export const FetchedTickers = mongoose.model(`FetchedTickers`, fetchedTickersSchema);
