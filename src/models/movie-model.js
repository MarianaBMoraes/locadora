import db from "../config/db.js";

const movieSchema = new db.Schema({
  name: {
    type: String,
    required: true,
  },
  release_date: {
    type: Date,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  classification: {
    type: String,
    enum: ["LIVRE", "MAIOR16", "MAIOR18"],
    required: false,
    default: "LIVRE",
  },
});

const Movie = db.model("Movie", movieSchema);

export default User;
