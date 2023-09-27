const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const mongoose = require("mongoose");
const fetchuser = require("../middleware/fetchUser");

//ROUTE 1: Get All the Notes Using : GET "/api/orders/fetchallorders". Login required

router.get("/fetchallorders", (req, res, next) => {
  Order.find()
    .then((item) => {
      res.status(200).json({
        ordersData: item,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/fetchallorders/:userId", (req, res, next) => {
  const userId = req.params?.userId;
  Order.find({ userId })
    .then((item) => {
      res.status(200).json({
        ordersData: item,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/fetchallorders", fetchuser, (req, res) => {
  const orders = new Order({
    userId: req.user.id,
    itemPrice: req.body.itemPrice,
    totalQuentity: req.body.totalQuentity,
    totalPrice: req.body.totalPrice,
    totalDiscount: req.body.totalDiscount,
    orderDate: req.body.orderDate,
  });
  orders
    .save()
    .then((item) => {
      console.log(item);
      res.status(200).json({
        newOrders: item,
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
