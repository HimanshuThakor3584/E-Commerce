const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  categoryId: {
    type: String,
    required: true,
    // ref: "categories",
  },
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  bestsales: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quentity: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("products", ProductSchema);
