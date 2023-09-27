const express = require("express");
const router = express.Router();
const OrderItems = require("../models/OrderItems");
const mongoose = require("mongoose");
const fetchuser = require("../middleware/fetchUser");

//ROUTE 1: Get All the Notes Using : GET "/api/orderitems/fetchallorderitems". Login required

router.get("/fetchallorderitems", (req, res, next) => {
  OrderItems.find()
    .then((item) => {
      res.status(200).json({
        orderitemsData: item,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/fetchallorderitems/:orderId", (req, res, next) => {
  const orderId = req.params?.orderId;
  OrderItems.find({ orderId })
    .populate("productId")
    .populate("orderId")
    .then((item) => {
      res.status(200).json({
        orderitemsData: item,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/fetchallorderitems", fetchuser, (req, res) => {
  const orderitems = new OrderItems({
    orderId: req.body.orderId,
    userId: req.user.id,
    productId: req.body.productId,
    categoryId: req.body.categoryId,
    price: req.body.price,
    quentity: req.body.quentity,
    discount: req.body.discount,
    orderItemDate: req.body.orderItemDate,
  });
  orderitems
    .save()
    .then((item) => {
      console.log(item);
      res.status(200).json({
        newOrderItems: item,
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
