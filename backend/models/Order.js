const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  userId: {
    type: String,
    ref: "user",
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  totalQuentity: {
    type: Number,
    required: true,
  },
  totalDiscount: {
    type: Number,
  },
  tax: {
    type: String,
    default: 0,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("orders", OrderSchema);
