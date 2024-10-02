import { Schema } from "mongoose";
import db from "../config/db.js";

const rentedSchema = new db.Schema({
  rent_by: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  movie_rented: {
    type: Schema.ObjectId,
    ref: "Movie",
    required: true,
  },
  rent_date: {
    type: Date,
    required: true,
  },
  return_date: {
    type: Date,
    required: true,
  },
});

const Rented = db.model("Rented", rentedSchema);

export default Rented;
