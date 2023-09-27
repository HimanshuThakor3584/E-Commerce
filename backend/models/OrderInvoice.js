const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderInvoiceSchema = new Schema({
  orderId: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  payment: {
    type: String,
    default: "Sucess",
  },
  paymentMode: {
    type: String,
    default: "Online",
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("orderinvoice", OrderInvoiceSchema);
