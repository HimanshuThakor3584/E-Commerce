const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const mongoose = require("mongoose");
const BillingAddress = require("../models/BillingAddress");

//ROUTE 1: Get All the Notes Using : GET "/api/billingaddress/fetchallbillingaddress". Login required

router.get("/fetchallbillingaddress", (req, res) => {
  BillingAddress.find()
    .then((item) => {
      res.status(200).json({
        billingaddressData: item,
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
  BillingAddress.findById(req.params.id)
    .then((item) => {
      res.status(200).json({
        BillingAddress: item,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/fetchallbillingaddress", fetchuser, (req, res) => {
  const billingaddress = new BillingAddress({
    orderId: req.body.orderId,
    userId: req.user.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    address: req.body.address,
    number: req.body.number,
    zip: req.body.zip,
    pay: req.body.pay,
    date: req.body.date,
  });
  billingaddress
    .save()
    .then((item) => {
      console.log(item);
      res.status(200).json({
        newBillingAddress: item,
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
