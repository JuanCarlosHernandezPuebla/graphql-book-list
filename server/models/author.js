const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },
  age: Number,
});

module.exports = mongoose.model("Author", authorSchema);
