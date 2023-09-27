const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderItemsSchema = new Schema({
  orderId: {
    type: String,
    ref: "orders",
  },
  userId: {
    type: String,
    ref: "user",
  },
  productId: {
    type: String,
    required: true,
    ref: "products",
  },
  categoryId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quentity: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  orderItemDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("orderitems", OrderItemsSchema);
