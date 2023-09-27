const mongoose = require("mongoose");
const { Schema } = mongoose;

const BillingAddressSchema = new Schema({
  orderId: {
    type: String,
    ref: "orders",
  },
  userId: {
    type: String,
    ref: "user",
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
  },
  pay: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("billingaddress", BillingAddressSchema);
