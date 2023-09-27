const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
  plansId: {
    type: String,
    // required: true,
    ref: "plans",
  },
  category: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("categories", CategorySchema);
