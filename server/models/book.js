const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },
  genre: {
    type: String,
    trim: true,
    required: [true, "Genre is required"],
  },
  authorId: String,
});

module.exports = mongoose.model("Book", bookSchema);
