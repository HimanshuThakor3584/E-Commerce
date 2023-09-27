const express = require("express");
const router = express.Router();
const OrderInvoice = require("../models/OrderInvoice");
const mongoose = require("mongoose");

//ROUTE 1: Get All the Notes Using : GET "/api/orderinvoice/fetchallorderinvoice". Login required

router.get("/fetchallorderinvoice", (req, res, next) => {
  OrderInvoice.find()
    .then((item) => {
      res.status(200).json({
        orderinvoiceData: item,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:id", (req, res, next) => {
  console.log(req.params.id);
  OrderInvoice.findById(req.params.id)
    .then((item) => {
      res.status(200).json({
        OrderInvoice: item,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/fetchallorderinvoice", (req, res) => {
  const orderinvoice = new OrderInvoice({
    orderId: req.body.orderId,
    totalPrice: req.body.totalPrice,
    payment: req.body.payment,
    paymentMode: req.body.paymentMode,
    paymentDate: req.body.paymentDate,
  });
  orderinvoice
    .save()
    .then((item) => {
      console.log(item);
      res.status(200).json({
        newOrderInvoice: item,
      });
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
