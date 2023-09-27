const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlansSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  discounttype: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  startplan: {
    type: Date,
    required: true,
  },
  endplan: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("plans", PlansSchema);
